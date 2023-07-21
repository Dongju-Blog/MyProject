package com.myapp.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) // 선택적으로 상태 코드를 지정할 수 있습니다.
public class MyCustomException extends RuntimeException {

    public MyCustomException(String message) {
        super(message);
    }
}