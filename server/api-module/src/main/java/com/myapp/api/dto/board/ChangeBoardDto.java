package com.myapp.api.dto.board;





import com.myapp.core.entity.Board;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class ChangeBoardDto {

    @NotBlank(message = "EMPTY_FIELD")
    @Pattern(regexp = "^(?=.*[가-힣a-zA-Z])[ 가-힣a-zA-Z0-9$@!&]{2,20}$", message = "INVALID_BOARD_NAME")
    private String name;

    @NotNull(message = "EMPTY_FIELD")
    private Boolean isSecret;



    public ChangeBoardDto(Board board) {
        this.name = board.getName();
        this.isSecret = board.getIsSecret();
    }


}
