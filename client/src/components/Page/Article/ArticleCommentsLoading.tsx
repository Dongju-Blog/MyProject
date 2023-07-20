import React from 'react'
import { commentsItemWrapperCSS } from './ArticleCommentsItem'
import { css } from '@emotion/react'
import Skeleton from '@/components/Interface/Loading/Skeleton';

function ArticleCommentsLoading() {
  const array = Array.from({length:10}); 

  const renderLoading = array.map((el) => {
    return (
      <Skeleton css={commentsItemWrapperCSS} />
    )
  })
  return (
    <React.Fragment>
      {renderLoading}
    </React.Fragment>
  )
}


export default ArticleCommentsLoading