package com.myapp.api.dto.sourceCode;

import com.myapp.core.entity.Article;
import com.myapp.core.entity.SourceCode;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.xml.transform.Source;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class CreateSourceCodeDto {



    @NotBlank(message = "EMPTY_FIELD")
    private String title;

    @NotBlank(message = "EMPTY_FIELD")
    private String rootName;

    @NotBlank(message = "EMPTY_FIELD")
    private String description;

    private String fileUrl;

    private String imageUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public CreateSourceCodeDto(SourceCode sourceCode) {
        this.title = sourceCode.getTitle();
        this.rootName = sourceCode.getRootName();
        this.description = sourceCode.getDescription();

//        this.createdAt = article.getCreatedAt();
//        this.updatedAt = article.getCreatedAt();
    }

//    private Map<String, MultipartFile> files;
}
