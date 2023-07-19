import React, { ReactNode } from "react";
import { css } from "@emotion/react";
import { categoryType } from "../Navbar";
import Button from "../../Button/Button";
import { useRouter } from "next/router";
import useAuthority from "@/hooks/useAuthority";
import useModal from "../../Modal/useModal";
import MobileNavbarSide from "./MobileNavbarSide";
import { mobileNavBarExclude } from "@/constants/config";

type DesktopNavbarPropsType = {
  categoryList: categoryType[];
  isTop: boolean
};

function MobileNavbar({ categoryList, isTop }: DesktopNavbarPropsType) {
  const router = useRouter();
  const auth = useAuthority();
  const [Modal, openModalHandler, modalState] = useModal("rightToLeft", 1000);


  if (!mobileNavBarExclude.includes(router.pathname)) {
  return (
    <React.Fragment>
      <Modal>
        <MobileNavbarSide categoryList={categoryList} />
      </Modal>
      <div css={navbarWrapperCSS({isTop})}>
        <div>
          <span css={css`font-size: 24px; font-style: italic;`}>dj.Blog</span>
        </div>
        <div>
          <div css={menuButtonWrapperCSS} onClick={openModalHandler}>
            <div css={menuDecoCSS} />
            <div css={menuDecoCSS}/>
            <div css={menuDecoCSS}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  }
}

const navbarWrapperCSS = ({isTop}: {isTop: boolean}) => { 
  return css`
  position: fixed;
  width: 100vw;
  height: var(--mobile-navbar-height);
  /* background-color: rgba(255, 255, 255, 0.3); */
  transition: background-color 1s;
  background-color: ${!isTop && `rgba(255, 255, 255, 0.8)`};
  z-index: 20;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
}

const categoryWrapperCSS = css`
  display: flex;
  gap: 16px;
`;

const rightSectionCSS = css`
  display: flex;
  gap: 16px;
`;

const usernameWrapperCSS = css`
  cursor: pointer;
  user-select: none;
  transition: color 1s;
  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

const menuButtonWrapperCSS = css`
  width: 32px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const menuDecoCSS = css`
  width: 100%;
  height: 3px;
  background-color: rgba(0, 0, 0, 0.4);
`

export default MobileNavbar;
