package com.myapp.api.service.board;

import com.myapp.api.dto.article.ArticlesResDto;
import com.myapp.api.dto.article.CreateArticleDto;
import com.myapp.api.dto.board.ChangeBoardDto;
import com.myapp.api.dto.board.ChangeBoardsOrdersDto;
import com.myapp.api.dto.board.CreateBoardDto;
import com.myapp.api.dto.user.ChangeUserInfoDto;
import com.myapp.api.dto.user.EmailPostDto;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.core.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BoardService {




    List<Object> getReadOnlyBoards(HttpServletRequest request);

    Map<String, String> createArticle(CreateArticleDto json, Optional<List<MultipartFile>> files, Errors errors);

    Map<String, String> updateArticle(Long id, CreateArticleDto json, Optional<List<MultipartFile>> files, Errors errors);

    Map<String, Object> getArticle(String category, Long id);

    Page<ArticlesResDto> getArticles(String category, Pageable pageable);
}
