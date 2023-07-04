package com.myapp.api.service.user;

import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;

public interface UserService {

    /**
     * StudentSignUpRequestDto 를 받아 학생 회원가입
     *
     * @param requestDto
     * @return student.getId()
     */
    Long signUp(SignUpDto requestDto);

    String login(LoginDto user);
}
