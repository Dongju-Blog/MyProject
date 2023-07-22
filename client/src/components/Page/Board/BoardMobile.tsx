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
import useAuthority from "@/hooks/useAuthority";
import Button from "@/components/Interface/Button/Button";
import BoardHeader from "./BoardHeader";

type BoardPropsType = {
  boardName: string;
};

function BoardMobile({ boardName }: BoardPropsType) {
  const auth = useAuthority()
  const router = useRouter()
  const [size, setSize] = useState(10);

  const articlesQuery =
  useInfiniteQuery<mobileArticlesResponseType>(
    ["board", `${boardName}`],
    ({ pageParam = { size, lastId: 99999999999 } }) =>
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
      retry: 1,
    }
  );


    return (
      <div css={boardWrapperCSS}>
        <BoardHeader label={boardName} fontSize={36} />
        <BoardMobileList articlesQuery={articlesQuery} pageUrl={`/board/mobile/${boardName}`} />


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
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const loadingWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const buttonCSS = css`
  width: 100px;
`

export default BoardMobile;
