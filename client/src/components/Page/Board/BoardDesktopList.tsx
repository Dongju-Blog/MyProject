import React, { useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { pageablePageArticlesResponseType } from "@/types/board";
import { getArticlesAPI } from "@/api/board/getArticlesAPI";
import { useRouter } from "next/router";
import Pagination from "@/components/Interface/Pagination/Pagination";
import BoardDesktopListItem from "./BoardDesktopListItem";
import { css } from "@emotion/react";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import BoardDesktopListLoading from "./BoardDesktopListLoading";
import Alert from "@/components/Interface/Loading/Alert";


type BoardPropsType = {
  articlesQuery: UseQueryResult<pageablePageArticlesResponseType, unknown>
  pageUrl: string
  currentPage: number;
};

function BoardDesktopList({ articlesQuery, pageUrl, currentPage }: BoardPropsType) {
  const router = useRouter();

  // const [page, setPage] = useState(currentPage ? currentPage : 0)
  // const {page} = router.query

  

  const renderArticles =
  articlesQuery.data &&
  articlesQuery.data.content.map((el) => {
      return <BoardDesktopListItem key={`board-desktop-list-item-${el.id}`} article={el} boardName={el.boardName} />;
    });

  if (articlesQuery.data && !articlesQuery.data.empty) {
    return (
      <div css={articlesListWrapperCSS}>
        <div css={articlesWrapperCSS}>{renderArticles}</div>
        <div css={desktopPaginationWrapperCSS}>
          <Pagination
            key={`${pageUrl}-${currentPage}`}
            currentPage={currentPage}
            maxPage={articlesQuery.data.totalPages}
            baseUrl={`${pageUrl}`}
            queryString={"page"}
          />
        </div>
      </div>
    );
  } else if (articlesQuery.error) {
    return (
      <div css={emptyWrapperCSS}>
        <Alert label="게시글이 존재하지 않습니다!" />

      </div>
    )
  } else {
    return (
      <div css={articlesWrapperCSS}>
        <BoardDesktopListLoading />
      </div>
    )
  }
}


const articlesListWrapperCSS = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 36px;
`
const boardWrapperCSS = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 36px;
`;

const articlesWrapperCSS = css`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const desktopPaginationWrapperCSS = css`
  
`;

const categoryTitleWrapperCSS = css`
  font-size: 36px;
  font-weight: 700;
`;

const emptyWrapperCSS = css`
  width: 100%;
  height: 100%;

`

export default BoardDesktopList;
