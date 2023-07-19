package com.myapp.api.dto.article;

import com.myapp.core.entity.Article;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class ArticlesResDto {

    String title;
    Long id;
    String preview;
    String thumbnail;

    public ArticlesResDto(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.preview = article.getPreview();
        if (!article.getFiles().isEmpty()) {
            this.thumbnail = article.getFiles().get(0).getUrl();
        } else {
            this.thumbnail = "";
        }
    }

    public void setThumbnail(String url) {
        this.thumbnail = url;
    }
}
