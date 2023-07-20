package com.myapp.api.dto.article;

import com.myapp.core.entity.Article;
import com.myapp.core.entity.Board;
import com.myapp.core.entity.File;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class CreateArticleDto {



    @NotBlank(message = "EMPTY_FIELD")
    private String title;

    @NotBlank(message = "EMPTY_FIELD")
    private String content;

    @NotNull(message = "EMPTY_FIELD")
    private Boolean isSecret;

    @NotNull(message = "EMPTY_FIELD")
    private Boolean isRepresentative;

    @NotNull(message = "EMPTY_FIELD")
    private Long boardId;

    private String preview;

    private List<String> fileUrls;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public CreateArticleDto(Article article) {
        this.title = article.getTitle();
        this.content = article.getContent();
        this.preview = article.getPreview();
        this.isSecret = article.getIsSecret();
        this.isRepresentative = article.getIsRepresentative();
        this.createdAt = article.getCreatedAt();
        this.updatedAt = article.getCreatedAt();
    }

//    private Map<String, MultipartFile> files;
}
