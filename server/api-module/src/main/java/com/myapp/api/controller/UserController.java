package com.myapp.api.controller;


import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.dto.user.SignUpUsernameValidationDto;
import com.myapp.api.service.user.UserService;
import com.myapp.core.constant.Role;
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

import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity<?> getToken(@RequestBody LoginDto user) {
        return new ResponseEntity<>(userService.login(user), HttpStatus.OK);
    }


    /**
     * GetUserInformation
     *
     * @param request
     * @return userInformation
     */
    @GetMapping("/get_user")
    @Authorize({Role.USER})
    public ResponseEntity<?> getUserInformation(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getUserInformation(request), HttpStatus.OK);
    }


}
