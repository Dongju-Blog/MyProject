import React from "react";
import { useRouter } from "next/router";
import { getArticlesItemType } from "@/types/board";
import { css } from "@emotion/react";
import { dateFormatter } from "@/util/dateFormatter";

type BoardItemPropsType = {
  article: getArticlesItemType;
  boardName: string;
};
function BoardMobileListItem({ article, boardName }: BoardItemPropsType) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/board/${boardName}/${article.id}`)}
      css={[articleMobileItemWrapperCSS, articleMobileItemWrapperSecondCSS]}
    >
      <div css={imageWrapperCSS}>
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            css={css`
              height: 100%;
              width: auto;
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

      <div css={textWrapperCSS}>
        <div css={titleWrapperCSS}>{article.title}</div>
        <div css={previewWrapperCSS}>{article.preview}</div>
        <div>{dateFormatter(article.createdAt)}</div>
      </div>
    </div>
  );
}

export const articleMobileItemWrapperCSS = css`
  width: 100%;
  height: 500px;
  min-height: 500px;
  max-height: 500px;
  border-radius: 4px;
  
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  content-visibility: auto;
`;

const articleMobileItemWrapperSecondCSS = css`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
`

const textWrapperCSS = css`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const previewWrapperCSS = css`

  margin-bottom: 16px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap:break-word; 
  line-height: 1.2em;
  height: 4.8; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
`;

const imageWrapperCSS = css`
  flex: 2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.05);
  height: 200px;
`;

const titleWrapperCSS = css`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export default BoardMobileListItem;
