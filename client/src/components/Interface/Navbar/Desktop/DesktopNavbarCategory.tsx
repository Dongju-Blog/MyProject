import React, { MutableRefObject, RefObject, useRef } from 'react'
import { css } from "@emotion/react";
import { categoryType } from '../Navbar'
import DesktopNavbarCategoryMenu from './DesktopNavbarCategoryMenu';

type DesktopNavbarCategoryPropsType = {
  category: categoryType
}

function DesktopNavbarCategory({category}: DesktopNavbarCategoryPropsType) {

  return (
    <div css={categoryItemCSS}>
        {category.label}
        <div>
          <div className={'menu'} css={categoryItemMenuCSS}>
            <div css={arrowCSS}/>
            <DesktopNavbarCategoryMenu categoryMenu={category.menu} />
          </div>
          
        </div>
    </div>
  )
}

const categoryItemCSS = css`
  font-size: 24px;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  transition-property: transform color;
  transition-duration: 1s;

  &:hover {
    transform: scale(110%);
    color: rgba(0, 0, 0, 1);
  }

  & .menu {
    transition-property: transform opacity;
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
    transform: scale(130%);
    left: 0px;
    top: 0px;
  }
  &:hover .menu {
    pointer-events: auto;
    transform: translateY(24px) scale(100%);
    opacity: 100%;;
    
    /* background-color: red; */
  }
  
`

const categoryItemMenuCSS = css`
  opacity: 0%;
  pointer-events: none;
  position: absolute;
  padding-top: 8px;
  /* background-color: red; */
  width: 100%;
`

const arrowCSS = css`
  width: 20px;
  height: 20px;
  border-top: 0px solid transparent;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid white;

  position: relative;
  z-index: 10;
  left: calc(50% - 16px);
  top: 8px;

`


export default DesktopNavbarCategory