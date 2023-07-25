import React from 'react'
import { commentsItemWrapperCSS } from './ArticleCommentsItem'
import { css } from '@emotion/react'
import Skeleton from '@/components/Interface/Loading/Skeleton';

type ArticleCommentsLoadingPropsType = {
  count: number
}
function ArticleCommentsLoading({count}: ArticleCommentsLoadingPropsType) {
  const array = Array.from({length:count}); 

  const renderLoading = array.map((el, idx) => {
    return (
      <Skeleton key={`article-loading-${idx}`} css={commentsItemWrapperCSS} />
    )
  })
  return (
    <React.Fragment>
      {renderLoading}
    </React.Fragment>
  )
}


export default ArticleCommentsLoading