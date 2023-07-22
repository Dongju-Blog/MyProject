import React, { useState, useRef, useEffect } from "react";
import { UseInfiniteQueryResult, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { mobileArticlesResponseType } from "@/types/board";
import { getArticlesAPI } from "@/api/board/getArticlesAPI";
import { useRouter } from "next/router";
import Pagination from "@/components/Interface/Pagination/Pagination";
import BoardDesktopItem from "./BoardDesktopListItem";
import { css } from "@emotion/react";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import BoardMobileListItem from "./BoardMobileListItem";
import { getArticlesMobileAPI } from "@/api/board/getArticlesMobileAPI";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { throttle } from "lodash";
import BoardMobileListLoading from "./BoardMobileListLoading";
import Alert from "@/components/Interface/Loading/Alert";

type BoardPropsType = {
  pageUrl: string;
  articlesQuery: UseInfiniteQueryResult<mobileArticlesResponseType, unknown>
};

function BoardMobileList({ articlesQuery, pageUrl }: BoardPropsType) {
  const router = useRouter();
  // const [nextlastId, setNextLastId] = useState(99999999999);
  
  // const [content, setContent] = useState<>()
  const loadingRef = useRef<HTMLDivElement>(null);
  // const [page, setPage] = useState(currentPage ? currentPage : 0)
  // const {page} = router.query

  const [observe, unobserve] = useIntersectionObserver(() => {
    articlesQuery.fetchNextPage();
  });

  

  useEffect(() => {
    if (loadingRef.current) {
      observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        unobserve(loadingRef.current);
      }
    };
  }, [articlesQuery.data]);

  const onScrollHandler = throttle((e: any) => {
    if (e.target.scrollTop !== 0) {
      window.sessionStorage.setItem(
        `board-${pageUrl}-scroll`,
        e.target.scrollTop
      );
    }
  }, 1000);

  useEffect(() => {
    const getScroll = window.sessionStorage.getItem(
      `board-${pageUrl}-scroll`
    );
    if (getScroll) {
      document.body.scrollTo(0, JSON.parse(getScroll));
    }

    document.body.addEventListener("scroll", onScrollHandler);
    return () => {
      document.body.removeEventListener("scroll", onScrollHandler); //clean up
    };
  }, []);

  const renderArticles = articlesQuery.data?.pages.map((page) => {
    const renderPageItems = page.content.map((el) => {
      return <BoardMobileListItem article={el} boardName={el.boardName} />;
    });

    return renderPageItems;
  });

  const renderLoading = (
    <div ref={loadingRef} css={loadingWrapperCSS}>
      <UseAnimations animation={loading2} size={56} />
    </div>
  );

  if (articlesQuery.data && articlesQuery.data.pages[0].content.length !== 0) {
    return (
      <React.Fragment>
        <div css={articlesWrapperCSS}>{renderArticles}</div>

        {!articlesQuery.data.pages[articlesQuery.data.pages.length - 1].last && renderLoading}
      </React.Fragment>
    );
  } else if (articlesQuery.error) {
    return (
      <div css={emptyWrapperCSS}>
        <Alert label="게시글이 존재하지 않습니다!" />
      </div>
    );
  } else {
    return (
      <div css={articlesWrapperCSS}>
        <BoardMobileListLoading />
      </div>
    );
  }
}

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

const desktopPaginationWrapperCSS = css`
  padding-bottom: 36px;
`;

const categoryTitleWrapperCSS = css`
  font-size: 36px;
  font-weight: 700;
`;

const loadingWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const emptyWrapperCSS = css`
  width: 100%;
  height: 100%;
`;

export default BoardMobileList;
