package com.myapp.api.dto.user;

import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class SignUpDto {

    @NotBlank(message = "4")
    private String username;
    @NotBlank(message = "4")
    private String password;
    @NotBlank(message = "4")
    private String checkedPassword;
    @NotBlank(message = "4")
    private String name;

    private Role role;


    public SignUpDto(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.name = user.getName();
        this.role = Role.USER;
    }
}
