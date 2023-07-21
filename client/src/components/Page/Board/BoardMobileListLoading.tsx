import React from 'react'
import { css } from "@emotion/react";

import Skeleton from '@/components/Interface/Loading/Skeleton';
import { articleMobileItemWrapperCSS } from './BoardMobileListItem';


function BoardMobileListLoading() {
  const array = Array.from({length:10}); 

  const renderLoading = array.map((el) => {
    return (
      <Skeleton css={articleMobileItemWrapperCSS} />
    )
  })
  return (
    <React.Fragment>
      {renderLoading}
    </React.Fragment>
  )
}

export default BoardMobileListLoading