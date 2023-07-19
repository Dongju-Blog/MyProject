package com.myapp.api.service.admin;

import com.myapp.api.dto.board.ChangeBoardDto;
import com.myapp.api.dto.board.ChangeBoardsOrdersDto;
import com.myapp.api.dto.board.CreateBoardDto;
import org.springframework.validation.Errors;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface AdminService {



    Map<String, String> createBoard(CreateBoardDto requestDto, Errors errors);

    List<Object> getAllBoards();

    Map<String, String> changeBoard(ChangeBoardDto requestDto, long id, Errors errors);

    void changeBoardsOrders(ChangeBoardsOrdersDto requestDto);

    void deleteBoard(long id);

}
