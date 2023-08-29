import React from 'react'
import { css } from "@emotion/react";

function SourceCodeIDEEmpty() {
  return (
    <div css={wrapperCSS}>
      <div css={titleCSS}>dj-blog's Playground</div>
      <div css={contentWrapperCSS}>
        <div css={textCSS}>1. 파일 사전 인덱싱으로 더욱 빠른 속도로 탐색 가능</div>
        <div css={textCSS}>2. 파일 트리 방식의 편리한 파일 탐색 제공</div>
        <div css={textCSS}>3. 파일 / 폴더가 유효한 경로 자동 탐색 기능 제공</div>
        <div css={textCSS}>4. 파일 탐색기 및 코드 내 탭 인덱스 표시 표시</div>
        <div css={textCSS}>5. 파일 탐색기에서 경로/주소 복사 등의 컨텍스트 메뉴 제공</div>
        <div css={textCSS}>6. 코드 내 파일 이름 클릭 시, 해당 파일로 이동</div>
        <div css={textCSS}>7. 코드 라인 인디케이터 / 코드 강제 줄 바꿈 옵션 제공</div>
        
      </div>
      
    </div>
  )
}

const wrapperCSS = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 36px;
`

const titleCSS = css`
  font-size: 48px;
  color: rgba(0, 0, 0, 0.3);
`

const contentWrapperCSS = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const textCSS = css`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`
export default SourceCodeIDEEmpty