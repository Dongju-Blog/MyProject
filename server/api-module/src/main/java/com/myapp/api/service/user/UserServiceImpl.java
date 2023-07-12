package com.myapp.api.service.user;

import com.myapp.api.dto.user.EmailPostDto;
import com.myapp.api.dto.user.LoginDto;
import com.myapp.api.dto.user.SignUpDto;
import com.myapp.api.dto.user.SignUpUsernameValidationDto;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.api.user.RefreshTokenProvider;
import com.myapp.core.constant.Role;
import com.myapp.core.constant.Status;
import com.myapp.core.entity.EmailMessage;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.ehcache.EhCacheCache;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenProvider refreshTokenProvider;
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;


    @Override
    public Map<String, String> signUp(SignUpDto requestDto, Errors errors) {


        Map<String, String> validatorResult = new HashMap<>();

        if (requestDto.getPassword() != null && requestDto.getCheckedPassword() != null && !requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
            errors.rejectValue("checkedPassword", "INVALID_CHECKED_PASSWORD", "INVALID_CHECKED_PASSWORD");
        }

        Optional<User> userByUsername = userRepository.findByUsername(requestDto.getUsername());
        if (userByUsername.isPresent()) {
            errors.rejectValue("username", "DUPLICATE_USERNAME", "DUPLICATE_USERNAME");
        }

        Optional<User> userByEmail = userRepository.findByEmail(requestDto.getUsername());
        if (userByEmail.isPresent()) {
            errors.rejectValue("email", "DUPLICATE_EMAIL", "DUPLICATE_EMAIL");
        }

        // 유효성 검사에 실패한 필드 목록을 받음
        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format(error.getField());
            String errorName = ErrorCode.valueOfIgnoreCase(error.getDefaultMessage()).getMessage();
            validatorResult.put(validKeyName, errorName);
        }


        if (!validatorResult.isEmpty()) {
            return validatorResult;
        } else {
            User user = User.builder()
                    .username(requestDto.getUsername())
                    .password(requestDto.getPassword())
                    .email(requestDto.getEmail())
                    .name(requestDto.getName())
                    .role(Role.USER)
                    .status(Status.APPROVED)
                    .build();



            user.encodePassword(passwordEncoder);
            userRepository.save(user);

            return validatorResult;
        }


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

            Role role = userInfo.get().getRole();
            Status status = userInfo.get().getStatus();
            String username = userInfo.get().getUsername();

            response.put("role", String.valueOf(role));
            response.put("status", String.valueOf(status));
            response.put("username", username);

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



    @Override
    @Transactional()
    public Map<String, String> getUserInformation(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        String token = jwtTokenProvider.getExistedAccessToken(request);

        Role role = jwtTokenProvider.getRole(token);
        Status status = jwtTokenProvider.getStatus(token);
        String username = jwtTokenProvider.getUsername(token);

        response.put("role", String.valueOf(role));
        response.put("status", String.valueOf(status));
        response.put("username", username);

//        response.put("token", token);

        return response;
    }

    @Override
    public void setTempPassword(User user, String newPassword) {
        user.setPassword(newPassword);
        user.encodePassword(passwordEncoder);
        userRepository.save(user);
    }

    @Override
    public Boolean sendMail(EmailPostDto emailPostDto, String type) {
        Optional<User> userInfo = userRepository.findByNameAndEmail(emailPostDto.getName(), emailPostDto.getEmail());
        if (userInfo.isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_ACCOUNT);
        }


        EmailMessage emailMessage = EmailMessage.builder()
                .to(emailPostDto.getEmail())
                .subject("[dj.Blog] 계정 관리 메일입니다.")
                .build();

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();


        String authData = "";


        User user = userInfo.get();

        if (type.equals("password")) {
            authData = createCode();
            setTempPassword(user, authData);
        }

        if (type.equals("username")) {
            authData = user.getUsername();
        }




        try {

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(emailMessage.getTo()); // 메일 수신자
            mimeMessageHelper.setSubject(emailMessage.getSubject()); // 메일 제목
            mimeMessageHelper.setText(setContext(authData, "find_" + type), true); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);

            log.info("Success");

            return true;

        } catch (MessagingException e) {
            log.info("fail");
            throw new RuntimeException(e);
        }
    }


    // 인증번호 및 임시 비밀번호 생성 메서드
    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(4);

            switch (index) {
                case 0: key.append((char) ((int) random.nextInt(26) + 97)); break;
                case 1: key.append((char) ((int) random.nextInt(26) + 65)); break;
                default: key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }

    // thymeleaf를 통한 html 적용
    public String setContext(String code, String type) {
        Context context = new Context();
        context.setVariable("code", code);
        return templateEngine.process(type, context);
    }



}
