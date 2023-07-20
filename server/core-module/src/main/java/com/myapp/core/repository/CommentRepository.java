package com.myapp.core.repository;


import com.myapp.core.entity.Comment;
import com.myapp.core.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    /**
     * Comment table 에서 Id로 댓글 가져오기
     *
     * @param id
     * @return comment
     */
    Optional<Comment> findById(Long id);


    /**
     * Comment table 에서 ArticleId로 댓글들 가져오기
     *
     * @param articleId
     * @return comments
     */
    @Query("SELECT c FROM Comment c WHERE c.article.id = :articleId AND c.parent IS NULL")
    Page<Comment> findByArticle_IdAndParentIsNull(@Param("articleId") Long articleId, Pageable pageable);

    /**
     * Comment table 에서 ArticleId와 ancestorId로 댓글들 가져오기
     *
     * @param (articleId, parentId)
     * @return comments
     */
    Page<Comment> findByArticle_IdAndParent_Id(Long articleId, Long parentId, Pageable pageable);
}
