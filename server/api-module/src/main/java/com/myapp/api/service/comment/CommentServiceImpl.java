package com.myapp.api.service.comment;

import com.myapp.api.dto.comment.CommentsResDto;
import com.myapp.api.dto.comment.CreateCommentDto;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.core.entity.Article;
import com.myapp.core.entity.Comment;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.ArticleRepository;
import com.myapp.core.repository.CommentRepository;
import com.myapp.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final JwtTokenProvider jwtTokenProvider;
    private final ArticleRepository articleRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;


//    @Override
//    public Map<String, String> createComment(HttpServletRequest request, CreateCommentDto requestDto, Errors errors) {
//
//        Map<String, String> validatorResult = new HashMap<>();
//
//        for (FieldError error : errors.getFieldErrors()) {
//            String validKeyName = String.format(error.getField());
//            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
//            validatorResult.put(validKeyName, errorName);
//        }
//
//        if (!validatorResult.isEmpty()) {
//            return validatorResult;
//        }
//
//
//        String token = jwtTokenProvider.getExistedAccessToken(request);
//        Long userId = jwtTokenProvider.getId(token);
//
//        Optional<User> getUser = userRepository.findById(userId);
//        if (getUser.isEmpty()) {
//            throw new CustomException(ErrorCode.NOT_FOUND_ACCOUNT);
//        }
//        User user = getUser.get();
//
//        Optional<Article> getArticle = articleRepository.findById(requestDto.getArticleId());
//        if (getArticle.isEmpty()) {
//            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
//        }
//
//        Article article = getArticle.get();
//
//        Comment comment = Comment.builder()
//                .content(requestDto.getContent())
//                .article(article)
//                .user(user)
//                .build();
//
//        Optional<Comment> getParentComment = Optional.empty();
//        if (requestDto.getParentCommentId() != null) {
//            Long parentCommentId = requestDto.getParentCommentId();
//            getParentComment = commentRepository.findById(parentCommentId);
//        }
//
//        if (getParentComment.isPresent()) {
//            Comment parentComment = getParentComment.get();
//
//            if (parentComment.getArticle().getId() != article.getId()) {
//                throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
//            }
//            comment.setParent(parentComment);
//            commentRepository.save(comment);
//            article.getComments().add(comment);
//            parentComment.getChildren().add(comment);
//        } else {
//            article.getComments().add(comment);
//            commentRepository.save(comment);
//        }
//
//
//        return validatorResult;
//    }

    @Override
    public Map<String, String> createComment(HttpServletRequest request, CreateCommentDto requestDto, Errors errors) {

        Map<String, String> validatorResult = new HashMap<>();

        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format(error.getField());
            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
            validatorResult.put(validKeyName, errorName);
        }

        if (!validatorResult.isEmpty()) {
            return validatorResult;
        }


        String token = jwtTokenProvider.getExistedAccessToken(request);
        Long userId = jwtTokenProvider.getId(token);

        Optional<User> getUser = userRepository.findById(userId);
        if (getUser.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ACCOUNT);
        }
        User user = getUser.get();

        Optional<Article> getArticle = articleRepository.findById(requestDto.getArticleId());
        if (getArticle.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }

        Article article = getArticle.get();

        Comment comment = Comment.builder()
                .content(requestDto.getContent())
                .article(article)
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Optional<Comment> getParentComment = Optional.empty();
        if (requestDto.getParentCommentId() != null) {
            Long parentCommentId = requestDto.getParentCommentId();
            getParentComment = commentRepository.findById(parentCommentId);
        }

        if (getParentComment.isPresent()) {
            Comment parentComment = getParentComment.get();

            if (!Objects.equals(parentComment.getArticle(), article)) {
                throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
            }



            comment.setParent(parentComment);
            commentRepository.save(comment);
            article.getComments().add(comment);
            parentComment.getChildren().add(comment);

        } else {
            article.getComments().add(comment);
            commentRepository.save(comment);
        }


        return validatorResult;
    }


    @Override
    public Slice<CommentsResDto> getComments(Pageable pageable, Long articleId, Optional<Long> parentCommentId) {
        Optional<Article> getArticle = articleRepository.findById(articleId);
        if (getArticle.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }

//        Map<String, Object> returnObject = new HashMap<>();
        Article article = getArticle.get();

        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), 10, Sort.by("createdAt").ascending());

        Slice<Comment> getComments;
        if (parentCommentId.isPresent()) {

            getComments = commentRepository.findByArticle_IdAndParent_Id(articleId, parentCommentId.get(), pageRequest);

        } else {
            getComments = commentRepository.findByArticle_IdAndParentIsNull(articleId, pageRequest);
        }

        List<CommentsResDto> returnComments = getComments.getContent()
                .stream()
                .map(CommentsResDto::new)
                .collect(Collectors.toList());



        return new SliceImpl<>(returnComments, pageRequest, getComments.hasNext());






    }
}
