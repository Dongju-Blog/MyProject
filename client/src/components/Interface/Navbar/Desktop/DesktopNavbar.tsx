import React, { ReactNode } from 'react'
import { css } from "@emotion/react";
import { categoryType } from '../Navbar';
import DesktopNavbarCategory from './DesktopNavbarCategory';
import Button from '../../Button/Button';
import { useRouter } from 'next/router';

type DesktopNavbarPropsType = {
  categoryList: categoryType[]
}

function DesktopNavbar({categoryList}: DesktopNavbarPropsType) {
  const router = useRouter()

  const renderCategory = categoryList.map((category) => {
    return (
      <DesktopNavbarCategory category={category} />
    )
  })

  return (
    <div css={navbarWrapperCSS}>
      <div css={categoryWrapperCSS}>
        {renderCategory}
      </div>
      <div css={rightSectionCSS}>
      <Button theme={"text"}>Login</Button>
      <Button theme={"default"} onClick={() => {router.push('/signup');}}>Sign Up</Button>
      </div>
    </div>
  )
}

const navbarWrapperCSS = css`
  position: fixed;
  width: 100vw;
  height: 64px;
  /* background-color: rgba(255, 255, 255, 0.3); */
  z-index: 20;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`

const categoryWrapperCSS = css`
  display: flex;
  gap: 16px;
`

const rightSectionCSS = css`
  display: flex;
  gap: 16px;
`


export default DesktopNavbar