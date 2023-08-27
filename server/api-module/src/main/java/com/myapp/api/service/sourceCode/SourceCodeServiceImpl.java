package com.myapp.api.service.sourceCode;

import com.myapp.api.dto.article.ArticlesResDto;
import com.myapp.api.dto.article.CreateArticleDto;
import com.myapp.api.dto.sourceCode.CreateSourceCodeDto;
import com.myapp.api.dto.sourceCode.SourceCodeResDto;
import com.myapp.api.service.file.FileService;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.*;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class SourceCodeServiceImpl implements SourceCodeService {

    private final FileRepository fileRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final FileService fileService;
    private final SourceCodeRepository sourceCodeRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;






    @Override
    public Map<String, String> createSourceCode(CreateSourceCodeDto json, MultipartFile file, Optional<MultipartFile> image, Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format(error.getField());
            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
            validatorResult.put(validKeyName, errorName);
        }

        if (!validatorResult.isEmpty()) {
            return validatorResult;
        } else {

            String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";

            List<MultipartFile> fileList = new ArrayList<>();
            fileList.add(file);
            List<String> uploadFile = fileService.uploadFile(fileList);


            SourceCode sourceCode = SourceCode.builder()
                    .title(json.getTitle())
                    .rootName(json.getRootName())
                    .description(json.getDescription())
                    .fileUrl(uploadFile.get(0))
                    .imageUrl(null)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            List<MultipartFile> imageList = new ArrayList<>();
            if (image.isPresent()) {
                MultipartFile getImage = image.get();
                imageList.add(getImage);
                List<String> uploadImage = fileService.uploadFile(imageList);
                sourceCode.setImageUrl(uploadImage.get(0));
            }


            sourceCodeRepository.save(sourceCode);
            validatorResult.put("url", "/" + sourceCode.getId());

            return validatorResult;
        }
    }


    @Override
    public Map<String, String> updateSourceCode(Long id, CreateSourceCodeDto json, Optional<MultipartFile> file, Optional<MultipartFile> image, Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();

        Optional<SourceCode> getSourceCode = sourceCodeRepository.findById(id);


        if (getSourceCode.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }

        SourceCode sourceCode = getSourceCode.get();


        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format(error.getField());
            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
            validatorResult.put(validKeyName, errorName);
        }

        if (!validatorResult.isEmpty()) {
            return validatorResult;
        } else {


            List<MultipartFile> fileList = new ArrayList<>();
            if (file.isPresent()) {
                String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
                fileList.add(file.get());
                List<String> uploadFile = fileService.uploadFile(fileList);
                List<String> willDelete = new ArrayList<>();
                willDelete.add(sourceCode.getFileUrl());
                fileService.deleteFile(willDelete);
                sourceCode.setFileUrl(uploadFile.get(0));
            }

            List<MultipartFile> imageList = new ArrayList<>();
            if (image.isPresent()) {
                MultipartFile getImage = image.get();
                imageList.add(getImage);
                List<String> uploadImage = fileService.uploadFile(imageList);
                sourceCode.setImageUrl(uploadImage.get(0));
            }

                sourceCode.setTitle(json.getTitle());
                sourceCode.setDescription(json.getDescription());
                sourceCode.setRootName(json.getRootName());
                sourceCode.setUpdatedAt(LocalDateTime.now());

                sourceCodeRepository.save(sourceCode);


            validatorResult.put("url", "/" + sourceCode.getId());
            return validatorResult;
        }
    }



    @Override
    public SourceCodeResDto getSourceCode(Long id) {



        Optional<SourceCode> getSourceCode = sourceCodeRepository.findById(id);

        String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
        SourceCodeResDto returnSourceCode;
        if (getSourceCode.isPresent()) {
            SourceCode sourceCode = getSourceCode.get();
            sourceCode.setImageUrl(domain + sourceCode.getImageUrl());
            sourceCode.setFileUrl(domain + sourceCode.getFileUrl());
            returnSourceCode = new SourceCodeResDto().of(sourceCode);
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }
        return returnSourceCode;

    }









    @Override
    public void deleteSourceCode(Long id) {
        Optional<SourceCode> getSourceCode = sourceCodeRepository.findById(id);
        if (getSourceCode.isPresent()) {
            sourceCodeRepository.delete(getSourceCode.get());
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND_ARTICLE);
        }
    }


    @Override
    public Page<SourceCodeResDto> getSourceCodes(Pageable pageable) {



        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), 10, Sort.by("updatedAt").descending());
        Page<SourceCode> getSourceCode;

        getSourceCode = sourceCodeRepository.findAllByOrderByUpdatedAtDesc(pageRequest);
        if (getSourceCode.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }

        List<SourceCodeResDto> returnSourceCodes = getSourceCode.getContent()
                .stream()
                .map(SourceCodeResDto::new)
                .collect(Collectors.toList());

        String domain = "https://" + bucket + ".s3." + region + ".amazonaws.com/";
        for (SourceCodeResDto sourceCode : returnSourceCodes) {
            if (!Objects.equals(sourceCode.getImageUrl(), "")) {
                sourceCode.setImageUrl(domain + sourceCode.getImageUrl());
            }
            if (!Objects.equals(sourceCode.getFileUrl(), "")) {
                sourceCode.setFileUrl(domain + sourceCode.getFileUrl());
            }
        }

        return new PageImpl<>(returnSourceCodes, pageRequest, getSourceCode.getTotalElements());
    }









}

