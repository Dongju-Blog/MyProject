package com.myapp.core.entity;

import lombok.*;

import javax.persistence.*;



@Getter
@Setter
@Builder
public class EmailMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private String to;
    private String subject;
    private String message;
}