import React from 'react'
import { useRouter } from "next/router";
import { getArticlesItemType } from '@/types/board';
import { css } from "@emotion/react";
import { dateFormatter } from '@/util/dateFormatter';

type BoardItemPropsType = {
  article: getArticlesItemType
  boardName: string
}
function BoardMobileItem({article, boardName}: BoardItemPropsType) {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/board/${boardName}/${article.id}`)} css={articleItemWrapperCSS}>
      <div css={imageWrapperCSS}>
        {article.thumbnail ? <img src={article.thumbnail} css={css`height: 100%; width: auto;`}/> : <img src={"/assets/Thumbnail.png"} css={css`filter: invert(80%); width: 70%; height: auto;`}/>}
        
      </div>

      <div css={textWrapperCSS}>
        <div css={titleWrapperCSS}>{article.title}</div>
        <div css={previewWrapperCSS}>
          {article.preview}
        </div>
        <div>
          {dateFormatter(article.createdAt)}
        </div>
      </div>
      
      
    </div>
  )
}

const articleItemWrapperCSS = css`
  width: 100%;
  height: 500px;
  min-height: 500px;
  max-height: 500px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
`

const textWrapperCSS = css`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const previewWrapperCSS = css`
  flex: 1;
`

const imageWrapperCSS = css`
  flex: 2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.05);


`

const titleWrapperCSS = css`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
`

export default BoardMobileItem