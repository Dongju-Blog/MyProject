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
import com.myapp.core.entity.ActiveBoards;
import com.myapp.core.entity.Board;
import com.myapp.core.entity.EmailMessage;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.ActiveBoardsRepository;
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
    private final ActiveBoardsRepository activeBoardsRepository;
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
            int count = (int) boardRepository.count();
            Board board = Board.builder()
                    .name(requestDto.getName())
                    .isSecret(false)
                    .build();

            ActiveBoards activeBoard = ActiveBoards.builder()
                    .viewOrder(count + 1)
                    .board(board) // Board와 연결
                    .build();

            boardRepository.save(board);
            activeBoardsRepository.save(activeBoard);
            return validatorResult;
        }


    }



    @Override
    public List<Object> getReadOnlyBoards(HttpServletRequest request) {
        String token = jwtTokenProvider.getExistedAccessToken(request);
        List<Object> boards = new ArrayList<>();

        if (!token.isEmpty()) {
            Role role = jwtTokenProvider.getRole(token);
            if (role.equals(Role.ADMIN)) {
                List<ActiveBoards> boardsList = activeBoardsRepository.findAllByOrderByViewOrderAsc();
                for (ActiveBoards board : boardsList) {
                    Map<String, Object> boardItem = new HashMap<>();
                    boardItem.put("id", board.getBoard().getId());
                    boardItem.put("name", board.getBoard().getName());
                    boards.add(boardItem);
                }

                return boards;
            }
        }


        List<ActiveBoards> boardsList = activeBoardsRepository.findByBoardIsSecretFalseOrderByViewOrder();
        for (ActiveBoards board : boardsList) {
            Map<String, Object> boardItem = new HashMap<>();
            boardItem.put("id", board.getBoard().getId());
            boardItem.put("name", board.getBoard().getName());
            boards.add(boardItem);

        }

        return boards;
    }



    @Override
    public List<Object> getAllBoards() {
        List<Object> ordered = new ArrayList<>();
        List<Board> boardsList = boardRepository.findAllOrderByViewOrder();

        for (Board board : boardsList) {
            Map<String, Object> boardItem = new HashMap<>();
            if (board.getActiveBoard() != null) {
                boardItem.put("viewOrder", board.getActiveBoard().getViewOrder());
            } else {
                boardItem.put("viewOrder", null);
            }
            boardItem.put("id", board.getId());
            boardItem.put("name", board.getName());
            boardItem.put("isSecret", board.getIsSecret());
            ordered.add(boardItem);

        }


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
    @Transactional
    public void changeBoardsOrders(ChangeBoardsOrdersDto requestDto) {
        List<Long> ids = requestDto.getIds();

        List<ActiveBoards> entities = new ArrayList<>();


        for (int i = 0; i < ids.size(); i++) {
            Optional<Board> board = boardRepository.findById(ids.get(i));
            if (board.isPresent()) {
                ActiveBoards activeBoard = ActiveBoards.builder()
                        .viewOrder(i + 1)
                        .board(board.get()) // Board와 연결
                        .build();
                entities.add(activeBoard);
            } else {
                throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
            }
        }

        activeBoardsRepository.deleteAllInBatch();
        activeBoardsRepository.saveAll(entities);

    }

    @Override
    public void deleteBoard(long id) {
        Optional<Board> existingBoard = boardRepository.findById(id);

        if (existingBoard.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        boardRepository.delete(existingBoard.get());
    }

}
