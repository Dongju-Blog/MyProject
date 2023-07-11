package com.myapp.api.user;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.myapp.api.dto.user.LoginDto;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import com.myapp.core.repository.UserRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    private final UserRepository userRepository;
    static final long EXPIRATIONTIME = 3600000;
    public static final String PREFIX = "Bearer";

    private final Key key;


    // 서명된 JWT 토큰 생성
    public String getToken(LoginDto user) {
        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .setHeader(createHeader())
                .setClaims(createClaims(user))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(key)
                .compact();

        return token;
    }


    // 액세스 토큰 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | IllegalArgumentException ex) {
            // 유효하지 않은 토큰
            return false;
        }
    }


    public String getExistedAccessToken(HttpServletRequest request) {
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
     * Token 에서 status 값 추출
     *
     * @param token
     * @return status
     */
    public String getStatus(String token) {
        return (String) getClaims(token).get("status");
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

//    public String parseJwt(HttpServletRequest request){
//        String headerAuth=null;     // 1. 변수 초기화
//
//        // 2. 쿠키에서 JWT 추출
//        Cookie[] cookies = request.getCookies();
//        if(cookies!=null){
//            for (Cookie cookie : cookies) {
//                if (cookie.getName().equals("Authorization")) {
//                    log.info("[parseJwt] 쿠키에서 Authorization 캐치");
//                    log.info("[parseJwt] 쿠키에서 Authorization : {}", cookie.getValue());
//                    headerAuth = cookie.getValue();
//                    break;
//                }
//            }
//
//            // 3. 쿠키에서 JWT를 추출할 수 있었다면 해당 값 반환
//            if(headerAuth!=null){
//                return headerAuth;
//            }
//        }
//
//        // 4. 쿠키에서 JWT를 추출할 수 없으면 HTTP 헤더에서 추출
//        headerAuth = request.getHeader("Authorization");
//        return headerAuth;
//    }

}