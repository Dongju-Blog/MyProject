package com.myapp.api.interceptor;

import com.myapp.api.user.JwtTokenProvider;
import com.myapp.api.user.RefreshTokenProvider;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// 어떤 api를 사용하던, 리프레시 토큰을 보내면 헤더에 액세스 토큰을 담아서 보낸다.
@Component
@RequiredArgsConstructor
public class JwtTokenInterceptor implements HandlerInterceptor {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenProvider refreshTokenProvider;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {


        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null) {
            // 토큰의 정보가 아예 없을 경우, 패스
            return true;
        }

        String token = jwtTokenProvider.getExistedAccessToken(request);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 액세스 토큰이 유효한 경우 요청 진행
            return true;
        }

        // 액세스 토큰이 유효하지 않은 경우, 리프레시 토큰 확인 및 액세스 토큰 재발급 절차로 넘어간다.
        String refreshToken = refreshTokenProvider.getExistedRefreshToken(request);

        //  && jwtTokenProvider.validateToken(refreshToken)
        if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {

            // 리프레시 토큰이 유효한 경우 새로운 액세스 토큰 발급
            String newAccessToken = refreshTokenProvider.getNewAccessToken(refreshToken);

            if (newAccessToken != null) {

                // 새로운 액세스 토큰을 응답 헤더에 설정
                response.setHeader(HttpHeaders.AUTHORIZATION, newAccessToken);
                return true;
            }
        }

        // 유효한 토큰이 없는 경우 또는 토큰 재발급에 실패한 경우에는 요청 거부
        throw new CustomException(ErrorCode.INVALID_TOKEN);
    }

}