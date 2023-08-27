package com.myapp.core.entity;

import lombok.*;

import javax.persistence.*;

@Table(name="`file`")
@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false, updatable = false)
    private Long id;

    @Column(nullable = false, unique=true)
    private String url;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;


}
