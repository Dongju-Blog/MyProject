package com.myapp.api.dto.user;



import com.myapp.core.constant.Role;
import com.myapp.core.constant.Status;
import com.myapp.core.entity.User;
import com.myapp.core.exception.ErrorCode;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class ChangeUserInfoDto {

    @NotBlank(message = "EMPTY_PASSWORD")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$", message = "INVALID_PASSWORD")
    private String password;

    @NotBlank(message = "EMPTY_CHECKED_PASSWORD")
    private String checkedPassword;

    @NotBlank(message = "EMPTY_EMAIL")
    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "INVALID_EMAIL")
    private String email;



    public ChangeUserInfoDto(User user) {
        this.password = user.getPassword();
        this.email = user.getEmail();
    }


}
