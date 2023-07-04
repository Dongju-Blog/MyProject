package com.myapp.api.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class LoginDto {
    @NotBlank(message = "100")
    private String username;
    @NotBlank(message = "104")
    private String password;
}
