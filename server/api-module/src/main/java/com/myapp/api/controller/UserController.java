package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.service.user.UserService;
import com.myapp.core.constant.Role;
import com.myapp.core.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Map;

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
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpDto requestDto) {

        userService.signUp(requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/signup_proc")
    @Authorize({Role.GUEST})
    public ResponseEntity<?> signUpProc(@Valid @RequestBody SignUpDto requestDto, Errors errors, Model model) {
        if (errors.hasErrors()) {
            model.addAttribute("userDto", requestDto);

            Map<String, String> validatorResult = userService.validateHandling(errors);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }

            if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
                errors.rejectValue("checkedPassword", "INVALID_CHECKED_PASSWORD", "INVALID_CHECKED_PASSWORD");
            }

            return new ResponseEntity<>(userService.validateHandling(errors), HttpStatus.BAD_REQUEST);
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
    @Authorize({Role.USER})
    public ResponseEntity<?> getToken(@RequestBody LoginDto user) {
        return new ResponseEntity<>(userService.login(user), HttpStatus.OK);
    }


}
