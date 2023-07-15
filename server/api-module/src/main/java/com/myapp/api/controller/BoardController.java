package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;


    /**
     * createBoard
     *
     * @param requestDto
     * @return
     */
    @PostMapping
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> createBoard(@Valid @RequestBody CreateBoardDto requestDto, Errors errors, Model model) {
        Map<String, String> validatorResult = boardService.createBoard(requestDto, errors);

        if (!validatorResult.isEmpty()) {
            model.addAttribute("boardDto", requestDto);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

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
     * getAllBoards
     *
     * @param
     * @return token
     */
    @GetMapping("/all")
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> getAllBoards() {
        return new ResponseEntity<>(boardService.getAllBoards(), HttpStatus.OK);
    }


    /**
     * changeBoard
     *
     * @param requestDto
     * @return
     */
    @PutMapping("/{id}")
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> changeBoard(@PathVariable("id") long id, @Valid @RequestBody ChangeBoardDto requestDto, Errors errors, Model model) {

        Map<String, String> validatorResult = boardService.changeBoard(requestDto, id, errors);

        if (!validatorResult.isEmpty()) {
            model.addAttribute("boardDto", requestDto);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * changeBoardsOrders
     *
     * @param requestDto
     * @return
     */
    @PutMapping("/orders")
    @Authorize({Role.ADMIN})
    public ResponseEntity<?> changeBoardsOrders(@Valid @RequestBody ChangeBoardsOrdersDto requestDto) {

        boardService.changeBoardsOrders(requestDto); // 변경 작업을 boardService로 이동

        return ResponseEntity.ok(HttpStatus.OK);

    }




}
