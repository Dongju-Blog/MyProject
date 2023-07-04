package com.myapp.api.user;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.myapp.api.dto.user.LoginDto;
import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import com.myapp.core.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    private final UserRepository userRepository;
    static final long EXPIRATIONTIME = 86400000;
    static final String PREFIX = "Bearer";



    // 비밀 키 생성. 시연 용도로만 이용할 것.
    // 애플리케이션 구성에서 읽을 수 있음
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);



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

    // 요청 권한 부여 헤더에서 토큰을 가져와 토큰을 확인하고 사용자 이름을 얻음
//    public String getAuthUser(HttpServletRequest request) {
//        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
//
//        if (token != null) {
//            String user = Jwts.parserBuilder()
//                    .setSigningKey(key)
//                    .build()
//                    .parseClaimsJws(token.replace(PREFIX, ""))
//                    .getBody()
//                    .getSubject();
//
//            if (user != null) {
//                return user;
//            }
//        }
//        return null;
//    }


    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    private Map<String, Object> createClaims(LoginDto user){
        Map<String, Object> claims = new HashMap<>();

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            User userInfo = userRepository.findByUsername(user.getUsername())
                    .orElseThrow(() -> null); // null을 에러 throw로 변경할 것.
            claims.put("id", userInfo.getId());
            claims.put("username", userInfo.getUsername());
            claims.put("role", userInfo.getRole());
        }
        else {
            // 에러 throw
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
     * @param token
     * @return id, username
     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

}
