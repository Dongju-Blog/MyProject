import React from 'react'
import { css } from "@emotion/react";
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';

type LoadingPropsType = {
  label: string
}

function Loading({label}: LoadingPropsType) {
  return (
    <div css={loadingWrapperCSS}>
      <UseAnimations animation={loading} size={56} />
      <span>{label}</span>
    </div>
  )
}

const loadingWrapperCSS = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

export default Loading