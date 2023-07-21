import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pageablePageArticlesResponseType } from "@/types/board";
import { getArticlesAPI } from "@/api/board/getArticlesAPI";
import { useRouter } from "next/router";
import Pagination from "@/components/Interface/Pagination/Pagination";

import { css } from "@emotion/react";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import BoardMobileItem from "./BoardMobileListItem";
import BoardDesktopList from "./BoardDesktopList";
import Button from "@/components/Interface/Button/Button";
import useAuthority from "@/hooks/useAuthority";

type BoardPropsType = {
  boardName: string;
  currentPage: number;
};

function BoardDesktop({ boardName, currentPage }: BoardPropsType) {
  const auth = useAuthority()
  const router = useRouter()
  return (
    <div css={boardWrapperCSS}>
      <div css={categoryTitleWrapperCSS}>
        <span css={css`font-size: 36px; font-weight: 700;`}>{decodeURI(boardName)}</span>
        <div>
        {auth.currentUser.role === "ADMIN" && <Button theme={"grey"} css={buttonCSS} onClick={() => {router.push("/create")}}>Create</Button>}
        </div>
      </div>
      <BoardDesktopList boardName={boardName} currentPage={currentPage} />
    </div>
  );
}

const boardWrapperCSS = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 36px;

`;

const categoryTitleWrapperCSS = css`
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonCSS = css`
  width: 100px;
`
export default BoardDesktop;
