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
  // const [article, setArticle] = useState<getArticleResponseType>()
  const router = useRouter()
  const {boardName, articleId} = router.query



  // useEffect(() => {
  //   categories.refetch()
  // }, [articleId])

  if (articleId !== undefined && boardName !== undefined) {
    return (
      <div data-color-mode="light" css={wrapperCSS}>
        <div css={articleWrapperCSS}>
          <Article boardName={String(boardName)} articleId={Number(articleId)} />
        </div>
      </div>
    )
  }
  
}

const wrapperCSS = css`
  display:flex; flex-direction:column; align-items:center;
`

const articleWrapperCSS = css`
  @media ${mediaQuery.mobile} {
    width: 100%;
    
    
  }
  @media ${mediaQuery.desktop} {
    margin-top: 96px;
    width: 60%;
  }
`

export default index