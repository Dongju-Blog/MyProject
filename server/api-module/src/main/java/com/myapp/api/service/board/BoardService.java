package com.myapp.api.service.board;

import com.myapp.api.dto.article.ArticlesResDto;
import com.myapp.api.dto.article.CreateArticleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.validation.Errors;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BoardService {




    List<Object> getReadOnlyBoards(HttpServletRequest request);

    Map<String, String> createArticle(CreateArticleDto json, Optional<List<MultipartFile>> files, Errors errors);

    Map<String, String> updateArticle(Long id, CreateArticleDto json, Optional<List<MultipartFile>> files, Errors errors);

    Map<String, Object> getArticle(HttpServletRequest request, String category, Long id);

    void deleteArticle(String category, Long id);

    Page<ArticlesResDto> getArticles(HttpServletRequest request, String category, Pageable pageable);

//    Slice<ArticlesResDto> getArticlesMobile(String category, Pageable pageable);
    Map<String, Object> getArticlesMobile(HttpServletRequest request, String category, Long lastId, int size);
}
