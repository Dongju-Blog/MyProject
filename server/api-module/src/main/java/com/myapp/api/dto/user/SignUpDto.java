package com.myapp.api.dto.user;

import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class SignUpDto {

    @NotBlank(message = "100")
    @Pattern(regexp = "^[가-힣]{2,10}$" , message = "105")
    private String name;

    @NotBlank(message = "101")
    @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "106")
    private String username;

    @NotBlank(message = "102")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$", message = "107")
    private String password;

    @NotBlank(message = "103")
    private String checkedPassword;

    @NotBlank(message = "104")
    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "109")
    private String email;

    private Role role;


    public SignUpDto(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.name = user.getName();
        this.role = Role.USER;
    }
}
