import React, { useEffect } from 'react'

import { useRouter } from "next/router";
import BoardDesktop from '@/components/Page/Board/BoardDesktop';
import { css } from "@emotion/react";
import Wrapper from '@/components/Interface/Wrapper/Wrapper';
import mediaQuery from '@/util/responsive';
import useResponsive from '@/hooks/useResponsive';
import BoardMobile from '@/components/Page/Board/BoardMobile';
import BoardSearchDesktop from '@/components/Page/Board/BoardSearchDesktop';
import BoardSearchMobile from '@/components/Page/Board/BoardSearchMobile';

function index() {
  const router = useRouter()
  const {keyword, page} = router.query
  const isMobile = useResponsive(mediaQuery.tablet)



  if (keyword) {
    return (
      <Wrapper css={[wrapperCSS, backgroundCSS]}>

          <div className={"float"} css={boardWrapperCSS}>
            <div css={css`padding-bottom: 36px; width: 100%; flex: 1;`}>
            {isMobile ? <BoardSearchMobile searchKeyword={decodeURI(String(keyword))} /> : <BoardSearchDesktop searchKeyword={decodeURI(String(keyword))} currentPage={page ? Number(page) : 1} />}
            </div>
            
            
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
  align-items: center;
  
  

  
`

const backgroundCSS = css`
    position: relative;
    /* height: 100%; */
    
	&::before {
		content: "";
		position: absolute;
		top:-40%;
		left: 0;
		width: 100vw;
		height: 100vh;
    z-index: 0;
		/* background: linear-gradient( to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) ); */
		/* background-size: cover; */
    
		/* filter: brightness(50%); */
    background-image: url('/assets/Wallpaper5_compressed.png');
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.1);
    filter: opacity(50%) ;
	}

  &::after {
		content: "";
		position: absolute;
		top: 70%;
		left: 0;
		width: 100vw;
		height: 30%;
    z-index: 0;
		background-color: #ffffff;
    box-shadow: 0px 0px 300px 320px rgba(255, 255, 255, 1);

    
	}

  & .float {
    
    /* position: relative; */
    z-index: 10;
  }
`




const boardWrapperCSS = css`
  flex: 1;
  height: 100%;
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  
  
  @media ${mediaQuery.tablet} {
    width: 95%;
    
    
  }
  @media ${mediaQuery.overTablet} {
    margin-top: 96px;
    width: 60%;
  }
`

export default index