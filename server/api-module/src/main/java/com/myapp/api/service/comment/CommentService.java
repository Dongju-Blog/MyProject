package com.myapp.api.service.comment;

import com.myapp.api.dto.comment.CommentsResDto;
import com.myapp.api.dto.comment.CreateCommentDto;
import com.myapp.api.dto.comment.UpdateCommentDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.validation.Errors;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

public interface CommentService {

    Map<String, String> createComment(HttpServletRequest request, CreateCommentDto requestDto, Errors errors);

    Map<String, String> updateComment(Long id, HttpServletRequest request, UpdateCommentDto requestDto, Errors errors);

    void deleteComment(Long id, HttpServletRequest request);

    Slice<CommentsResDto> getComments(Pageable pageable, Long articleId, Optional<Long> parentCommentId);
}
