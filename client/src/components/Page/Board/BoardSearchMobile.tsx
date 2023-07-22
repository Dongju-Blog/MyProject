import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
import BoardMobileList from "./BoardMobileList";
import { getSearchedArticlesMobileAPI } from "@/api/board/getSearchedArticlesMobileAPI";
import BoardHeader from "./BoardHeader";

type BoardPropsType = {
  searchKeyword: string;
};

function BoardSearchMobile({ searchKeyword }: BoardPropsType) {
  const [size, setSize] = useState(10);

  const articlesQuery =
  useInfiniteQuery<mobileArticlesResponseType>(
    ["board", `${searchKeyword}`],
    ({ pageParam = { size, lastId: 99999999999 } }) =>
      getSearchedArticlesMobileAPI({ searchKeyword: encodeURI(searchKeyword), ...pageParam }),
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
      retry: 1,
    }
  );


    return (
      <div css={boardWrapperCSS}>
        <BoardHeader label={`"${searchKeyword}" 에 대한 검색 결과`} fontSize={24} hideCreate={true} />
        <BoardMobileList articlesQuery={articlesQuery} pageUrl={`/search?keyword=${searchKeyword}`} />


      </div>
    );

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
  font-size: 24px;
  font-weight: 700;
`;

const loadingWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default BoardSearchMobile;
