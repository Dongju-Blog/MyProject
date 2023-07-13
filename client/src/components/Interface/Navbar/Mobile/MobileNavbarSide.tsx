import React from 'react'
import { css } from "@emotion/react";
import { categoryType } from '../Navbar';
import Button from '../../Button/Button';
import { useRouter } from 'next/router';
import useAuthority from '@/hooks/useAuthority';
import { AUTH_ICON } from '@/components/Assets/AuthIcons';

type MobileNavbarSidePropsType = {
  categoryList: categoryType[]
  closeModalHandler?: Function
}

function MobileNavbarSide({categoryList, closeModalHandler}: MobileNavbarSidePropsType) {
  const router = useRouter();
  const auth = useAuthority();

  const renderCategory = categoryList.map((category, idx) => {
    const renderCategoryMenu = category.menu.map((menu, idx) => {
      return (
        <div css={categoryMenuItemCSS} onClick={() => {menu.function(); closeModalHandler && closeModalHandler();}}>
          {menu.label}
        </div>
      )
    })
    return (
      <div css={categoryItemWrapperCSS}>
        <span css={categoryLabelCSS}>{category.label}</span>
        <div css={categoryMenuWrapperCSS}>
          {renderCategoryMenu}
        </div>
      </div>
    )
  })

  const forUser = (
    <div css={userHeaderWrapperCSS}>
      <div css={css`
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      `}>
        <div css={userInfoWrapperCSS}>

        
        <div css={authIconWrapperCSS}>
          {AUTH_ICON}
        </div>
        <div
          css={css`
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          `}
        >
          <span
            onClick={() => {
              router.push("/user/change");
              closeModalHandler && closeModalHandler();
            }}
          >
            {auth.currentUser.username}
          </span>
        </div>
        </div>
      <Button
        theme={"dark"}
        onClick={() => {
          auth.logoutHandler();
          closeModalHandler && closeModalHandler();
        }}
      >
        Logout
      </Button>
      </div>
      
    </div>
  );

  const forGuest = (
    <div css={guestHeaderWrapperCSS}>
      <span css={css`color: white;`}>You are not logged in yet.</span>
      <div css={headerWrapperCSS}>
      <Button
        customCss={css`width: 50%;`}
        theme={"dark"}
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </Button>
      <Button
        customCss={css`width: 50%;`}
        theme={"dark"}
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign Up
      </Button>
      </div>
    </div>
  );

  return (
    <div css={sideMenuWrapperCSS}>
      
        {auth.currentUser.username ? forUser : forGuest}
   
      

      <div css={categoryWrapperCSS}>
        {renderCategory}
      </div>
      
    </div>
  )
}

const sideMenuWrapperCSS = css`
  width: 70%;
  height: 100%;
  position: absolute;
  right: 0;
  background-color: black;
  box-shadow: 0px 0px 40px 40px rgba(0, 0, 0, 1);

  /* display: flex;
  flex-direction: column;
  align-items: center; */

  padding: 36px 36px 36px 24px;
  /* opacity: 90%; */



`

const headerWrapperCSS = css`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  
`

const categoryWrapperCSS = css`
      animation: side 1s ease forwards;
      animation-delay: 100ms;
      -webkit-animation-delay: 100ms;
      transform: translateX(150%);
      @keyframes side {
        from {
          transform: translateX(150%);
        }

        to {
          transform: translateX(0%);
        }
      }
`

const categoryItemWrapperCSS = css`margin-bottom: 24px;`

const categoryLabelCSS = css`color: white; font-size: 36px; font-weight: 700;`

const categoryMenuWrapperCSS = css`
  padding-left: 18px;
`


const categoryMenuItemCSS = css`font-size: 24px; color: white; margin: 8px 0px 8px 0px;`

const guestHeaderWrapperCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 36px;
  margin-bottom: 36px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`

const userHeaderWrapperCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 36px;
  margin-bottom: 36px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`

const authIconWrapperCSS = css`
border-radius: 100%;
background-color: #202020;
width: 32px;
height: 32px;
display: flex;
justify-content: center;
align-items: center;

& path {
  stroke: rgba(255, 255, 255, 0.6);
}
`

const userInfoWrapperCSS = css`
  display: flex;
  align-items: center;
  gap: 16px;
`
export default MobileNavbarSide