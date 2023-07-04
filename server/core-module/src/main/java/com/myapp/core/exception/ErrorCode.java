package com.myapp.core.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 에러 코드 Enum
 *
 */
@Getter
@AllArgsConstructor
public enum ErrorCode{

    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "1", "토큰이 유효하지 않거나 누락되었습니다."),
    PROHIBITED(HttpStatus.BAD_REQUEST, "2", "잘못된 접근입니다."),
    BODY_MISSING_KEY(HttpStatus.BAD_REQUEST, "3", "request body의 키가 누락되었습니다."),
    BODY_MISSING_VALUE(HttpStatus.BAD_REQUEST, "4", "request body의 값이 누락되었습니다."),
    NOT_FOUND_USERNAME(HttpStatus.BAD_REQUEST, "5", "가입되지 않은 회원입니다."),

    INVALID_USERNAME(HttpStatus.BAD_REQUEST, "100", "잘못된 아이디입니다."),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "101", "비밀번호가 틀렸습니다."),
    NOT_MATCHED_CHECKED_PASSWORD(HttpStatus.BAD_REQUEST, "102", "비밀번호와 비밀번호 확인이 일치하지 않습니다."),




    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
