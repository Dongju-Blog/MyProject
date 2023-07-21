package com.myapp.core.repository;

import com.myapp.core.entity.Article;
import com.myapp.core.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
     * Board 테이블에서 카테고리 이름과 게시글 ID로 게시판 게시글 가져오기
     *
     * @param boardName 카테고리 이름
     * @param id        게시글 ID
     * @return Optional<Article>
     */
    @Query("SELECT a FROM Article a WHERE a.board.name = :boardName AND a.id = :id AND a.board.isSecret = false")
    Optional<Article> findByBoard_NameAndIdAndBoardIsSecretFalse(String boardName, Long id);



//    /**
//     * Board table 에서 카테고리 이름으로 게시판 게시글들 가져오기
//     *
//     * @param boardName
//     * @return Articles
//     */
//    Page<Article> findByBoard_Name(String boardName, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.board.name = :boardName")
    Page<Article> findByBoard_Name(String boardName, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE a.board.name = :boardName AND a.board.isSecret = false")
    Page<Article> findByBoard_NameAndIsSecretFalse(String boardName, Pageable pageable);



//    @Query("SELECT p FROM Article p WHERE p.board.name = :boardName")
//    Slice<Article> findByBoard_NameAsSlice(String boardName, Pageable pageable);




    @Query(value = "SELECT a FROM Article a WHERE a.id < ?1 AND a.board.name = ?2 ORDER BY a.id DESC")
    Page<Article> findByBoard_NameAndIdLessThanOrderByIdDesc(Long lastArticleId, String boardName, Pageable pageable);

    @Query(value = "SELECT a FROM Article a WHERE a.id < ?1 AND a.board.name = ?2 AND a.board.isSecret = false ORDER BY a.id DESC")
    Page<Article> findByBoard_NameAndIdLessThanAndBoardIsSecretFalseOrderByIdDesc(Long lastArticleId, String boardName, Pageable pageable);

}
