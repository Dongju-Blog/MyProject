package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.article.ArticlesResDto;
import com.myapp.api.dto.article.CreateArticleDto;
import com.myapp.api.dto.sourceCode.CreateSourceCodeDto;
import com.myapp.api.dto.sourceCode.SourceCodeResDto;
import com.myapp.api.service.board.BoardService;
import com.myapp.api.service.sourceCode.SourceCodeService;
import com.myapp.core.constant.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sourceCode")
public class SourceCodeController {

    private final SourceCodeService sourceCodeService;





    /**
     * createSourceCode
     *
     * @param (json, files)
     * @return
     */
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> createSourceCode(@Valid @RequestPart CreateSourceCodeDto json, @RequestPart MultipartFile file, Optional<MultipartFile> image, Errors errors, Model model) {
        Map<String, String> validatorResult = sourceCodeService.createSourceCode(json, file, image, errors);

        if (validatorResult.get("url").isEmpty()) {
            model.addAttribute("sourceCodeDto", json);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(validatorResult, HttpStatus.OK);
    }

    /**
     * updateSourceCode
     *
     * @param (id, json, files)
     * @return
     */
    @PutMapping(value= "/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> updateSourceCode(@PathVariable("id") Long id, @Valid @RequestPart CreateSourceCodeDto json, @RequestPart Optional<MultipartFile> file, Optional<MultipartFile> image, Errors errors, Model model) {
        Map<String, String> validatorResult = sourceCodeService.updateSourceCode(id, json, file, image, errors);

        if (validatorResult.get("url").isEmpty()) {
            model.addAttribute("sourceCodeDto", json);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(validatorResult, HttpStatus.OK);
    }


    /**
     * deleteSourceCode
     *
     * @param (id)
     * @return
     */
    @DeleteMapping("/{id}")
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> deleteSourceCode(@PathVariable("id") Long id) {
        sourceCodeService.deleteSourceCode(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * getSourceCodes
     *
     * @param
     * @return
     */
    @GetMapping()
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<Page<SourceCodeResDto>> getSourceCodes(Pageable pageable) {
        return new ResponseEntity<>(sourceCodeService.getSourceCodes(pageable), HttpStatus.OK);
    }


    /**
     * getSourceCode
     *
     * @param id
     * @return article
     */
    @GetMapping("/{id}")
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<?> getSourceCode(@PathVariable("id") Long id) {
        return new ResponseEntity<>(sourceCodeService.getSourceCode(id), HttpStatus.OK);
    }










}
