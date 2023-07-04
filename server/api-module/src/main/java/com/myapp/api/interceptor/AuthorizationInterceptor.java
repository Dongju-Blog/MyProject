package com.myapp.api.interceptor;

import com.myapp.api.annotation.user.Authorize;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.core.constant.Role;
import com.myapp.core.exception.CustomException;
import com.myapp.core.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class AuthorizationInterceptor implements HandlerInterceptor {


    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Authorize authorizeAnnotation = handlerMethod.getMethodAnnotation(Authorize.class);

            if (authorizeAnnotation == null) {
                return true;
            }

            String token = jwtTokenProvider.getExistedAccessToken(request);
            Role[] roles = authorizeAnnotation.value();
            Set<Role> allowedRoles = new HashSet<>(Arrays.asList(roles));

            if ((token == null && allowedRoles.contains(Role.GUEST)) || (token != null && isAuthorizedUser(token, allowedRoles))) {
                return true;
            } else {
                throw new CustomException(ErrorCode.INVALID_TOKEN);
            }
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 컨트롤러 실행 후, 뷰가 렌더링되기 전에 호출됩니다.
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 뷰가 렌더링된 후에 호출됩니다.
    }

    private boolean isAuthorizedUser(String token, Set<Role> allowedRoles) {
        Role userRole = getUserRoleFromToken(token);

        if (userRole != null && allowedRoles.contains(userRole)) {
            return true;
        }
        throw new CustomException(ErrorCode.PROHIBITED);
    }

    private Role getUserRoleFromToken(String token) {
        // 토큰에서 사용자의 역할을 가져오는 로직을 구현합니다.
        // 실제로는 여기에서 토큰을 해독하여 사용자의 역할 정보를 반환해야 합니다.

        if (token != null) {
            return jwtTokenProvider.getRole(token);
        }

        return null;
    }
}