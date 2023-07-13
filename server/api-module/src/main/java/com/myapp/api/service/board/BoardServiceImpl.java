package com.myapp.api.service.board;

import com.myapp.api.dto.board.ChangeBoardDto;
import com.myapp.api.dto.board.ChangeBoardsOrdersDto;
import com.myapp.api.dto.board.CreateBoardDto;
import com.myapp.api.dto.user.ChangeUserInfoDto;
import com.myapp.api.dto.user.EmailPostDto;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.service.user.UserService;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.api.user.RefreshTokenProvider;
import com.myapp.core.constant.Role;
import com.myapp.core.constant.Status;
import com.myapp.core.entity.Board;
import com.myapp.core.entity.EmailMessage;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.BoardRepository;
import com.myapp.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.Cacheable;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository boardRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Map<String, String> createBoard(CreateBoardDto requestDto, Errors errors) {


        Map<String, String> validatorResult = new HashMap<>();
        Optional<Board> existingBoard = boardRepository.findByName(requestDto.getName());

        if (existingBoard.isPresent()) {
            errors.rejectValue("name", "DUPLICATE_BOARD", "DUPLICATE_BOARD");
        }



        // 유효성 검사에 실패한 필드 목록을 받음
        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format(error.getField());
            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
            validatorResult.put(validKeyName, errorName);
        }


        if (!validatorResult.isEmpty()) {
            return validatorResult;
        } else {
            Integer count = boardRepository.countNotNullViewOrder();
            Board board = Board.builder()
                    .name(requestDto.getName())
                    .viewOrder(count + 1)
                    .isSecret(false)
                    .build();

            boardRepository.save(board);
            return validatorResult;
        }


    }



    @Override
    public Map<String, String> getReadOnlyBoards(HttpServletRequest request) {
        String token = jwtTokenProvider.getExistedAccessToken(request);
        Map<String, String> boards = new HashMap<>();

        if (!token.isEmpty()) {
            Role role = jwtTokenProvider.getRole(token);
            if (role.equals(Role.ADMIN)) {
                List<Board> boardsList = boardRepository.findByViewOrderIsNotNull();
                for (Board board : boardsList) {
                    boards.put(board.getViewOrder().toString(), board.getName());
                }

                return boards;
            }
        }


        List<Board> boardsList = boardRepository.findByViewOrderIsNotNullAndIsSecretFalse();

        for (Board board : boardsList) {
            boards.put(board.getViewOrder().toString(), board.getName());
        }

        return boards;
    }



    @Override
    public List<Object> getAllBoards() {
//        Map<String, Object> boards = new HashMap<>();
//        List<Object> unordered = new ArrayList<>();
        List<Object> ordered = new ArrayList<>();
        List<Board> boardsList = boardRepository.findAllOrderByViewOrder();

        for (Board board : boardsList) {
            Map<String, Object> boardItem = new HashMap<>();
            boardItem.put("viewOrder", board.getViewOrder());
            boardItem.put("id", board.getId());
            boardItem.put("name", board.getName());
            boardItem.put("isSecret", board.getIsSecret());
            ordered.add(boardItem);

        }

//        boards.put("ordered", ordered);
//        boards.put("unordered", unordered);

        return ordered;
    }

    @Override
    public Map<String, String> changeBoard(ChangeBoardDto requestDto, long id, Errors errors) {
        Map<String, String> validatorResult = new HashMap<>();
        Optional<Board> existingBoard = boardRepository.findById(id);

        if (existingBoard.isEmpty()) {
            errors.rejectValue("id", "NOT_FOUND_BOARD", "NOT_FOUND_BOARD");
        }


        // 유효성 검사에 실패한 필드 목록을 받음
        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format(error.getField());
            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
            validatorResult.put(validKeyName, errorName);
        }

        if (!validatorResult.isEmpty()) {
            return validatorResult;
        } else {
            Board board = existingBoard.get();
            board.setName(requestDto.getName());
            board.setIsSecret(requestDto.getIsSecret());
            boardRepository.save(board);
            return validatorResult;
        }


    }

    @Override
    public void changeBoardsOrders(ChangeBoardsOrdersDto requestDto) {
        List<Long> ids = requestDto.getIds();

        List<Board> entities = boardRepository.findByIds(ids);

        Set<Long> existingIds = entities.stream()
                .map(Board::getId)
                .collect(Collectors.toSet());

        List<Long> nonExistentIds = ids.stream()
                .filter(id -> !existingIds.contains(id))
                .collect(Collectors.toList());

        if (!nonExistentIds.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }

        for (int i = 0; i < entities.size(); i++) {
            Board board = entities.get(i);
            board.setViewOrder(null);
        }

        boardRepository.saveAll(entities);

        for (int i = 0; i < entities.size(); i++) {
            Board board = entities.get(i);
            board.setViewOrder(i + 1);
        }

        boardRepository.saveAll(entities);
    }

}
