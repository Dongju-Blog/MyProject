import { getArticlesItemType, pageablePageArticlesResponseType } from '@/types/board'
import React, {useEffect} from 'react'
import RepresentativeArticlesRowItem, { carouselArticleitemWrapperCSS } from './RepresentativeArticlesRowItem';
import Skeleton from '@/components/Interface/Loading/Skeleton';
import { css } from '@emotion/react';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';

type RepresentativeArticlesRowPropsType = {
  articles?: getArticlesItemType[]
  size: number;
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<pageablePageArticlesResponseType, unknown>>
  currentIdx: number;
  contentCount: number;
}

function RepresentativeArticlesRow({articles, size, fetchNextPage, currentIdx, contentCount}: RepresentativeArticlesRowPropsType) {

  useEffect(() => {
    if (contentCount === currentIdx && articles === undefined) {
      fetchNextPage()
    }
  }, [contentCount])

  const renderArticles = articles && articles.map((article) => {
    return (
      <RepresentativeArticlesRowItem article={article}/>
    )
  })

  const renderLoading = Array.from({length: size}).map((el) => {
    return (
      <Skeleton css={carouselArticleitemWrapperCSS} />
    )
  })

  return (
    <div css={rowWrapperCSS({size})}>
      {articles ? renderArticles : renderLoading}
    </div>
  )
}

const rowWrapperCSS = ({size}: {size: number}) => {
  return css`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${`1fr `.repeat(size)};
  grid-column-gap: 32px;
  place-items: center;
  padding: 0px 48px;
`
}

export default RepresentativeArticlesRow