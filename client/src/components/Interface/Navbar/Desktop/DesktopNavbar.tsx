import React, { ReactNode } from 'react'
import { css } from "@emotion/react";
import { categoryType } from '../Navbar';
import DesktopNavbarCategory from './DesktopNavbarCategory';

type DesktopNavbarPropsType = {
  categoryList: categoryType[]
}

function DesktopNavbar({categoryList}: DesktopNavbarPropsType) {

  const renderCategory = categoryList.map((category) => {
    return (
      <DesktopNavbarCategory category={category} />
    )
  })

  return (
    <div css={navbarWrapperCSS}>
      {renderCategory}
    </div>
  )
}

const navbarWrapperCSS = css`
  position: fixed;
  width: 100vw;
  height: 64px;
  /* background-color: rgba(0, 0, 0, 0.1); */
  z-index: 20;
  padding: 24px;
  display: flex;
  align-items: center;
  
`


export default DesktopNavbar