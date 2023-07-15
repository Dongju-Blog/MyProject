package com.myapp.core.entity;

import lombok.*;

import javax.persistence.*;

@Table(name="`activeBoards`")
@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActiveBoards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable = false)
    private Long id;


    @Column(nullable = true)
    private Integer viewOrder;


    @OneToOne
    @JoinColumn(name = "board_id")
    private Board board;
}
