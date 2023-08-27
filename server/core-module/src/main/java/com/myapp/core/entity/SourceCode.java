package com.myapp.core.entity;


import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name="`sourceCode`")
@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SourceCode {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 100000)
    private String description;

    @Column(nullable = false)
    private String rootName;

    @Column(nullable = false)
    private String fileUrl;

    @Column()
    private String imageUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;



}