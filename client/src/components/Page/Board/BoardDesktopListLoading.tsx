import React from 'react'
import { css } from "@emotion/react";
import { articleDesktopItemWrapperCSS } from './BoardDesktopListItem';
import Skeleton from '@/components/Interface/Loading/Skeleton';


function BoardDesktopListLoading() {
  const array = Array.from({length:10}); 

  const renderLoading = array.map((el, idx) => {
    return (
      <Skeleton key={`board-desktop-list-loading-${idx}`} css={articleDesktopItemWrapperCSS} />
    )
  })
  return (
    <React.Fragment>
      {renderLoading}
    </React.Fragment>
  )
}

export default BoardDesktopListLoading