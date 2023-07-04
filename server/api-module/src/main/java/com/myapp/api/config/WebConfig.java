package com.myapp.api.config;
import com.myapp.api.interceptor.AuthorizationInterceptor;
import com.myapp.api.user.JwtTokenProvider;
import com.myapp.core.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {


    private final UserRepository userRepository;

    public WebConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authorizationInterceptor());
    }

    @Bean
    public AuthorizationInterceptor authorizationInterceptor() {
        JwtTokenProvider tokenProvider = new JwtTokenProvider(userRepository);
        return new AuthorizationInterceptor(tokenProvider);
    }
}