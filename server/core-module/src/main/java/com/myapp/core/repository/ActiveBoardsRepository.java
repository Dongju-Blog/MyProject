package com.myapp.core.repository;

import com.myapp.core.entity.ActiveBoards;
import com.myapp.core.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface ActiveBoardsRepository extends JpaRepository<ActiveBoards, Long> {
    /**
     * ActiveBoards table 에서 Id로 게시판 카테고리 정보 가져오기
     *
     * @param id
     * @return Board
     */
    Optional<ActiveBoards> findById(Long id);

    /**
     * ActiveBoards 테이블에서 Board의 isSecret이 false인 ActiveBoards 정보 가져오기
     * viewOrder 기준으로 정렬
     *
     * @return List<ActiveBoards>
     */
    @Query("SELECT a FROM ActiveBoards a WHERE a.board.isSecret = false ORDER BY a.viewOrder ASC NULLS LAST")
    List<ActiveBoards> findByBoardIsSecretFalseOrderByViewOrder();



    /**
     * ActiveBoard 테이블에서 모든 ActiveBoard 정보 viewOrder 기준으로 정렬하여 가져오기
     *
     * @return List<ActiveBoard>
     */
    List<ActiveBoards> findAllByOrderByViewOrderAsc();
}
