import React from 'react'
import { css } from "@emotion/react";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";

function RefreshingToken() {
  return (
    <div css={wrapperCSS}>
      <div css={loadingWrapperCSS}>
      <UseAnimations animation={infinity} size={82} />
      <span>유저 정보를 받아오는 중입니다.</span>
      </div>
    </div>
  )
}

const wrapperCSS = css`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const loadingWrapperCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default RefreshingToken