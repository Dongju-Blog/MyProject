package com.myapp.api.annotation.user;

import com.myapp.core.constant.Role;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Authorize {
    Role[] value() default {}; // Role 배열을 파라미터로 받도록 수정
}