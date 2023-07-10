package com.myapp.api.service.user;

import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.api.user.RefreshTokenProvider;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.ehcache.EhCacheCache;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenProvider refreshTokenProvider;


    @Override
    public Long signUp(SignUpDto requestDto) {

        User user = User.builder()
                .username(requestDto.getUsername())
                .password(requestDto.getPassword())
                .email(requestDto.getEmail())
                .name(requestDto.getName())
                .role(Role.USER)
                .build();


        if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
            throw new CustomException(ErrorCode.INVALID_CHECKED_PASSWORD);
        }

        user.encodePassword(passwordEncoder);
        userRepository.save(user);

        return user.getId();
    }

    // 회원가입 시, 유효성 체크
    @Transactional(readOnly = true)
    public Map<String, String> validateHandling(Errors errors) {
    Map<String, String> validatorResult = new HashMap<>();

    // 유효성 검사에 실패한 필드 목록을 받음
    for (FieldError error : errors.getFieldErrors()) {
        String validKeyName = String.format(error.getField());
        String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
        validatorResult.put(validKeyName, errorName);
    }
        return validatorResult;
    }


    @Override
    public Map<String, String> login(LoginDto user) {
        Optional<User> userInfo = userRepository.findByUsername(user.getUsername());
        Map<String, String> response = new HashMap<>();

        if (userInfo.isPresent()) {
            // 받은 비밀번호를 인코딩하면 다르게 인코딩(암호화)돼서 비교가 안됌
            if (!passwordEncoder.matches(user.getPassword(), userInfo.get().getPassword())) {     // DB의 인코딩 비밀번호를 복호화해서 비교함
                // 에러 Throw
                throw new CustomException(ErrorCode.WRONG_PASSWORD);
            }

            String refreshToken = refreshTokenProvider.getRefreshToken(user);
            String accessToken = jwtTokenProvider.getToken(user);

            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            User existingUser = userInfo.get();
            existingUser.setRefreshToken(refreshToken);
            userRepository.save(existingUser);

            return response;
        } else {
            // 에러 Throw
            throw new CustomException(ErrorCode.NOT_FOUND_USERNAME);
        }

    }
}
