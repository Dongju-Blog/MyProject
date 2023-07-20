import React from 'react'
import { css } from '@emotion/react'

type SkeletonPropsType = {

} & React.HTMLAttributes<HTMLDivElement>;

function Skeleton({...props}: SkeletonPropsType) {
  return (
    <div   {...props} css={skeletonCSS}>
      <div className={"skeleton"}>

      </div>
    </div>
  )
}

const skeletonCSS = css`
  
  
  .skeleton {
    width: 100%;
    height: 100%;
    color: rgba(0,0,0,0);
    background-image: linear-gradient(270deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1));
    background-size: 200% 100%;
    animation: skeleton-loading 8s ease-in-out infinite;
  }
  @keyframes skeleton-loading {
      0% {
          background-position: 100% 0;
      }
      100% {
          background-position: -100% 0;
      }
  }
`

export default Skeleton