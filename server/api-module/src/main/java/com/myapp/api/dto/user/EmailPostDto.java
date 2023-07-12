package com.myapp.api.dto.user;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
public class EmailPostDto {
    @NotBlank(message = "EMPTY_NAME")
    @Pattern(regexp = "^[가-힣]{2,10}$" , message = "INVALID_NAME")
    private String name;

    @NotBlank(message = "EMPTY_EMAIL")
    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "INVALID_EMAIL")
    private String email;
}