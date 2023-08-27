package com.myapp.api.dto.sourceCode;

import com.myapp.core.entity.SourceCode;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Getter
public class SourceCodeResDto {


    private Long id;

    private String title;

    private String rootName;

    private String description;

    private String fileUrl;

    private String imageUrl;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Builder
    public SourceCodeResDto(SourceCode sourceCode) {
        this.id = sourceCode.getId();
        this.title = sourceCode.getTitle();
        this.rootName = sourceCode.getRootName();
        this.description = sourceCode.getDescription();
        this.createdAt = sourceCode.getCreatedAt();
        this.updatedAt = sourceCode.getUpdatedAt();
        this.fileUrl = sourceCode.getFileUrl();
        this.imageUrl = sourceCode.getImageUrl();

//        this.createdAt = article.getCreatedAt();
//        this.updatedAt = article.getCreatedAt();
    }

    /**
     *
     * @param sourceCode
     * @return
     */
    public SourceCodeResDto of(SourceCode sourceCode) {
        return SourceCodeResDto.builder()
                .sourceCode(sourceCode)
                .build();
//                .title(sourceCode.getTitle())
//                .rootName(sourceCode.getRootName())
//                .description(sourceCode.getDescription())
//                .createdAt(sourceCode.getCreatedAt())
//                .updatedAt(sourceCode.getUpdatedAt())
//                .fileUrl(sourceCode.getFileUrl())
//                .imageUrl(sourceCode.getImageUrl())

    }

//    private Map<String, MultipartFile> files;
}
