import React from 'react'
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticleResponseType } from '@/types/board';
import { getArticleAPI } from '@/api/board/getArticleAPI';
import ArticleViewer from './ArticleViewer';
import { deleteArticleAPI } from '@/api/board/deleteArticleAPI';
import useNotification from '@/components/Interface/StackNotification/useNotification';
import NotiTemplate from '@/components/Interface/StackNotification/NotiTemplate';
import Button from '@/components/Interface/Button/Button';
import useAuthority from '@/hooks/useAuthority';
import { css } from '@emotion/react';
import mediaQuery from '@/util/responsive';
import { dateFormatter } from '@/util/dateFormatter';

type ArticlePropsType = {
  articleId: number;
  boardName: string;
}

function Article({articleId, boardName}: ArticlePropsType) {
  const noti = useNotification()
  const router = useRouter()
  const auth = useAuthority()

  const article = useQuery<getArticleResponseType>(
    [`${decodeURI(boardName)}`, `${articleId}`],
    () => getArticleAPI({category: decodeURI(boardName), id: articleId}),
    {refetchOnWindowFocus : false, refetchOnMount : false, staleTime: 300000, cacheTime: 300000}
  );

  const queryClient = useQueryClient();

  const deleteArticleMutation = useMutation(
    ({ id, category }: { id: number; category: string }) =>
    deleteArticleAPI({ id, category })
  );

  const deleteOnClickHandler = () => {
    if (confirm("게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      deleteArticleMutation.mutate({id: articleId, category: boardName}, {onSuccess: () => {
        noti({content: <NotiTemplate type={"alert"} content={"게시글을 삭제하였습니다."}/>, duration: 5000})
        router.push(`/board/${boardName}`)
      }})
    } 
    
  }

  const adminHeader = (
    <div>
      <Button theme={"text"} onClick={deleteOnClickHandler} css={css`font-size: 12px;`}>삭제</Button>
    </div>
  )
  

  if (article.data) {
    return (
      <React.Fragment>
          <div css={headerWrapperCSS}>
            <div css={titleWrapperCSS}>
              {article.data.title}
            </div>
            <div css={articleInfoWrapperCSS}>
              <div>
              <span css={css`font-weight: 600;`}>{decodeURI(boardName)}</span> · <span css={css`color: rgba(0, 0, 0, 0.6);`}>{dateFormatter(article.data.createdAt)}</span>
              </div>
              {auth.currentUser.role === "ADMIN" && adminHeader}
            </div>
            
          </div>
          <div css={viewerWrapperCSS}>
            <ArticleViewer content={article.data.content} />
          </div>
          
      </React.Fragment>
    )
  }
  
}

const headerWrapperCSS = css`
  
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  

  @media ${mediaQuery.mobile} {
    /* margin-top: 96px; */
    background-color: rgba(0, 0, 0, 0.05);
    padding: 96px 24px 16px 24px;
    
  }
  @media ${mediaQuery.desktop} {
    margin-bottom: 16px;
    padding: 96px 0px 8px 0px;
  }
`

const viewerWrapperCSS = css`
  @media ${mediaQuery.mobile} {
    /* margin-top: 96px; */
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0px 24px 16px 24px;
    
  }
  @media ${mediaQuery.desktop} {
    margin-bottom: 16px;
    padding: 0px 0px 8px 0px;
  }
`

const titleWrapperCSS = css`
  
  @media ${mediaQuery.mobile} {
    font-size: 36px;
    margin-bottom: 8px;
    
  }
  @media ${mediaQuery.desktop} {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 16px;

  }
`

const articleInfoWrapperCSS = css`
  display: flex;
  justify-content: space-between;
`

export default Article