import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import { pageableArticlesResponseType } from '@/types/board';
import { getArticlesAPI } from '@/api/board/getArticlesAPI';
import { useRouter } from "next/router";
import Pagination from '@/components/Interface/Pagination/Pagination';
import BoardItem from './BoardItem';
import { css } from '@emotion/react';

type BoardPropsType = {
  boardName: string
  currentPage: number
}

function Board({boardName, currentPage}: BoardPropsType) {
  const router = useRouter()
  // const [page, setPage] = useState(currentPage ? currentPage : 0)
  // const {page} = router.query

  const article = useQuery<pageableArticlesResponseType>(
    ['board', `${decodeURI(boardName)}`, `${currentPage}`],
    () => getArticlesAPI({category: boardName, page: currentPage - 1}),
    {refetchOnWindowFocus : false, refetchOnMount : false, staleTime: 300000, cacheTime: 300000}
  );

  const renderArticles = article.data && article.data.content.map((el) => {
    return <BoardItem article={el} boardName={boardName} />
  })

  if (article.data) {
    return (
      <div css={boardWrapperCSS}>
        <div>
          {renderArticles}
        </div>
        <div>
          <Pagination currentPage={currentPage} maxPage={article.data.totalPages} baseUrl={`/board/${boardName}`} queryString={'page'} />
        </div>
        
      </div>
    )
  }
  
}

const boardWrapperCSS = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export default Board