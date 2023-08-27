package com.myapp.core.repository;

import com.myapp.core.entity.Article;
import com.myapp.core.entity.SourceCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SourceCodeRepository extends JpaRepository<SourceCode, Long> {
    /**
     * SourceCode table 에서 Id로 게시글 가져오기
     *
     * @param id
     * @return SourceCode
     */
    Optional<SourceCode> findById(Long id);

    /**
     * SourceCode table 에서 모든 게시글 가져오기
     *
     * @param
     * @return SourceCode
     */
    Page<SourceCode> findAllByOrderByUpdatedAtDesc(Pageable pageable);





}
