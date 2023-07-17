package com.myapp.api.controller;


import com.amazonaws.services.s3.AmazonS3Client;
import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.service.file.FileService;
import com.myapp.core.constant.Role;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileController {
    private final FileService fileService;

    @PostMapping
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new CustomException(ErrorCode.EMPTY_FILE);
        }

        Map<String, String> result = fileService.uploadFile(file);
        return new ResponseEntity<>(result, HttpStatus.OK);

    }

}
