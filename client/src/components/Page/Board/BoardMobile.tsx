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

type BoardPropsType = {
  boardName: string;
};

function BoardMobile({ boardName }: BoardPropsType) {




    return (
      <div css={boardWrapperCSS}>
        <div css={articlesWrapperCSS}>
          <div css={categoryTitleWrapperCSS}>{decodeURI(boardName)}</div>
        </div>
        <BoardMobileList boardName={boardName} />


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
  font-size: 36px;
  font-weight: 700;
`;

const loadingWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default BoardMobile;
