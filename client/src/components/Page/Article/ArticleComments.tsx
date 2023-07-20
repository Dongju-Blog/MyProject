import React from 'react'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsAPI } from '@/api/comment/getCommentsAPI';
import { pageableSliceCommentsResponseType } from '@/types/comment';
import ArticleCommentsItem from './ArticleCommentsItem';
import { css } from "@emotion/react";
import Textarea from '@/components/Interface/Textarea/Textarea';
import Button from '@/components/Interface/Button/Button';
import ArticleCommentsLoading from './ArticleCommentsLoading';

type ArticleCommentsPropsType = {
  articleId: number;
  parentCommentId: number | null
  depth: number
}

function ArticleComments({articleId, parentCommentId, depth}: ArticleCommentsPropsType) {



  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetched } =
    useInfiniteQuery<pageableSliceCommentsResponseType>(
      [`comments`, `${articleId}-${parentCommentId}`],
      ({ pageParam = { page: 0 } }) =>
      getCommentsAPI({ articleId, parentCommentId, ...pageParam }),
      {
        getNextPageParam: (lastPage, allPosts) => {
          // 마지막 페이지와 전체 페이지 목록을 받아서 다음 페이지의 파라미터를 계산
          if (lastPage.last) {
            // last 속성이 true이면 더 이상 데이터가 없으므로 null을 반환하여 무한 스크롤을 멈춤
            return null;
          }
          // 마지막 페이지의 nextLastId를 사용하여 다음 페이지를 가져오기 위해 다음 페이지 파라미터를 반환
          return { page: lastPage.number + 1 };
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 18000000,
        cacheTime: 18000000,
      }
    );

  const renderComments = data && data.pages.map((page) => {
    const renderPageItems = page.content.map((el, idx) => {
      return <ArticleCommentsItem comment={el} depth={depth} articleId={articleId} parentCommentId={parentCommentId} />
    })
    return renderPageItems
  })

  const showMoreButton = (
    <div css={showMoreWrapperCSS}>
      <Button theme={"text"} css={css`font-weight: 500;`}>Show More...</Button>
    </div>
  )

  const renderTextarea = (
    <Textarea theme={"default"} css={textareaCSS} placeholder='댓글을 입력해 주세요!'>
          <Textarea.Bottom>
            <div css={textareaButtonWrapperCSS}>
              <div/>
              <Button theme={"text"} css={buttonCSS}>Submit</Button>
            </div>
            
          </Textarea.Bottom>
        </Textarea>
  )
  
  if (isFetched && data?.pages[0].content.length !== 0) {
    return (
      <div css={commentsWrapperCSS}>
        {renderComments}
        {hasNextPage && showMoreButton}
  
        {/* {showMoreButton} */}
        {depth === 0 && <div css={dividerCSS} />}
        {renderTextarea}
        {depth !== 0 && <div css={dividerCSS} />}
      </div>
    )
  } else if (isLoading || isError || !data) {
    return (
      <div css={commentsWrapperCSS}>
        <ArticleCommentsLoading />
      </div>
    )
  } else if (!isLoading) {
    return (
      <React.Fragment>
      <div css={emptyWrapperCSS}>
        댓글을 작성해 주세요!
      </div>
      {renderTextarea}
      </React.Fragment>
      
    )
  }
  
}

const commentsWrapperCSS = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const showMoreWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  
`

const dividerCSS = css`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  /* margin-top: 6px; */
  /* margin-bottom: 2px; */
`

const textareaCSS = css`
  min-height: 80px;
`

const buttonCSS = css`
  width: 100px;
  /* width: 10vw; */
  font-weight: 500;
`

const textareaButtonWrapperCSS = css`
width: 100%; 
height: 36px;
display: flex; justify-content: space-between;
/* background-color: rgba(0, 0, 0, 0.03); */
background-color: #f3f6ff85;

`

const emptyWrapperCSS = css`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 36px;
  background-color: #f3f6ff85;
  border-radius: 4px;
`
export default ArticleComments