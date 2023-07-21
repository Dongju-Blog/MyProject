package com.myapp.api.dto.comment;

import com.myapp.core.entity.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class UpdateCommentDto {




    @NotBlank(message = "EMPTY_FIELD")
    private String content;


//    private LocalDateTime createdAt;
//
//    private LocalDateTime updatedAt;

    public UpdateCommentDto(Comment comment) {
        this.content = comment.getContent();
//        this.createdAt = comment.getCreatedAt();
//        this.updatedAt = comment.getCreatedAt();
    }

}
