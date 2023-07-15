package com.myapp.api.service.board;

import com.myapp.api.dto.board.ChangeBoardDto;
import com.myapp.api.dto.board.ChangeBoardsOrdersDto;
import com.myapp.api.dto.board.CreateBoardDto;
import com.myapp.api.dto.user.ChangeUserInfoDto;
import com.myapp.api.dto.user.EmailPostDto;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.core.entity.User;
import org.springframework.validation.Errors;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface BoardService {



    Map<String, String> createBoard(CreateBoardDto requestDto, Errors errors);

    List<Object> getReadOnlyBoards(HttpServletRequest request);



    List<Object> getAllBoards();

    Map<String, String> changeBoard(ChangeBoardDto requestDto, long id, Errors errors);

    void changeBoardsOrders(ChangeBoardsOrdersDto requestDto);

}
