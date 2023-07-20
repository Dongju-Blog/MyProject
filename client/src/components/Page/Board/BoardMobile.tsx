import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { mobileArticlesResponseType } from "@/types/board";
import { getArticlesAPI } from "@/api/board/getArticlesAPI";
import { useRouter } from "next/router";
import Pagination from "@/components/Interface/Pagination/Pagination";
import BoardDesktopItem from "./BoardDesktopItem";
import { css } from "@emotion/react";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import BoardMobileItem from "./BoardMobileItem";
import { getArticlesMobileAPI } from "@/api/board/getArticlesMobileAPI";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { throttle } from "lodash";

type BoardPropsType = {
  boardName: string;
};

function BoardMobile({ boardName }: BoardPropsType) {
  const router = useRouter();
  const [nextlastId, setNextLastId] = useState(99999999999);
  const [size, setSize] = useState(10);
  // const [content, setContent] = useState<>()
  const loadingRef = useRef<HTMLDivElement>(null);
  // const [page, setPage] = useState(currentPage ? currentPage : 0)
  // const {page} = router.query

  const [observe, unobserve] = useIntersectionObserver(() => {
    fetchNextPage();
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery<mobileArticlesResponseType>(
      ["board", `${decodeURI(boardName)}`],
      ({ pageParam = { size, lastId: nextlastId } }) =>
        getArticlesMobileAPI({ category: boardName, ...pageParam }),
      {
        getNextPageParam: (lastPage, allPosts) => {
          // 마지막 페이지와 전체 페이지 목록을 받아서 다음 페이지의 파라미터를 계산
          if (lastPage.last) {
            // last 속성이 true이면 더 이상 데이터가 없으므로 null을 반환하여 무한 스크롤을 멈춤
            return null;
          }
          // 마지막 페이지의 nextLastId를 사용하여 다음 페이지를 가져오기 위해 다음 페이지 파라미터를 반환
          return { size, lastId: lastPage.nextLastId };
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 18000000,
        cacheTime: 18000000,
      }
    );

  useEffect(() => {
    if (loadingRef.current) {
      observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        unobserve(loadingRef.current);
      }
    };
  }, [data]);


  const onScrollHandler = throttle((e: any) => {
    if (e.target.scrollTop !== 0) {
      window.sessionStorage.setItem(`board-${boardName}-scroll`, e.target.scrollTop)
    }
  }, 1000)

  useEffect(() => {
    const getScroll = window.sessionStorage.getItem(`board-${boardName}-scroll`)
    if (getScroll) {
      document.body.scrollTo(0, JSON.parse(getScroll));
    }
    
    document.body.addEventListener('scroll', onScrollHandler);
    return () => {
      document.body.removeEventListener('scroll', onScrollHandler); //clean up
    };
    
  }, []);

  const renderArticles = data?.pages.map((page) => {
    const renderPageItems = page.content.map((el) => {
      return <BoardMobileItem article={el} boardName={boardName} />;
    });

    return renderPageItems;
  });

  const renderLoading = (
    <div ref={loadingRef} css={loadingWrapperCSS}>
      <UseAnimations animation={loading2} size={56} />
    </div>
  );

  if (data) {
    return (
      <div css={boardWrapperCSS}>
        <div css={articlesWrapperCSS}>
          <div css={categoryTitleWrapperCSS}>{decodeURI(boardName)}</div>
          {renderArticles}
        </div>

        {!data.pages[data.pages.length - 1].last && renderLoading}
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

export default BoardMobile;
