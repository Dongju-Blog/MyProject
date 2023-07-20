import { getCommentsItemType } from '@/types/comment'
import React, {useState} from 'react'
import { css } from "@emotion/react";
import { dateFormatter } from '@/util/dateFormatter';
import { AUTH_ICON } from '@/components/Assets/AuthIcons';
import Button from '@/components/Interface/Button/Button';
import useAuthority from '@/hooks/useAuthority';
import ArticleComments from './ArticleComments';

type ArticleCommentsItemPropsType = {
  comment: getCommentsItemType
  articleId: number;
  parentCommentId: number | null
  depth: number
}

function ArticleCommentsItem({comment, depth, articleId, parentCommentId}: ArticleCommentsItemPropsType) {
  const auth = useAuthority()
  const [isVisibleChild, setIsVisibleChild] = useState(false)

  return (
    <React.Fragment>

    
    <div css={[commentsItemWrapperCSS, commentsItemWrapperSecondCSS]}>
      <div css={commentHeaderCSS}>
        <div css={authIconWrapperCSS}>{AUTH_ICON}</div>
        <div css={userWrapperCSS}>
          <div css={infoWrapperCSS}>
            <div css={css`font-weight: 600;`}>{comment.username}</div>
            <div css={css`font-weight: 300; font-size: 14px;`}>
              {comment.content}
            </div>
          </div>
          
          <div css={footerWrapperCSS}>
            <div css={css`font-size: 12px; color: rgba(0, 0, 0, 0.6);`}>{dateFormatter(comment.createdAt)}</div>  
            <div css={buttonWrapperCSS}>
              {comment.childrenCommentsCount ? <span css={buttonCSS} onClick={() => {setIsVisibleChild((prev) => !prev)}}>답글 보기 ({comment.childrenCommentsCount})</span> : ""}
              {auth.currentUser.username === comment.username && <span css={buttonCSS}>수정</span>}
              {auth.currentUser.username === comment.username && <span css={buttonCSS}>삭제</span>}
            </div>
          </div>
          
        </div>
        
      </div>
      
      
    </div>
    

    
      {isVisibleChild && <div css={childWrapperCSS({depth})}><ArticleComments articleId={articleId} parentCommentId={comment.id} depth={depth + 1} /></div>}  
    </React.Fragment>
  )
}

export const commentsItemWrapperCSS = css`
  width: 100%;
  min-height: 110px;
  
  border-radius: 20px;
  /* background-color: rgba(0, 0, 0, 0.05); */
  
  

  
`

const commentsItemWrapperSecondCSS = css`
  background-color: #eceffc85;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const commentHeaderCSS = css`
  display: flex;
  gap: 16px;
  height: 100%;
  flex: 1;
  /* background-color: blue; */
  
  /* align-items: center; */
`

const userWrapperCSS = css`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  flex: 1;
  /* background-color: red; */
`

const infoWrapperCSS = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`



const authIconWrapperCSS = css`
margin-top: 4px;
border-radius: 100%;
background-color: rgba(0, 0, 0, 0.1);
width: 32px;
height: 32px;
display: flex;
justify-content: center;
align-items: center;

& path {
  stroke: rgba(0, 0, 0, 0.3);
}
`

const footerWrapperCSS = css`
  display: flex;
  justify-content: space-between;
`

const buttonWrapperCSS = css`
  display: flex;
  gap: 8px;
  user-select: none;
`

const buttonCSS = css`
  color: rgba(0, 0, 0, 0.6);
  font-size: 12px;
  transition: color 1s;
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`

const childWrapperCSS = ({depth}: {depth: number}) => {
  return css`
    margin-left: 32px;
  `
}

export default ArticleCommentsItem