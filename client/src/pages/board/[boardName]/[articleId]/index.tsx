import React, { useEffect, useState } from 'react'
import { getArticleAPI } from '@/api/board/getArticleAPI'
import { getArticleResponseType } from '@/types/board'
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Wrapper from '@/components/Interface/Wrapper/Wrapper';
import { css } from "@emotion/react";
import mediaQuery from '@/util/responsive';


const Article = dynamic(
  () => import("@/components/Page/Article/Article"),
  { ssr: false }
);

function index() {
  const router = useRouter()
  const {boardName, articleId} = router.query

  return (
    <div data-color-mode="light" css={[wrapperCSS, backgroundCSS]}>
      <div css={articleWrapperCSS} className={"float"}>
        <Article boardName={String(boardName)} articleId={Number(articleId)} />
      </div>
    </div>
  )
}

const wrapperCSS = css`
  display:flex;
  flex-direction:column;
  align-items:center;
  flex: 1;
  min-height: 100%;
  
`

const backgroundCSS = css`
    position: relative;
    height: 100%;
    
	&::before {
		content: "";
		position: relative;
		top:-40%;
		left: 0;
		width: 100vw;
		height: 100vh;
    z-index: 0;
		/* background: linear-gradient( to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) ); */
		/* background-size: cover; */
    
		/* filter: brightness(50%); */
    background-image: url('/assets/Wallpaper5.jpg');
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.1);
    filter: opacity(50%) ;
	}

  &::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		width: 100vw;
		height: 50%;
    z-index: 1;
		background-color: #ffffff;
    box-shadow: 0px 0px 100px 120px rgba(255, 255, 255, 1);
	}

  & .float {
    position: absolute;
    z-index: 10;
  }
`

const articleWrapperCSS = css`
  padding-bottom: 36px;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media ${mediaQuery.tablet} {
    width: 100%;
    
    
  }
  @media ${mediaQuery.overTablet} {
    margin-top: 96px;
    width: 60%;
  }
`

export default index