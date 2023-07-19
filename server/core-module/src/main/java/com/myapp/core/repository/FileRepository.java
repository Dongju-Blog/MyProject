package com.myapp.core.repository;


import com.myapp.core.entity.Article;
import com.myapp.core.entity.File;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long>  {

    /**
     * File table 에서 게시글 id로 게시판 게시글들 가져오기
     *
     * @param ArticleId
     * @return Articles
     */
    List<File> findByArticle_Id(Long ArticleId);

}
