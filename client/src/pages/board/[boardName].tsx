import React, { useEffect } from 'react'

import { useRouter } from "next/router";
import Board from '@/components/Page/Board/Board';
import { css } from "@emotion/react";
import Wrapper from '@/components/Interface/Wrapper/Wrapper';

function index() {
  const router = useRouter()
  const {boardName, page} = router.query

  useEffect(() => {
    console.log(boardName, page)
  }, [page])

  if (boardName) {
    return (
      <Wrapper css={wrapperCSS}>
        <div css={boardWrapperCSS}>
          <Board boardName={String(boardName)} currentPage={page ? Number(page) : 1} />
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
  justify-content: center;
  align-items: center;
`

const boardWrapperCSS = css`
  width: 60%;
  height: 100%;
  padding: 36px 0px;
`

export default index