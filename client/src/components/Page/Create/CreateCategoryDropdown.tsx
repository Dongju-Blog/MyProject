import { getActiveBoardAPI } from "@/api/board/getActiveBoardAPI";
import { activeBoardItemType } from "@/types/board";
import React, { useState, useEffect } from "react";
import Dropdown from "@/components/Interface/Dropdown/Dropdown";
import { css } from "@emotion/react";
import mediaQuery from "@/util/responsive";
import useGetCategory from "@/hooks/useGetCategory";

type CreateCategoryDropdownPropsType = {
  category: number;
  setCategory: React.Dispatch<React.SetStateAction<number>>;
};

function CreateCategoryDropdown({
  category,
  setCategory,
}: CreateCategoryDropdownPropsType) {
  const categories = useGetCategory()



  const renderCategoryDropdown = categories.map((el, idx) => {
    return <Dropdown.Item id={el.id}>{el.name}</Dropdown.Item>;
  });

  if (categories) {
    return (
      <Dropdown
        theme={"default"}
        state={category}
        setState={setCategory}
        customCss={dropdownCSS}
      >
        <Dropdown.Item id={-1}>
          <span>카테고리 선택</span>
        </Dropdown.Item>
        {renderCategoryDropdown}
      </Dropdown>
    );
  }
}

const dropdownCSS = css`
  min-width: 160px;

  & .selected {
    height: 36px;
  }

  @media ${mediaQuery.mobile} {
    width: 100%;
    
  }
  
`;

export default CreateCategoryDropdown;
