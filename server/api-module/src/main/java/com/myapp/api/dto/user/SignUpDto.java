package com.myapp.api.dto.user;

import com.myapp.core.constant.Role;
import com.myapp.core.entity.User;
import com.myapp.core.exception.ErrorCode;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class SignUpDto {

    @NotBlank(message = "EMPTY_NAME")
    @Pattern(regexp = "^[가-힣]{2,10}$" , message = "INVALID_NAME")
    private String name;

    @NotBlank(message = "EMPTY_USERNAME")
    @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "INVALID_USERNAME")
    private String username;

    @NotBlank(message = "EMPTY_PASSWORD")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$", message = "INVALID_PASSWORD")
    private String password;

    @NotBlank(message = "EMPTY_CHECKED_PASSWORD")
    private String checkedPassword;

    @NotBlank(message = "EMPTY_EMAIL")
    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "INVALID_EMAIL")
    private String email;

    private Role role;

    private String status;

    public SignUpDto(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.name = user.getName();
        this.role = Role.USER;
        this.status = "approved";
    }

    public String getUsername() {
        return username;
    }

}
