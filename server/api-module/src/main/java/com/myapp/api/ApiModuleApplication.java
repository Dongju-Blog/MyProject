package com.myapp.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@ComponentScan({"com.myapp.core", "com.myapp.api"})
@EntityScan("com.myapp.core")
@EnableJpaRepositories("com.myapp.core")
@SpringBootApplication
public class ApiModuleApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiModuleApplication.class, args);
	}

}
