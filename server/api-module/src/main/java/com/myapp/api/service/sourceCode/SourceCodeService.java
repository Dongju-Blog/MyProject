package com.myapp.api.service.sourceCode;

import com.myapp.api.dto.sourceCode.CreateSourceCodeDto;
import com.myapp.api.dto.sourceCode.SourceCodeResDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.Errors;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

public interface SourceCodeService {




    Map<String, String> createSourceCode(CreateSourceCodeDto json, MultipartFile file, Optional<MultipartFile> image, Errors errors);

    Map<String, String> updateSourceCode(Long id, CreateSourceCodeDto json, Optional<MultipartFile> file, Optional<MultipartFile> image, Errors errors);

    void deleteSourceCode(Long id);

    Page<SourceCodeResDto> getSourceCodes(Pageable pageable);

    SourceCodeResDto getSourceCode(Long id);


}
