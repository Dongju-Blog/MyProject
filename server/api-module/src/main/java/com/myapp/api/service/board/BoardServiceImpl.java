package com.myapp.api.service.board;

import com.myapp.api.dto.article.ArticlesResDto;
import com.myapp.api.dto.article.CreateArticleDto;
import com.myapp.api.service.file.FileService;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.*;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.exception.MyCustomException;
import com.myapp.core.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;
    private final ActiveBoardsRepository activeBoardsRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ArticleRepository articleRepository;
    private final FileService fileService;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;



    @Override
    public List<Object> getReadOnlyBoards(HttpServletRequest request) {
        String token = jwtTokenProvider.getExistedAccessToken(request);
        List<Object> boards = new ArrayList<>();

        if (token != null) {
            Role role = jwtTokenProvider.getRole(token);
            if (role.equals(Role.ADMIN)) {
                List<ActiveBoards> boardsList = activeBoardsRepository.findAllByOrderByViewOrderAsc();
                for (ActiveBoards board : boardsList) {
                    Map<String, Object> boardItem = new HashMap<>();
                    boardItem.put("id", board.getBoard().getId());
                    boardItem.put("name", board.getBoard().getName());
                    boards.add(boardItem);
                }

                return boards;
            }
        }


        List<ActiveBoards> boardsList = activeBoardsRepository.findByBoardIsSecretFalseOrderByViewOrder();
        for (ActiveBoards board : boardsList) {
            Map<String, Object> boardItem = new HashMap<>();
            boardItem.put("id", board.getBoard().getId());
            boardItem.put("name", board.getBoard().getName());
            boards.add(boardItem);

        }

        return boards;
    }


    @Override
    public Map<String, String> createArticle(CreateArticleDto json, Optional<List<MultipartFile>> files, Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format(error.getField());
            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
            validatorResult.put(validKeyName, errorName);
        }

        if (!validatorResult.isEmpty()) {
            return validatorResult;
        } else {
            Optional<Board> getBoard = boardRepository.findById(json.getBoardId());
            if (getBoard.isEmpty()) {
                throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
            }

            List<MultipartFile> fileList;
            if (files.isPresent()) {
                String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
                fileList = files.get();
                List<String> uploadFile = fileService.uploadFile(fileList);

                List<String> localUrls = json.getFileUrls();
                String newContent = json.getContent();
                for (int i = 0; i < localUrls.size(); i++) {
                    newContent = newContent.replace(localUrls.get(i), domain + uploadFile.get(i));
                }

                Article article = Article.builder()
                        .title(json.getTitle())
                        .content(newContent)
                        .preview(json.getPreview())
                        .isSecret(json.getIsSecret())
                        .isRepresentative(json.getIsRepresentative())
                        .board(getBoard.get())
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                List<File> fileEntities = new ArrayList<>();
                for (String url : uploadFile) {
                    File file = File.builder()
                            .article(article)
                            .url(url)
                            .build();
                    fileEntities.add(file);
                }

                articleRepository.save(article);
                fileRepository.saveAll(fileEntities);
                validatorResult.put("url", "/" + getBoard.get().getName() + "/" + article.getId());
            } else {
                Article article = Article.builder()
                        .title(json.getTitle())
                        .content(json.getContent())
                        .preview(json.getPreview())
                        .isSecret(json.getIsSecret())
                        .isRepresentative(json.getIsRepresentative())
                        .board(getBoard.get())
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();

                articleRepository.save(article);
                validatorResult.put("url", "/" + getBoard.get().getName() + "/" + article.getId());
            }


            return validatorResult;
        }
    }


    @Override
    public Map<String, String> updateArticle(Long id, CreateArticleDto json, Optional<List<MultipartFile>> files, Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        Optional<Article> getArticle = articleRepository.findById(id);
        Article article = getArticle.get();

        if (getArticle.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }



        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format(error.getField());
            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
            validatorResult.put(validKeyName, errorName);
        }

        if (!validatorResult.isEmpty()) {
            return validatorResult;
        } else {
            Optional<Board> getBoard = boardRepository.findById(json.getBoardId());
            if (getBoard.isEmpty()) {
                throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
            }

            String newContent = json.getContent();

            List<MultipartFile> fileList;
            if (files.isPresent()) {
                String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
                fileList = files.get();
                List<String> uploadFile = fileService.uploadFile(fileList);

                List<String> localUrls = json.getFileUrls();

                for (int i = 0; i < localUrls.size(); i++) {
                    newContent = newContent.replace(localUrls.get(i), domain + uploadFile.get(i));
                }

                List<File> fileEntities = new ArrayList<>();
                for (String url : uploadFile) {
                    File file = File.builder()
                            .article(article)
                            .url(url)
                            .build();
                    fileEntities.add(file);
                }
                fileRepository.saveAll(fileEntities);
            }

                article.setTitle(json.getTitle());
                article.setContent(newContent);
                article.setPreview(json.getPreview());
                article.setIsSecret(json.getIsSecret());
                article.setIsRepresentative(json.getIsRepresentative());
                article.setBoard(getBoard.get());
                article.setUpdatedAt(LocalDateTime.now());

                articleRepository.save(article);


                List<File> existingFiles = fileRepository.findByArticle_Id(id);
                List<File> willDelete = new ArrayList<>();
                List<String> willDeleteFileNames = new ArrayList<>();
                for (File file : existingFiles) {
                    if (!newContent.contains(file.getUrl())) {
                        willDelete.add(file);
                        willDeleteFileNames.add(file.getUrl());
                    }
                }
                fileService.deleteFile(willDeleteFileNames);
                fileRepository.deleteAll(willDelete);




            validatorResult.put("url", "/" + getBoard.get().getName() + "/" + article.getId());
            return validatorResult;
        }
    }


    @Override
    public Map<String, Object> getArticle(HttpServletRequest request, String category, Long id) {


        String urlDecode = category;
        try {
            // [URL 인코딩 된 문자 인지 확인 실시]
            if (category.contains("%")) {
                urlDecode = URLDecoder.decode(category, "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        Map<String, Object> returnArticle = new HashMap<>();
        String token = jwtTokenProvider.getExistedAccessToken(request);
        Optional<Article> getArticle;
        if (token != null && jwtTokenProvider.getRole(token) == Role.ADMIN) {
            getArticle = articleRepository.findByBoard_NameAndId(urlDecode, id);
        } else {
            getArticle = articleRepository.findByBoard_NameAndIdAndBoardIsSecretFalse(urlDecode, id);
        }

        if (getArticle.isPresent()) {
            Article article = getArticle.get();
            returnArticle.put("title", article.getTitle());
            returnArticle.put("content", article.getContent());
            returnArticle.put("isSecret", article.getIsSecret());
            returnArticle.put("isRepresentative", article.getIsRepresentative());
            returnArticle.put("boardId", article.getBoard().getId());
            returnArticle.put("createdAt", article.getCreatedAt());
            returnArticle.put("updatedAt", article.getUpdatedAt());
            returnArticle.put("id", article.getId());
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }
        return returnArticle;

    }









    @Override
    public void deleteArticle(String category, Long id) {
        String urlDecode = category;
        try {
            // [URL 인코딩 된 문자 인지 확인 실시]
            if (category.contains("%")) {
                urlDecode = URLDecoder.decode(category, "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        Optional<Article> getArticle = articleRepository.findByBoard_NameAndId(urlDecode, id);
        if (getArticle.isPresent()) {
            articleRepository.delete(getArticle.get());
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }


    }

    @Override
    public Page<ArticlesResDto> getArticles(HttpServletRequest request, String category, Pageable pageable) {


        String urlDecode = category;
        try {
            // [URL 인코딩 된 문자 인지 확인 실시]
            if (category.contains("%")) {
                urlDecode = URLDecoder.decode(category, "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        String token = jwtTokenProvider.getExistedAccessToken(request);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), 10, Sort.by("createdAt").descending());
        Page<Article> getArticles;
        if (token != null) {
            Role role = jwtTokenProvider.getRole(token);
            if (role == Role.ADMIN) {
                getArticles = articleRepository.findByBoard_Name(urlDecode, pageRequest);
            } else {
                getArticles = articleRepository.findByBoard_NameAndIsSecretFalse(urlDecode, pageRequest);
            }
        } else {
            getArticles = articleRepository.findByBoard_NameAndIsSecretFalse(urlDecode, pageRequest);
        }

        if (getArticles.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        List<ArticlesResDto> returnArticles = getArticles.getContent()
                .stream()
                .map(ArticlesResDto::new)
                .collect(Collectors.toList());

        String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
        for (ArticlesResDto article : returnArticles) {
            if (!Objects.equals(article.getThumbnail(), "")) {
                article.setThumbnail(domain + article.getThumbnail());
            }
        }

        return new PageImpl<>(returnArticles, pageRequest, getArticles.getTotalElements());
    }



    @Override
    public Page<ArticlesResDto> getSearchedArticles(HttpServletRequest request, String searchKeyword, Pageable pageable) {

        String urlDecode = searchKeyword;
        try {
            // [URL 인코딩 된 문자 인지 확인 실시]
            if (searchKeyword.contains("%")) {
                urlDecode = URLDecoder.decode(searchKeyword, "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }



        String token = jwtTokenProvider.getExistedAccessToken(request);
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), 10, Sort.by("createdAt").descending());
        Page<Article> getArticles;
        if (token != null) {
            Role role = jwtTokenProvider.getRole(token);
            if (role == Role.ADMIN) {
                getArticles = articleRepository.findByTitleContaining(urlDecode, pageRequest);
            } else {
                getArticles = articleRepository.findByTitleContainingAndBoardIsSecretFalse(urlDecode, pageRequest);
            }
        } else {
            getArticles = articleRepository.findByTitleContainingAndBoardIsSecretFalse(urlDecode, pageRequest);
        }

        if (getArticles.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }
        List<ArticlesResDto> returnArticles = getArticles.getContent()
                .stream()
                .map(ArticlesResDto::new)
                .collect(Collectors.toList());

        String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
        for (ArticlesResDto article : returnArticles) {
            if (!Objects.equals(article.getThumbnail(), "")) {
                article.setThumbnail(domain + article.getThumbnail());
            }
        }

        return new PageImpl<>(returnArticles, pageRequest, getArticles.getTotalElements());
    }







//    @Override
//    public Slice<ArticlesResDto> getArticlesMobile(String category, Pageable pageable) {
//
//        String urlDecode = category;
//        try {
//            // [URL 인코딩 된 문자 인지 확인 실시]
//            if (category.contains("%")) {
//                urlDecode = URLDecoder.decode(category, "UTF-8");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//
//        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), 10, Sort.by("createdAt").descending());
//
//        Slice<Article> getArticles = articleRepository.findByBoard_NameAsSlice(urlDecode, pageRequest);
//        if (getArticles.isEmpty()) {
//            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
//        }
//        List<ArticlesResDto> returnArticles = getArticles.getContent()
//                .stream()
//                .map(ArticlesResDto::new)
//                .collect(Collectors.toList());
//
//        for (ArticlesResDto article : returnArticles) {
//            if (!Objects.equals(article.getThumbnail(), "")) {
//                String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
//                article.setThumbnail(domain + article.getThumbnail());
//            }
//        }
//
////        for (Article article : getArticles) {
////            Map<String, Object> articlesItem = new HashMap<>();
////            articlesItem.put("title", article.getTitle());
////            articlesItem.put("id", article.getId());
////            articlesItem.put("thumbnail", domain + article.getFiles().get(0).getUrl());
////            returnArticles.add(articlesItem);
////        }
//
//        return new SliceImpl<>(returnArticles, pageRequest, getArticles.hasNext());
//    }



    @Override
    public Map<String, Object> getArticlesMobile(HttpServletRequest request, String category, Long lastId, int size) {

        String urlDecode = category;
        try {
            // [URL 인코딩 된 문자 인지 확인 실시]
            if (category.contains("%")) {
                urlDecode = URLDecoder.decode(category, "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        String token = jwtTokenProvider.getExistedAccessToken(request);
        PageRequest pageRequest = PageRequest.of(0, size);
        Slice<Article> getArticles;
        if (token != null) {
            Role role = jwtTokenProvider.getRole(token);
            if (role == Role.ADMIN) {
                getArticles = articleRepository.findByBoard_NameAndIdLessThanOrderByIdDesc(lastId, urlDecode, pageRequest);
            } else {
                getArticles = articleRepository.findByBoard_NameAndIdLessThanAndBoardIsSecretFalseOrderByIdDesc(lastId, urlDecode, pageRequest);
            }
        } else {
            getArticles = articleRepository.findByBoard_NameAndIdLessThanAndBoardIsSecretFalseOrderByIdDesc(lastId, urlDecode, pageRequest);
        }


        if (getArticles.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);

        }

        List<ArticlesResDto> returnArticles = getArticles.getContent()
                .stream()
                .map(ArticlesResDto::new)
                .collect(Collectors.toList());

        String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
        for (ArticlesResDto article : returnArticles) {
            if (!Objects.equals(article.getThumbnail(), "")) {
                article.setThumbnail(domain + article.getThumbnail());
            }
        }

        Map<String, Object> returnObject = new HashMap<>();

        boolean last = returnArticles.size() < size;
        Long nextLastId = returnArticles.get(returnArticles.size() - 1).getId();

        returnObject.put("content", returnArticles);
        returnObject.put("last", last);
        returnObject.put("nextLastId", nextLastId);

        return returnObject;


    }




    @Override
    public Map<String, Object> getSearchedArticlesMobile(HttpServletRequest request, String searchKeyword, Long lastId, int size) {

        String urlDecode = searchKeyword;
        try {
            // [URL 인코딩 된 문자 인지 확인 실시]
            if (searchKeyword.contains("%")) {
                urlDecode = URLDecoder.decode(searchKeyword, "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        String token = jwtTokenProvider.getExistedAccessToken(request);
        PageRequest pageRequest = PageRequest.of(0, size);
        Slice<Article> getArticles;
        if (token != null) {
            Role role = jwtTokenProvider.getRole(token);
            if (role == Role.ADMIN) {
                getArticles = articleRepository.findByTitleContainingAndIdLessThanOrderByIdDesc(lastId, urlDecode, pageRequest);
            } else {
                getArticles = articleRepository.findByTitleContainingAndIdLessThanAndBoardIsSecretFalseOrderByIdDesc(lastId, urlDecode, pageRequest);
            }
        } else {
            getArticles = articleRepository.findByTitleContainingAndIdLessThanAndBoardIsSecretFalseOrderByIdDesc(lastId, urlDecode, pageRequest);
        }


        if (getArticles.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);

        }

        List<ArticlesResDto> returnArticles = getArticles.getContent()
                .stream()
                .map(ArticlesResDto::new)
                .collect(Collectors.toList());

        String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
        for (ArticlesResDto article : returnArticles) {
            if (!Objects.equals(article.getThumbnail(), "")) {
                article.setThumbnail(domain + article.getThumbnail());
            }
        }

        Map<String, Object> returnObject = new HashMap<>();

        boolean last = returnArticles.size() < size;
        Long nextLastId = returnArticles.get(returnArticles.size() - 1).getId();

        returnObject.put("content", returnArticles);
        returnObject.put("last", last);
        returnObject.put("nextLastId", nextLastId);

        return returnObject;


    }




    @Override
    public Page<ArticlesResDto> getRepresentativeArticles(Pageable pageable) {


        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdAt").descending());
        Page<Article> getArticles = articleRepository.findByIsRepresentativeIsTrue(pageRequest);;


        if (getArticles.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }
        List<ArticlesResDto> returnArticles = getArticles.getContent()
                .stream()
                .map(ArticlesResDto::new)
                .collect(Collectors.toList());

        String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
        for (ArticlesResDto article : returnArticles) {
            if (!Objects.equals(article.getThumbnail(), "")) {
                article.setThumbnail(domain + article.getThumbnail());
            }
        }

        return new PageImpl<>(returnArticles, pageRequest, getArticles.getTotalElements());
    }















}

