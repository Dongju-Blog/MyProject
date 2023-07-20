package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.comment.CommentsResDto;
import com.myapp.api.dto.comment.CreateCommentDto;
import com.myapp.api.service.comment.CommentService;
import com.myapp.core.constant.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;


    /**
     * createComment
     *
     * @param request, requestDto
     * @return
     */
    @PostMapping
    @Authorize({Role.USER ,Role.ADMIN})
    public ResponseEntity<?> createComment(HttpServletRequest request, @Valid @RequestBody CreateCommentDto requestDto, Errors errors, Model model) {
        Map<String, String> validatorResult = commentService.createComment(request, requestDto, errors);

        if (!validatorResult.isEmpty()) {
            model.addAttribute("boardDto", requestDto);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * getComments
     *
     * @param (articleId, parentCommentId, pageable)
     * @return
     */
    @GetMapping
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<Slice<CommentsResDto>> getArticles(@RequestParam("articleId") Long articleId, @RequestParam("parentCommentId") Optional<Long> parentCommentId, Pageable pageable) {
        return new ResponseEntity<>(commentService.getComments(pageable, articleId, parentCommentId), HttpStatus.OK);
    }

}
