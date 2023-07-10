package com.myapp.api.dto.user;

import com.myapp.core.exception.ErrorCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class LoginDto {
    @NotBlank(message = "EMPTY_USERNAME")
    private String username;
    @NotBlank(message = "EMPTY_PASSWORD")
    private String password;
}
