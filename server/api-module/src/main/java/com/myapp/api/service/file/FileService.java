package com.myapp.api.service.file;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface FileService {
    List<String> uploadFile(List<MultipartFile> multipartFiles);

    void deleteFile(List<String> fileNames);
}
