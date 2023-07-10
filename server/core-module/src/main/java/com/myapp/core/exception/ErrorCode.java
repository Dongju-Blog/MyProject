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

    EMPTY_NAME(HttpStatus.BAD_REQUEST, "100", "이름은 필수 입력 값입니다."),
    EMPTY_USERNAME(HttpStatus.BAD_REQUEST, "101", "아이디는 필수 입력 값입니다."),
    EMPTY_PASSWORD(HttpStatus.BAD_REQUEST, "102", "비밀번호는 필수 입력 값입니다."),
    EMPTY_CHECKED_PASSWORD(HttpStatus.BAD_REQUEST, "103", "비밀번호 확인은 필수 입력 값입니다."),
    EMPTY_EMAIL(HttpStatus.BAD_REQUEST, "104", "이메일은 필수 입력 값입니다."),

    INVALID_NAME(HttpStatus.BAD_REQUEST, "105", "이름은 한글만 사용하여 2~10자리여야 합니다."),
    INVALID_USERNAME(HttpStatus.BAD_REQUEST, "106", "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다."),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "107", "비밀번호는 8~16자리수여야 합니다. 영문 대소문자, 숫자, 특수문자를 1개 이상 포함해야 합니다."),
    INVALID_CHECKED_PASSWORD(HttpStatus.BAD_REQUEST, "108", "비밀번호와 비밀번호 확인이 일치하지 않습니다."),

    INVALID_EMAIL(HttpStatus.BAD_REQUEST, "109", "이메일 형식이 옳바르지 않습니다."),


    WRONG_PASSWORD(HttpStatus.BAD_REQUEST, "110", "비밀번호가 틀렸습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;

    /**
     * 문자열에 해당하는 ErrorCode를 반환합니다.
     * @param errorName 에러 이름
     * @return ErrorCode
     * @throws IllegalArgumentException 지정된 에러 이름을 가진 ErrorCode가 없는 경우 발생합니다.
     */
    public static ErrorCode valueOfIgnoreCase(String errorName) {
        for (ErrorCode errorCode : values()) {
            if (errorCode.name().equalsIgnoreCase(errorName)) {
                return errorCode;
            }
        }
        throw new IllegalArgumentException("Invalid error name: " + errorName);
    }


}



