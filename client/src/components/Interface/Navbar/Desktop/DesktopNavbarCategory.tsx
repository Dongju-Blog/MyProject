import React, { MutableRefObject, RefObject, useRef } from 'react'
import { css } from "@emotion/react";
import { categoryType } from '../Navbar'
import DesktopNavbarCategoryMenu from './DesktopNavbarCategoryMenu';
import Button from '../../Button/Button';

type DesktopNavbarCategoryPropsType = {
  category: categoryType
}

function DesktopNavbarCategory({category}: DesktopNavbarCategoryPropsType) {

  const onClickHandler = () => {
    // 메뉴가 하나일 때는 메뉴를 렌더링하지 않고 다이렉트 라우팅
    if (category.menu.length === 1) {
      category.menu[0].function()
    }
  }

  return (
    <div css={categoryItemCSS} onClick={onClickHandler}>
        {category.label}
        <div>
          <div className={'menu'} css={categoryItemMenuCSS}>
            
            {category.menu.length !== 1 && 
              <React.Fragment>
                <div css={arrowCSS}/>
                <DesktopNavbarCategoryMenu categoryMenu={category.menu} />
              </React.Fragment> 
            
            
            }
          </div>
          
        </div>
    </div>
  )
}

const categoryItemCSS = css`
  position: relative;

  font-size: 24px;
  font-weight: 700;
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
  left: calc(50% - 20px);
  top: 8px;

`


export default DesktopNavbarCategory