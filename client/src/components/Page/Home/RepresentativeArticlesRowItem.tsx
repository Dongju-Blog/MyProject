import { getArticlesItemType } from '@/types/board'
import { dateFormatter } from '@/util/dateFormatter'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React from 'react'

type RepresentativeArticlesRowItemPropsType = {
  article: getArticlesItemType
}

function RepresentativeArticlesRowItem({article}: RepresentativeArticlesRowItemPropsType) {
  const router = useRouter()

  return (
    <div css={carouselArticleitemWrapperCSS} onClick={() => router.push(`/board/${article.boardName}/${article.id}`)}>
      <div css={imageWrapperCSS}>
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            css={css`
              height: 100%;
              width: 100%;
              object-fit: cover;
            `}
          />
        ) : (
          <img
            src={"/assets/Thumbnail.png"}
            css={css`
              filter: invert(80%);
              width: 70%;
              height: auto;
            `}
          />
        )}
      </div>
      <div css={contentWrapperCSS}>
          <div css={css`font-size: 20px;`}>{article.title}</div>
          <div css={css`font-size: 14px; color: rgba(0, 0, 0, 0.5);`}>{dateFormatter(article.createdAt)}</div>
      </div>
    </div>
  )
}

export const carouselArticleitemWrapperCSS = css`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.3);
  background-color: white;
  overflow: hidden;
  border-radius: 20px;;
  cursor: pointer;

  transition: transform 1s, box-shadow 1s;
  &:hover {
    transform: scale(105%);
    box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.4);
  }
`

const imageWrapperCSS = css`
  flex: 3;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.05);
  height: 200px;
`;

const contentWrapperCSS = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
`

export default RepresentativeArticlesRowItem