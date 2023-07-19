import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  ReactNode,
  Children,
} from "react";
import { getAdminAllBoardAPI } from "@/api/admin/getAdminAllBoardAPI";
import { getAllBoardResponseType } from "@/types/board";
import { useQuery } from "@tanstack/react-query";
import { css } from "@emotion/react";
import Swipe, { SwipeEvent, SwipePosition } from "react-easy-swipe";
import CategoryDragAndDrop from "@/components/Page/Admin/Category/CategoryDragAndDrop";
import Loading from "@/components/Interface/Loading/Loading";

type elementPropertyType = {
  height: number;
};

function category() {

  const categories = useQuery<getAllBoardResponseType>(
    ["admin", "boards"],
    getAdminAllBoardAPI
  );



  return (

    <div css={categoryPageWrapperCSS}>
      {categories?.data ? <CategoryDragAndDrop categories={categories.data}/> : <Loading label={"카테고리 정보를 가져오는 중입니다."}/>}
    </div>

  )


}

const variableCSS = ({
  elementProperty,
}: {
  elementProperty: elementPropertyType;
}) => {
  return css`
    width: 100%;
    height: 100%;
    --itemHeight: ${elementProperty.height}px;
  `;
};

const categoryPageWrapperCSS = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const categoriesWrapperCSS = css`
  width: 300px;
  /* padding: 16px; */
  
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.05);
  padding: 2px 0px 2px 0px;

`;



export default category;
