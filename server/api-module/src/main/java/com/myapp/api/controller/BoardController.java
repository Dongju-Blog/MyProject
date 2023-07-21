package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.article.ArticlesResDto;
import com.myapp.api.dto.article.CreateArticleDto;
import com.myapp.api.service.board.BoardService;
import com.myapp.core.constant.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;


    /**
     * getReadOnlyBoards
     *
     * @param
     * @return token
     */
    @GetMapping
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<?> getReadOnlyBoards(HttpServletRequest request) {
        return new ResponseEntity<>(boardService.getReadOnlyBoards(request), HttpStatus.OK);
    }


    /**
     * createBoard
     *
     * @param (json, files)
     * @return
     */
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> createArticle(@Valid @RequestPart CreateArticleDto json, @RequestPart Optional<List<MultipartFile>> files, Errors errors, Model model) {
        Map<String, String> validatorResult = boardService.createArticle(json, files, errors);

        if (validatorResult.get("url").isEmpty()) {
            model.addAttribute("boardDto", json);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(validatorResult, HttpStatus.OK);
    }


    /**
     * updateArticle
     *
     * @param (json, files)
     * @return
     */
    @PutMapping(value= "/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> updateArticle(@PathVariable("id") Long id, @Valid @RequestPart CreateArticleDto json, @RequestPart Optional<List<MultipartFile>> files, Errors errors, Model model) {
        Map<String, String> validatorResult = boardService.updateArticle(id, json, files, errors);

        if (validatorResult.get("url").isEmpty()) {
            model.addAttribute("boardDto", json);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(validatorResult, HttpStatus.OK);
    }


    /**
     * getArticle
     *
     * @param (category, id)
     * @return article
     */
    @GetMapping("/{category}/{id}")
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<?> getArticle(HttpServletRequest request, @PathVariable("category") String category, @PathVariable("id") Long id) {

        return new ResponseEntity<>(boardService.getArticle(request, category, id), HttpStatus.OK);
    }


    /**
     * deleteArticle
     *
     * @param (category, id)
     * @return
     */
    @DeleteMapping("/{category}/{id}")
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> deleteArticle(@PathVariable("category") String category, @PathVariable("id") Long id) {
        boardService.deleteArticle(category, id);
        return ResponseEntity.ok(HttpStatus.OK);
    }



    /**
     * getArticles
     *
     * @param category
     * @return
     */
    @GetMapping("/{category}")
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<Page<ArticlesResDto>> getArticles(HttpServletRequest request, @PathVariable("category") String category, Pageable pageable) {

        return new ResponseEntity<>(boardService.getArticles(request, category, pageable), HttpStatus.OK);
    }

//    /**
//     * getArticlesMobile
//     *
//     * @param category
//     * @return
//     */
//    @GetMapping("/mobile/{category}")
//    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
//    public ResponseEntity<Slice<ArticlesResDto>> getArticlesMobile(@PathVariable("category") String category, Pageable pageable) {
//
//        return new ResponseEntity<>(boardService.getArticlesMobile(category, pageable), HttpStatus.OK);
//    }

    /**
     * getArticlesMobile
     *
     * @param category
     * @return
     */
    @GetMapping("/mobile/{category}")
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<?> getArticlesMobile(HttpServletRequest request, @PathVariable("category") String category, @RequestParam Long lastId, @RequestParam int size) {

        return new ResponseEntity<>(boardService.getArticlesMobile(request, category, lastId, size), HttpStatus.OK);
    }


}
