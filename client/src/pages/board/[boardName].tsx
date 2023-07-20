import React, { useEffect } from 'react'

import { useRouter } from "next/router";
import BoardDesktop from '@/components/Page/Board/BoardDesktop';
import { css } from "@emotion/react";
import Wrapper from '@/components/Interface/Wrapper/Wrapper';
import mediaQuery from '@/util/responsive';
import useResponsive from '@/hooks/useResponsive';
import BoardMobile from '@/components/Page/Board/BoardMobile';

function index() {
  const router = useRouter()
  const {boardName, page} = router.query
  const isMobile = useResponsive(mediaQuery.tablet)

  useEffect(() => {
    console.log(boardName, page)
  }, [page])

  if (boardName) {
    return (
      <Wrapper css={wrapperCSS}>

          <div css={boardWrapperCSS}>
            {isMobile ? <BoardMobile boardName={String(boardName)} /> : <BoardDesktop boardName={String(boardName)} currentPage={page ? Number(page) : 1} />}
            
          </div>

        
        
      </Wrapper>
    )
  }
  
}

const wrapperCSS = css`
  width: 100%;
  height: 100%;
  display: flex;;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  
`



const boardWrapperCSS = css`
  flex: 1;
  /* height: 100%; */
  padding-top: 36px;
  padding-bottom: 36px;
  
  @media ${mediaQuery.tablet} {
    width: 95%;
    
    
  }
  @media ${mediaQuery.overTablet} {
    margin-top: 96px;
    width: 60%;
  }
`

export default index