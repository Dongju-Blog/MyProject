package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.article.ArticlesResDto;
import com.myapp.api.dto.article.CreateArticleDto;
import com.myapp.api.dto.board.ChangeBoardDto;
import com.myapp.api.dto.board.ChangeBoardsOrdersDto;
import com.myapp.api.dto.board.CreateBoardDto;
import com.myapp.api.dto.user.*;
import com.myapp.api.service.board.BoardService;
import com.myapp.api.service.user.UserService;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.EmailMessage;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.UserRepository;
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
     * @return
     */
    @GetMapping("/{category}/{id}")
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<?> getArticle(@PathVariable("category") String category, @PathVariable("id") Long id) {

        return new ResponseEntity<>(boardService.getArticle(category, id), HttpStatus.OK);
    }

    /**
     * getArticles
     *
     * @param category
     * @return
     */
    @GetMapping("/{category}")
    @Authorize({Role.GUEST, Role.USER, Role.ADMIN})
    public ResponseEntity<Page<ArticlesResDto>> getArticles(@PathVariable("category") String category, Pageable pageable) {

        return new ResponseEntity<>(boardService.getArticles(category, pageable), HttpStatus.OK);
    }


}
