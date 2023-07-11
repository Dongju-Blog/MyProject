package com.myapp.api.service.user;

import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.dto.user.SignUpUsernameValidationDto;
import com.myapp.core.exception.ErrorCode;
import org.springframework.validation.Errors;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface UserService {

    /**
     * StudentSignUpRequestDto 를 받아 학생 회원가입
     *
     * @param requestDto
     * @return student.getId()
     */
    Map<String, String> signUp(SignUpDto requestDto, Errors errors);


    Map<String, String> login(LoginDto user);

    Map<String, String> getUserInformation(HttpServletRequest request);

}
