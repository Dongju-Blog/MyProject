import { getRepresentativeArticlesAPI } from '@/api/board/getRepresentativeArticlesAPI';
import SwipeableGallery from '@/components/Interface/SwipeableGallery/SwipeableGallery';
import { pageablePageArticlesResponseType } from '@/types/board';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import React, { ReactNode, useEffect, useState } from 'react'
import RepresentativeArticlesRow from './RepresentativeArticlesRow';
import useResponsive from '@/hooks/useResponsive';
import mediaQuery from '@/util/responsive';

type RepresentativeArticlesPropsType = {
  articleSize: number
}

function RepresentativeArticles({articleSize}: RepresentativeArticlesPropsType) {


  const [contentCount, setContentCount] = useState(0)
  




  const articlesQuery =
  useInfiniteQuery<pageablePageArticlesResponseType>(
    ["board", `representative-${articleSize}`],
    ({ pageParam = { page: 0 } }) =>
      getRepresentativeArticlesAPI({ size: articleSize, ...pageParam }),
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
      retry: 1,
    }
  );

  // const renderArticles = articlesQuery.data ? articlesQuery.data.pages.map((page, idx) => {
  //   return (
  //     <RepresentativeArticlesRow key={`${articleSize}`} articles={page.content} size={articleSize} fetchNextPage={articlesQuery.fetchNextPage} currentIdx={idx} contentCount={contentCount} />
  //   )
  // }) as Array<ReactNode> : [<RepresentativeArticlesRow size={articleSize} fetchNextPage={articlesQuery.fetchNextPage} currentIdx={0} contentCount={contentCount} />]

  const renderNewArticles = articlesQuery.data && Array.from({length: articlesQuery.data.pages[0].totalPages}).map((el, idx) => {
    if (articlesQuery.data.pages.length > idx) {
      return (
        <RepresentativeArticlesRow key={`${articleSize}-${idx}`} articles={articlesQuery.data?.pages[idx].content} size={articleSize} fetchNextPage={articlesQuery.fetchNextPage} currentIdx={idx} contentCount={contentCount} />
      )
    } else {
      return (
        <RepresentativeArticlesRow key={`${articleSize}-${idx}`} size={articleSize} fetchNextPage={articlesQuery.fetchNextPage} currentIdx={idx} contentCount={contentCount} />
      )
    }
  }) as Array<ReactNode>

  const renderDummy = [<RepresentativeArticlesRow size={articleSize} fetchNextPage={articlesQuery.fetchNextPage} currentIdx={0} contentCount={contentCount} />]

  return (
    <React.Fragment>
      <SwipeableGallery key={`${renderNewArticles && renderNewArticles.length}`} content={renderNewArticles ? renderNewArticles : renderDummy} contentCount={contentCount} setContentCount={setContentCount} />
    </React.Fragment>
  )
}

export default RepresentativeArticles