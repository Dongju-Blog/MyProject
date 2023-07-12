package com.myapp.api.user;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.myapp.api.dto.user.LoginDto;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import javax.servlet.http.HttpServletRequest;


@Component
@RequiredArgsConstructor
@Slf4j
public class RefreshTokenProvider {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    // 리프레시 토큰 만료 시간 (2주)
    static final long EXPIRATIONTIME = 14L * 24 * 60 * 60 * 1000;
    static final String PREFIX = "Refresh";

    private final Key key;


    // 서명된 JWT 토큰 생성
    public String getRefreshToken(LoginDto user) {
        String refreshToken = Jwts.builder()
                .setSubject(user.getUsername())
                .setHeader(createHeader())
                .setClaims(createClaims(user))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();

        return refreshToken;
    }

    public String getNewAccessToken(String refreshToken) {
//        String refreshToken = getExistedRefreshToken(request);
        Long userId = getId(refreshToken);
        Optional<User> currentUser = userRepository.findById(userId);

        if (currentUser.isPresent()) {
            User user = currentUser.get();

            LoginDto loginDto = new LoginDto();
            loginDto.setUsername(user.getUsername());
            loginDto.setPassword(user.getPassword());

            String accessToken = Jwts.builder()
                    .setSubject(loginDto.getUsername())
                    .setHeader(createHeader())
                    .setClaims(createClaims(loginDto))
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                    .signWith(key)
                    .compact();

            return accessToken;
        }
        return null; // 에러 Throw
    }


    public String getExistedRefreshToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith(PREFIX + " ")) {
//            return authorizationHeader.substring(7);
            return authorizationHeader.replace(PREFIX + " ", "").trim();
        }

        return null;
    }


    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    private Map<String, Object> createClaims(LoginDto user) {
        Map<String, Object> claims = new HashMap<>();

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            User userInfo = userRepository.findByUsername(user.getUsername())
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USERNAME));
            claims.put("id", userInfo.getId());
            claims.put("username", userInfo.getUsername());
            claims.put("role", userInfo.getRole());
            claims.put("status", userInfo.getStatus());
        } else {
            // 에러 throw
            throw new CustomException(ErrorCode.NOT_FOUND_USERNAME);
        }

        return claims;
    }

    /**
     * Token 에서 id 값 추출
     *
     * @param token
     * @return id
     */
    public Long getId(String token) {
        return ((Number) getClaims(token).get("id")).longValue();
    }

    /**
     * Token 에서 username 값 추출
     *
     * @param token
     * @return username
     */
    public String getUsername(String token) {
        return (String) getClaims(token).get("username");
    }

    /**
     * Token 에서 role 값 추출
     *
     * @param token
     * @return role
     */
    public Role getRole(String token) {
        String role = (String) getClaims(token).get("role");
        return Role.valueOf(role);
    }

    /**
     * Token 정보 추출
     * ex) String userId = (String) jwtTokenProvider.getClaims(token).get("id");
     *
     * @param token
     * @return id, username
     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

}