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
import BoardHeader from "./BoardHeader";


type BoardPropsType = {
  boardName: string;
  currentPage: number;
};

function BoardDesktop({ boardName, currentPage }: BoardPropsType) {
  const auth = useAuthority()
  const router = useRouter()

  
  const articlesQuery = useQuery<pageablePageArticlesResponseType>(
    ["board", `${boardName}`, `${currentPage}`],
    () => getArticlesAPI({ category: boardName, page: currentPage - 1 }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 300000,
      cacheTime: 300000,
      retry: 1,
    }
  );

  return (
    <div css={boardWrapperCSS}>
      <div>
      <BoardHeader label={boardName} fontSize={36} />
      </div>
      
      <BoardDesktopList articlesQuery={articlesQuery} pageUrl={`/board/${boardName}`} currentPage={currentPage} />
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



const buttonCSS = css`
  width: 100px;
`
export default BoardDesktop;
