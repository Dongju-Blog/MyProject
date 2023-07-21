package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.user.*;
import com.myapp.api.service.user.UserService;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.EmailMessage;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    /**
     * 유저 회원가입
     *
     * @param requestDto
     * @return id
     */
    @PostMapping("/signup")
    @Authorize({Role.GUEST})
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpDto requestDto, Errors errors, Model model) {

        Map<String, String> validatorResult = userService.signUp(requestDto, errors);

        if (!validatorResult.isEmpty()) {
            model.addAttribute("userDto", requestDto);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }


    /**
     * Login
     *
     * @param user
     * @return token
     */
    @PostMapping("/login")
    @Authorize({Role.GUEST})
    public ResponseEntity<?> getToken(@RequestBody LoginDto user, HttpServletResponse response) {
        return new ResponseEntity<>(userService.login(user, response), HttpStatus.OK);
    }


    /**
     * Logout
     *
     * @param
     * @return token
     */
    @PostMapping("/logout")
    @Authorize({Role.USER, Role.ADMIN})
    public ResponseEntity<?> logout(HttpServletResponse response) {

        return new ResponseEntity<>(userService.logout(response), HttpStatus.OK);
//        return ResponseEntity.ok(HttpStatus.OK);
    }



    /**
     * 유저 회원가입
     *
     * @param requestDto
     * @return id
     */
    @PostMapping("/change")
    @Authorize({Role.USER, Role.ADMIN})
    public ResponseEntity<?> changeUserInfo(HttpServletRequest request, @Valid @RequestBody ChangeUserInfoDto requestDto, Errors errors, Model model) {

        Map<String, String> validatorResult = userService.changeUserInfo(request, requestDto, errors);

        if (!validatorResult.isEmpty()) {
            model.addAttribute("userDto", requestDto);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return new ResponseEntity<>(validatorResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }


    /**
     * GetUserInformation
     *
     * @param request
     * @return userInformation
     */
    @GetMapping
    @Authorize({Role.USER, Role.ADMIN})
    public ResponseEntity<?> getUserInformation(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getUserInformation(request), HttpStatus.OK);
    }

    /**
     * GetVisibleUserInformation
     *
     * @param request
     * @return userInformation
     */
    @GetMapping("/change")
    @Authorize({Role.USER, Role.ADMIN})
    public ResponseEntity<?> getVisibleUserInformation(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getVisibleUserInformation(request), HttpStatus.OK);
    }




    /**
     * 비밀번호 찾기
     *
     * @param emailPostDto
     * @return ok
     */
    @PostMapping("/find_password")
    @Authorize({Role.GUEST})
    public ResponseEntity<?> sendPasswordMail(@RequestBody EmailPostDto emailPostDto) {
//        EmailMessage emailMessage = EmailMessage.builder()
//                .to(emailPostDto.getEmail())
//                .subject("[dj.Blog] 계정 관리 메일입니다.")
//                .build();

        Boolean result = userService.sendMail(emailPostDto, "password");

        if (result) {
            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * 아이디 찾기
     *
     * @param emailPostDto
     * @return ok
     */
    @PostMapping("/find_username")
    @Authorize({Role.GUEST})
    public ResponseEntity<?> sendUsernameMail(@RequestBody EmailPostDto emailPostDto) {
//        EmailMessage emailMessage = EmailMessage.builder()
//                .to(emailPostDto.getEmail())
//                .subject("[dj.Blog] 계정 관리 메일입니다.")
//                .build();

        Boolean result = userService.sendMail(emailPostDto, "username");

        if (result) {
            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
