import Button from '@/components/Interface/Button/Button';
import useAuthority from '@/hooks/useAuthority';
import { css } from "@emotion/react";
import { useRouter } from 'next/router';
import React from 'react'

type SourceCodeBoardHeaderPropsType = {
  label: string
  fontSize: number
  hideCreate?: boolean
}

function SourceCodeBoardHeader({label, fontSize, hideCreate}: SourceCodeBoardHeaderPropsType) {
  const auth = useAuthority()
  const router = useRouter()

  return (
    <div>
      <div css={categoryTitleWrapperCSS}>
        <span css={css`font-size: ${fontSize}px; font-weight: 700;`}>{label}</span>

        {!hideCreate && auth.currentUser.role === "ADMIN" && <Button theme={"grey"} css={buttonCSS} onClick={() => {router.push("/playground/create")}}>Create</Button>}
    
      </div>
      <div css={css`color: rgba(0, 0, 0, 0.6); margin-top: 4px;`}>˝The world belongs to those who read.˝</div>
      <div css={decoratorCSS}/>
      
    </div>
    
  )
}

const categoryTitleWrapperCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const buttonCSS = css`
  width: 100px;
`

const decoratorCSS = css`

    margin-top: 28px;
    margin-bottom: 24px;
    width: 36px;
    height: 6px;
    /* background-color: #FF6372; */
    background-color: black;

`

export default SourceCodeBoardHeader