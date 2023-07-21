import React, { useState } from 'react'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsAPI } from '@/api/comment/getCommentsAPI';
import { pageableSliceCommentsResponseType, postCommentBodyType } from '@/types/comment';
import ArticleCommentsItem from './ArticleCommentsItem';
import { css } from "@emotion/react";
import Textarea from '@/components/Interface/Textarea/Textarea';
import Button from '@/components/Interface/Button/Button';
import ArticleCommentsLoading from './ArticleCommentsLoading';
import { postCommentAPI } from '@/api/comment/postCommentsAPI';
import useAuthority from '@/hooks/useAuthority';
import ArticleCommentsTextarea from './ArticleCommentsTextarea';

type ArticleCommentsPropsType = {
  articleId: number;
  parentCommentId: number | null
  depth: number
  entity: number
}

function ArticleComments({articleId, parentCommentId, depth, entity}: ArticleCommentsPropsType) {
  const [ inputState, setInputState ] = useState<string>("")
  const queryClient = useQueryClient();
  const auth = useAuthority()

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

    const createCommentMutation = useMutation(
      ({ body }: { body: postCommentBodyType }) =>
      postCommentAPI({ body })
    );

    const submitHandler = () => {
      const body = {
        content: inputState,
        articleId,
        parentCommentId: parentCommentId
      }
      createCommentMutation.mutate({body}, {
        onSuccess: () => {
          queryClient.invalidateQueries([`comments`, `${articleId}-${parentCommentId}`]);
          setInputState(() => "")
        }
      })
    }

  const renderComments = data && data.pages.map((page) => {
    const renderPageItems = page.content.map((el, idx) => {
      return <ArticleCommentsItem comment={el} depth={depth} articleId={articleId} parentCommentId={parentCommentId} />
    })
    return renderPageItems
  })

  const showMoreButton = (
    <div css={showMoreWrapperCSS}>
      <Button onClick={() => fetchNextPage()} theme={"text"} css={css`font-weight: 500;`}>Show More...</Button>
    </div>
  )

  const renderTextarea = (
    
    <ArticleCommentsTextarea inputState={inputState} setInputState={setInputState} submitHandler={submitHandler}/>
  )

  const renderRequireLogin = (
    <div css={emptyWrapperCSS}>
      댓글 작성은 로그인이 필요한 서비스입니다.
    </div>
  )

  const renderEmpty = (
    <React.Fragment>
      
      <div css={emptyWrapperCSS}>
        댓글을 작성해 주세요!
      </div>
 
      {renderTextarea}

      </React.Fragment>
  )
  
  if (isFetched && data?.pages[0].content.length !== 0) {
    return (
      <div css={commentsWrapperCSS}>
        {renderComments}
        {hasNextPage && showMoreButton}
  
        {/* {showMoreButton} */}
        {depth === 0 && <div css={dividerCSS} />}
        {auth.currentUser.role === 'GUEST' ? (depth === 0 ? renderRequireLogin : null) : renderTextarea}
        {depth !== 0 && <div css={dividerCSS} />}
      </div>
    )
  } else if (isLoading || isError || !data) {
    return (
      <div css={commentsWrapperCSS}>
        <ArticleCommentsLoading count={depth === 0 ? 10 : entity} />
        {renderTextarea}
      </div>
    )
  } else if (!isLoading) {
    return (
      <React.Fragment>
        {auth.currentUser.role === 'GUEST' ? renderRequireLogin : renderEmpty}
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
  min-height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 16px;
  background-color: #f3f6ff;
  border-radius: 20px;
`
export default ArticleComments