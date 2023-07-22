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
import { getSearchedArticlesAPI } from "@/api/board/getSearchedArticlesAPI";
import BoardHeader from "./BoardHeader";

type BoardPropsType = {
  searchKeyword: string;
  currentPage: number;
};

function BoardSearchDesktop({ searchKeyword, currentPage }: BoardPropsType) {
  const auth = useAuthority()
  const router = useRouter()

  const articlesQuery = useQuery<pageablePageArticlesResponseType>(
    ["board", `${searchKeyword}`, `${currentPage}`],
    () => getSearchedArticlesAPI({ searchKeyword: encodeURI(searchKeyword), page: currentPage - 1 }),
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
      <BoardHeader label={`"${searchKeyword}" 에 대한 검색 결과`} fontSize={36} hideCreate={true} />
      <BoardDesktopList articlesQuery={articlesQuery} pageUrl={`/search?keyword=${searchKeyword}`} currentPage={currentPage} />
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
export default BoardSearchDesktop;
