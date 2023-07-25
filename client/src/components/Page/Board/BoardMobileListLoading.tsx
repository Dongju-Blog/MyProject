import React from 'react'
import { css } from "@emotion/react";

import Skeleton from '@/components/Interface/Loading/Skeleton';
import { articleMobileItemWrapperCSS } from './BoardMobileListItem';


function BoardMobileListLoading() {
  const array = Array.from({length:10}); 

  const renderLoading = array.map((el, idx) => {
    return (
      <Skeleton key={`board-desktop-list-loading-${idx}`} css={articleMobileItemWrapperCSS} />
    )
  })
  return (
    <React.Fragment>
      {renderLoading}
    </React.Fragment>
  )
}

export default BoardMobileListLoading