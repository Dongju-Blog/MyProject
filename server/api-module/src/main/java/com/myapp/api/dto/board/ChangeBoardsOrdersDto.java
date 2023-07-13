package com.myapp.api.dto.board;





import com.myapp.core.entity.Board;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@NoArgsConstructor
public class ChangeBoardsOrdersDto {

    private List<Long> ids;

    public ChangeBoardsOrdersDto(List<Long> ids) {
        this.ids = ids;
    }


}
