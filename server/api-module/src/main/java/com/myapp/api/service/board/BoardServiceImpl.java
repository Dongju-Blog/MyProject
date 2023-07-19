package com.myapp.api.service.board;

import com.myapp.api.dto.article.ArticlesResDto;
import com.myapp.api.dto.article.CreateArticleDto;
import com.myapp.api.dto.board.ChangeBoardDto;
import com.myapp.api.dto.board.ChangeBoardsOrdersDto;
import com.myapp.api.dto.board.CreateBoardDto;
import com.myapp.api.dto.user.ChangeUserInfoDto;
import com.myapp.api.dto.user.EmailPostDto;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.service.file.FileService;
import com.myapp.api.service.user.UserService;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.api.user.RefreshTokenProvider;
import com.myapp.core.constant.Role;
import com.myapp.core.constant.Status;
import com.myapp.core.entity.*;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.Cacheable;
import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
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

        if (!token.isEmpty()) {
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
    public Map<String, Object> getArticle(String category, Long id) {
        Map<String, Object> returnArticle = new HashMap<>();
        Optional<Article> getArticle = articleRepository.findByBoard_NameAndId(category, id);
        if (getArticle.isPresent()) {
            Article article = getArticle.get();
            returnArticle.put("title", article.getTitle());
            returnArticle.put("content", article.getContent());
            returnArticle.put("isSecret", article.getIsSecret());
            returnArticle.put("isRepresentative", article.getIsRepresentative());
            returnArticle.put("boardId", article.getBoard().getId());
            returnArticle.put("id", article.getId());
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }
        return returnArticle;

    }

    @Override
    public Page<ArticlesResDto> getArticles(String category, Pageable pageable) {

        String urlDecode = category;
        try {
            // [URL 인코딩 된 문자 인지 확인 실시]
            if (category.contains("%")) {
                urlDecode = URLDecoder.decode(category, "UTF-8");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        Page<Article> getArticles = articleRepository.findByBoard_Name(urlDecode, pageable);
        if (getArticles.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        List<ArticlesResDto> returnArticles = getArticles.getContent()
                .stream()
                .map(ArticlesResDto::new)
                .collect(Collectors.toList());

        for (ArticlesResDto article : returnArticles) {
            if (!Objects.equals(article.getThumbnail(), "")) {
                String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
                article.setThumbnail(domain + article.getThumbnail());
            }
        }

//        for (Article article : getArticles) {
//            Map<String, Object> articlesItem = new HashMap<>();
//            articlesItem.put("title", article.getTitle());
//            articlesItem.put("id", article.getId());
//            articlesItem.put("thumbnail", domain + article.getFiles().get(0).getUrl());
//            returnArticles.add(articlesItem);
//        }

        return new PageImpl<>(returnArticles, pageable, getArticles.getTotalElements());
    }

}
