package com.myapp.api.service.user;

import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import com.myapp.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;




    @Override
    public Long signUp(SignUpDto requestDto) {

        User user = User.builder()
                .username(requestDto.getUsername())
                .password(requestDto.getPassword())
                .name(requestDto.getName())
                .role(Role.USER)
                .build();



        if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
            // 에러 Throw
        }

        user.encodePassword(passwordEncoder);
        userRepository.save(user);

        return user.getId();
    }


    @Override
    public String login(LoginDto user) {
        Optional<User> userInfo = userRepository.findByUsername(user.getUsername());


        if (userInfo.isPresent()) {
            // 받은 비밀번호를 인코딩하면 다르게 인코딩(암호화)돼서 비교가 안됌
            if (!passwordEncoder.matches(user.getPassword(), userInfo.get().getPassword())) {        // DB의 인코딩 비밀번호를 복호화해서 비교함
                // 에러 Throw
            }
            return jwtTokenProvider.getToken(user);
        } else {
            // 에러 Throw
            return null;
        }

    }
}
