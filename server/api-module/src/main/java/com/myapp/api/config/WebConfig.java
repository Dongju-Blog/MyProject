package com.myapp.api.config;

import com.myapp.api.interceptor.AuthorizationInterceptor;
//import com.myapp.api.interceptor.JwtTokenInterceptorBackup;
import com.myapp.api.interceptor.JwtTokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final AuthorizationInterceptor authorizationInterceptor;
    private final JwtTokenInterceptor jwtTokenInterceptor;

    @Autowired
    public WebConfig(AuthorizationInterceptor authorizationInterceptor, JwtTokenInterceptor jwtTokenInterceptor) {
        this.authorizationInterceptor = authorizationInterceptor;
        this.jwtTokenInterceptor = jwtTokenInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtTokenInterceptor)
                .addPathPatterns("/api/**");
        registry.addInterceptor(authorizationInterceptor)
                .addPathPatterns("/api/**");
//                .excludePathPatterns("/api/public");


    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:8081", "https://server.dj-blog.com", "https://www.dj-blog.com", "https://dj-blog.com")
                .exposedHeaders("Authorization")	//make client read header("jwt-token")
                .allowCredentials(true)
                .allowedMethods(
                HttpMethod.GET.name(),
                HttpMethod.HEAD.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name());
        ;
    }




}