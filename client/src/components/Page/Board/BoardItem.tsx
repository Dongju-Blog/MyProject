import React from 'react'
import { useRouter } from "next/router";
import { getArticlesItemType } from '@/types/board';
import { css } from "@emotion/react";

type BoardItemPropsType = {
  article: getArticlesItemType
  boardName: string
}
function BoardItem({article, boardName}: BoardItemPropsType) {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/board/${boardName}/${article.id}`)} css={articleItemWrapperCSS}>
      <div css={textWrapperCSS}>
        <div css={titleWrapperCSS}>{article.title}</div>
        <div>
          {article.preview}
        </div>
      </div>
      <div css={imageWrapperCSS}>
        <img src={article.thumbnail}/>
      </div>
      
    </div>
  )
}

const articleItemWrapperCSS = css`
  width: 100%;
  max-height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  cursor: pointer;

`

const textWrapperCSS = css`
  padding: 24px;
  flex: 5;
`

const imageWrapperCSS = css`
  flex: 2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & img {
    width: 100%;
    height: auto;
  }
`

const titleWrapperCSS = css`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
`

export default BoardItem