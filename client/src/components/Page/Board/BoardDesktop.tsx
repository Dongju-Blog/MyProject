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

type BoardPropsType = {
  boardName: string;
  currentPage: number;
};

function BoardDesktop({ boardName, currentPage }: BoardPropsType) {
  return (
    <div css={boardWrapperCSS}>
      <div css={categoryTitleWrapperCSS}>{decodeURI(boardName)}</div>
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
  font-size: 36px;
  font-weight: 700;
`;

export default BoardDesktop;
