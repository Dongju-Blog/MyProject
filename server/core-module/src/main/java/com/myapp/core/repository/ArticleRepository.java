package com.myapp.core.repository;

import com.myapp.core.entity.Article;
import com.myapp.core.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    /**
     * Board table 에서 Id로 게시글 가져오기
     *
     * @param id
     * @return Article
     */
    Optional<Article> findById(Long id);

    /**
     * Board table 에서 Name으로 게시글 가져오기
     *
     * @param title
     * @return Article
     */
    Optional<Article> findByTitle(String title);

    /**
     * Board table 에서 카테고리 이름과 게시글 id로 게시판 게시글 가져오기
     *
     * @param (boardName, id)
     * @return Article
     */
    Optional<Article> findByBoard_NameAndId(String boardName, Long id);

    /**
     * Board table 에서 카테고리 이름으로 게시판 게시글들 가져오기
     *
     * @param boardName
     * @return Articles
     */
    Page<Article> findByBoard_Name(String boardName, Pageable pageable);

}
