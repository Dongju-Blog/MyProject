package com.myapp.core.entity;


import com.myapp.core.constant.Role;
import com.myapp.core.constant.Status;
import jdk.jfr.Category;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.List;

@Table(name="`article`")
@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Article {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 100000)
    private String content;

    @Column(nullable = false)
    private Boolean isSecret;

    @Column(nullable = false)
    private Boolean isRepresentative;

    @Column(length = 100000)
    private String preview;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "article")
    private List<File> files;

}