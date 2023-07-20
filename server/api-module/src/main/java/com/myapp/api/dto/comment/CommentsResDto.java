package com.myapp.api.dto.comment;

import com.myapp.core.entity.Article;
import com.myapp.core.entity.Comment;
import com.myapp.core.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class CommentsResDto {


    private Long id;
    private Long userId;
    private String username;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long childrenCommentsCount;



    public CommentsResDto(Comment comment) {
        User user = comment.getUser();
        this.id = comment.getId();
        this.userId = user.getId();
        this.username = user.getUsername();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.updatedAt = comment.getCreatedAt();
        this.childrenCommentsCount = (long) comment.getChildren().size();

    }


}
