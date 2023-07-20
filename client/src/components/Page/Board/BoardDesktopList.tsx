import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pageablePageArticlesResponseType } from "@/types/board";
import { getArticlesAPI } from "@/api/board/getArticlesAPI";
import { useRouter } from "next/router";
import Pagination from "@/components/Interface/Pagination/Pagination";
import BoardDesktopListItem from "./BoardDesktopListItem";
import { css } from "@emotion/react";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import BoardDesktopListLoading from "./BoardDesktopListLoading";


type BoardPropsType = {
  boardName: string;
  currentPage: number;
};

function BoardDesktopList({ boardName, currentPage }: BoardPropsType) {
  const router = useRouter();

  // const [page, setPage] = useState(currentPage ? currentPage : 0)
  // const {page} = router.query

  const article = useQuery<pageablePageArticlesResponseType>(
    ["board", `${decodeURI(boardName)}`, `${currentPage}`],
    () => getArticlesAPI({ category: boardName, page: currentPage - 1 }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 300000,
      cacheTime: 300000,
    }
  );

  const renderArticles =
    article.data &&
    article.data.content.map((el) => {
      return <BoardDesktopListItem article={el} boardName={boardName} />;
    });

  if (article.data) {
    return (
      <div css={articlesListWrapperCSS}>
        <div css={articlesWrapperCSS}>{renderArticles}</div>
        <div css={desktopPaginationWrapperCSS}>
          <Pagination
            key={`${boardName}-${currentPage}`}
            currentPage={currentPage}
            maxPage={article.data.totalPages}
            baseUrl={`/board/${boardName}`}
            queryString={"page"}
          />
        </div>
      </div>
    );
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
  gap: 24px;
`;

const desktopPaginationWrapperCSS = css``;

const categoryTitleWrapperCSS = css`
  font-size: 36px;
  font-weight: 700;
`;

export default BoardDesktopList;
