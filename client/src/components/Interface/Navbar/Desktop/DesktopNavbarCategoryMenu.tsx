import React from "react";
import { css } from "@emotion/react";
import { categoryMenuType } from "../Navbar";
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';

type DesktopNavbarCategoryMenuPropsType = {
  categoryMenu: categoryMenuType;
};

function DesktopNavbarCategoryMenu({
  categoryMenu,
}: DesktopNavbarCategoryMenuPropsType) {

  const renderMenu = categoryMenu.map((menu) => {
    return <div key={`desktop-category-menu-${menu.label}`} css={menuItemCSS} onClick={() => {menu.function()}}>{menu.label}</div>
  })
  return <div css={categoryMenuWrapperCSS}>
    {categoryMenu.length !== 0 ? renderMenu : <div><UseAnimations animation={loading} size={56} /></div>}
  </div>;
}

const categoryMenuWrapperCSS = css`
  /* position: relative; */
  /* margin: 50px; */
  /* width: 400px; */
  width: 200px;
  padding: 24px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 100px 1px rgba(0, 0, 0, 0.3);
  position: absolute;
  cursor: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* &:after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    content: "";
    position: absolute;
    top: -10px;
    left: 50%;
  } */
`;

const menuItemCSS = css`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  transition-property: transform color;
  transition-duration: 1s;
  user-select: none;
  &:hover {
    transform: scale(110%);
    color: rgba(0, 0, 0, 1);
  }
`

export default DesktopNavbarCategoryMenu;
