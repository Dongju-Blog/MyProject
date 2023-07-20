package com.myapp.api.dto.comment;

import com.myapp.core.entity.Article;
import com.myapp.core.entity.Board;
import com.myapp.core.entity.Comment;
import com.myapp.core.entity.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
public class CreateCommentDto {




    @NotBlank(message = "EMPTY_FIELD")
    private String content;

    private Long parentCommentId;

    private Long articleId;

//    private LocalDateTime createdAt;
//
//    private LocalDateTime updatedAt;

    public CreateCommentDto(Comment comment) {
        this.content = comment.getContent();
//        this.createdAt = comment.getCreatedAt();
//        this.updatedAt = comment.getCreatedAt();
    }

}
