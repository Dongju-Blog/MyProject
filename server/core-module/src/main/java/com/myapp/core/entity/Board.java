package com.myapp.core.entity;


import com.myapp.core.constant.Role;
import com.myapp.core.constant.Status;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.List;

@Table(name="`board`")
@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Board {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable = false)
    private Long id;

    @Column(nullable = false, unique=true)
    private String name;

//    @Column(nullable = true, unique=true)
//    private Integer viewOrder;

    @OneToOne(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private ActiveBoards activeBoard;

    @Column(nullable = false)
    private Boolean isSecret;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "board")
    private List<Article> articles;


}