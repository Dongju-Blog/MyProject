package com.myapp.core.repository;

import com.myapp.core.entity.ActiveBoards;
import com.myapp.core.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {


    /**
     * Board table 에서 Id로 게시판 카테고리 정보 가져오기
     *
     * @param id
     * @return Board
     */
    Optional<Board> findById(Long id);

    /**
     * Board table 에서 Name으로 게시판 카테고리 정보 가져오기
     *
     * @param name
     * @return Board
     */
    Optional<Board> findByName(String name);


    /**
     * Board 테이블에서 존재하는 모든 객체들 viewOrder 기준으로 정렬하여 가져오기
     *
     * @return List<Board>
     */
    @Query("SELECT b FROM Board b LEFT JOIN b.activeBoard ab ORDER BY ab.viewOrder ASC NULLS LAST")
    List<Board> findAllOrderByViewOrder();
//    @Query("SELECT b FROM Board b JOIN b.activeBoard ab ORDER BY ab.viewOrder ASC NULLS LAST")
//    List<Board> findAllOrderByViewOrder();


    /**
     * Board table 에서 ids 리스트에 존재하는 객체들 가져오기
     *
     * @param ids
     * @return Board
     */
    @Query("SELECT e FROM Board e WHERE e.id IN :ids ORDER BY FIELD(e.id, :ids)")
    List<Board> findByIds(@Param("ids") List<Long> ids);

//    /**
//     * Board table 에서 order로 게시판 카테고리 정보 가져오기
//     *
//     * @param viewOrder
//     * @return Board
//     */
//    Optional<Board> findByViewOrder(int viewOrder);
//
//    @Query(value = "SELECT COUNT(*) FROM board WHERE view_order IS NOT NULL", nativeQuery = true)
//    Integer countNotNullViewOrder();
//
//
//    /**
//     * Board table 에서 isSecret false와 viewOrder이 null이 아닌 게시판 카테고리 정보 가져오기
//     *
//     * @param
//     * @return Board
//     */
//    List<Board> findByViewOrderIsNotNullAndIsSecretFalse();
//
//    /**
//     * Board table 에서 viewOrder이 null이 아닌 게시판 카테고리 정보 가져오기
//     *
//     * @param
//     * @return Board
//     */
//    List<Board> findByViewOrderIsNotNull();
//

//
//
//    /**
//     * Board table 존재하는 모든 객체들 viewOrder 기준으로 정렬하여 가져오기
//     *
//     * @param
//     * @return Board
//     */
//    @Query("SELECT e FROM Board e ORDER BY e.viewOrder ASC NULLS LAST")
//    List<Board> findAllOrderByViewOrder();

}
