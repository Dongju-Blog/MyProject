package com.myapp.api.service.user;

import com.myapp.api.dto.user.EmailPostDto;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.dto.user.SignUpUsernameValidationDto;
import com.myapp.core.entity.EmailMessage;
import com.myapp.core.entity.User;
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

    void setTempPassword(User user, String newPassword);

    /**
     * StudentSignUpRequestDto 를 받아 학생 회원가입
     *
     * @param (emailPostDto, type)
     * @return
     */
    Boolean sendMail(EmailPostDto emailPostDto, String type);

}
