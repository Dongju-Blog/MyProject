package com.myapp.api.dto.board;





import com.myapp.core.constant.Role;
import com.myapp.core.constant.Status;
import com.myapp.core.entity.Board;
import com.myapp.core.entity.User;
import com.myapp.core.exception.ErrorCode;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class CreateBoardDto {

    @NotBlank(message = "EMPTY_FIELD")
    @Pattern(regexp = "^(?=.*[가-힣a-zA-Z])[ 가-힣a-zA-Z0-9$@!&]{2,20}$", message = "INVALID_BOARD_NAME")
    private String name;

    private Integer viewOrder;

    private Boolean isSecret;



    public CreateBoardDto(Board board) {
        this.name = board.getName();
        this.viewOrder = null;
        this.isSecret = false;
    }


}
