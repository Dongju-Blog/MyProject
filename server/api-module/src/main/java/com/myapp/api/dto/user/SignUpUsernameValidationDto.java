package com.myapp.api.dto.user;

import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class SignUpUsernameValidationDto {



    @NotBlank(message = "EMPTY_USERNAME")
    @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "INVALID_USERNAME")
    private String username;

    public SignUpUsernameValidationDto(User user) {
        this.username = user.getUsername();
    }
}
