import React from 'react'
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getArticleResponseType } from '@/types/board';
import { getArticleAPI } from '@/api/board/getArticleAPI';
import ArticleViewer from './ArticleViewer';

type ArticlePropsType = {
  articleId: number;
  boardName: string;
}

function Article({articleId, boardName}: ArticlePropsType) {

  const article = useQuery<getArticleResponseType>(
    [`${decodeURI(boardName)}`, `${articleId}`],
    () => getArticleAPI({category: decodeURI(boardName), id: articleId}),
    {refetchOnWindowFocus : false, refetchOnMount : false, staleTime: 300000, cacheTime: 300000}
  );

  if (article.data) {
    return (
      <React.Fragment>
          <ArticleViewer content={article.data.content} />
      </React.Fragment>
    )
  }
  
}

export default Article