package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.service.user.UserService;
import com.myapp.core.constant.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
    public ResponseEntity<HttpStatus> studentSignUp(@Valid @RequestBody SignUpDto requestDto) {
        userService.signUp(requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * Login
     *
     * @param user
     * @return token
     */
    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody LoginDto user) {
        return new ResponseEntity<>(userService.login(user), HttpStatus.OK);
    }


}
