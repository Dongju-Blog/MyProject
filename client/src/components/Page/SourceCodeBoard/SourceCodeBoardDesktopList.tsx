import React, { useState } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { pageablePageArticlesResponseType, pageablePageSourceCodesResponseType } from "@/types/board";
import { getArticlesAPI } from "@/api/board/getArticlesAPI";
import { useRouter } from "next/router";
import Pagination from "@/components/Interface/Pagination/Pagination";
import SourceCodeBoardDesktopListItem from "./SourceCodeBoardDesktopListItem";
import { css } from "@emotion/react";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import SourceCodeBoardDesktopListLoading from "./SourceCodeBoardDesktopListLoading";
import Alert from "@/components/Interface/Loading/Alert";

type SourceCodeBoardPropsType = {
  sourceCodesQuery: UseQueryResult<pageablePageSourceCodesResponseType, unknown>;
  pageUrl: string;
  currentPage: number;
};

function SourceCodeBoardDesktopList({
  sourceCodesQuery,
  pageUrl,
  currentPage,
}: SourceCodeBoardPropsType) {
  const router = useRouter();

  // const [page, setPage] = useState(currentPage ? currentPage : 0)
  // const {page} = router.query

  const renderArticles =
  sourceCodesQuery.data &&
  sourceCodesQuery.data.content.map((el) => {
      return (
        <SourceCodeBoardDesktopListItem
          key={`board-desktop-list-item-${el.id}`}
          sourceCode={el}
          
        />
      );
    });

  if (sourceCodesQuery.data && !sourceCodesQuery.data.empty) {
    return (
      <div css={articlesListWrapperCSS}>
        <div css={articlesWrapperCSS}>{renderArticles}</div>
        <div css={desktopPaginationWrapperCSS}>
          <Pagination
            key={`${pageUrl}-${currentPage}`}
            currentPage={currentPage}
            maxPage={sourceCodesQuery.data.totalPages}
            baseUrl={`${pageUrl}`}
            queryString={"page"}
          />
        </div>
      </div>
    );
  } else if (sourceCodesQuery.error) {
    return (
      <div css={emptyWrapperCSS}>
        <Alert label="게시글이 존재하지 않습니다!" />
      </div>
    );
  } else {
    return (
      <div css={articlesWrapperCSS}>
        <SourceCodeBoardDesktopListLoading />
      </div>
    );
  }
}

const articlesListWrapperCSS = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: 36px;
`;
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

const desktopPaginationWrapperCSS = css``;

const categoryTitleWrapperCSS = css`
  font-size: 36px;
  font-weight: 700;
`;

const emptyWrapperCSS = css`
  width: 100%;
  height: 100%;
`;

export default SourceCodeBoardDesktopList;
