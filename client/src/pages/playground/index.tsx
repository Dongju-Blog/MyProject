import Wrapper from '@/components/Interface/Wrapper/Wrapper'
import Playground from '@/components/Page/Playground/Playground'
import { css } from "@emotion/react";
import React from 'react'

function index() {
  return (
    <Wrapper css={wrapperCSS}>
      <div css={headerCSS}>
        <div css={iconWrapperCSS}>
          CODE REVIEW
        </div>
        Dj-blog : 풀스택 기반의 개인 블로그
      </div>
      <Playground url={"https://dj-portfolio-s3.s3.ap-northeast-2.amazonaws.com/client.zip"}/>
    </Wrapper>
  )
}

const wrapperCSS = css`
  display: flex;
  flex-direction: column;
`

const headerCSS = css`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  height: 48px;
  box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 20px;
  display: flex;
  align-items: center;

  font-size: 20px;
`

const iconWrapperCSS = css`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 6px 12px 6px 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  font-size: 16px;
  font-weight: 700;
  

`

export default index