import React, { useState, ReactNode, useEffect } from 'react'
import { css } from "@emotion/react";
import { categoryType } from '../Navbar';
import DesktopNavbarCategory from './DesktopNavbarCategory';
import Button from '../../Button/Button';
import { useRouter } from 'next/router';
import useAuthority from '@/hooks/useAuthority';
import { desktopNavBarExclude } from '@/constants/config';



type DesktopNavbarPropsType = {
  categoryList: categoryType[]
  isTop: boolean
}

function DesktopNavbar({categoryList, isTop}: DesktopNavbarPropsType) {
  const router = useRouter()
  const auth = useAuthority()
  
  

  const handleScroll = () => {
    console.log('scrolled');
  };


  const renderCategory = categoryList.map((category) => {
    return (
      <DesktopNavbarCategory category={category} />
    )
  })

  const forUser = (
    <React.Fragment>
      {auth.currentUser.role === "ADMIN" && <Button theme={"default"} onClick={() => {router.push('/admin/category');}}>Settings</Button>}
      <div css={css`
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
      `}>Welcome, <span css={usernameWrapperCSS} onClick={() => {router.push('/user/change')}}>{auth.currentUser.username}</span></div>
      <Button theme={"text"} onClick={() => {auth.logoutHandler()}}>Logout</Button>
    </React.Fragment>
  )

  const forGuest = (
    <React.Fragment>
      <Button theme={"text"} onClick={() => {router.push('/login');}}>Login</Button>
      <Button theme={"default"} onClick={() => {router.push('/signup');}}>Sign Up</Button>
    </React.Fragment>
  )

  if (!desktopNavBarExclude.includes(router.pathname)) {
    return (
      <div css={navbarWrapperCSS({isTop})}>
        <div css={categoryWrapperCSS}>
          {renderCategory}
        </div>
        <div css={rightSectionCSS}>
          {auth.currentUser.username ? forUser : forGuest}
        </div>
      </div>
    )
  }
  
}

const navbarWrapperCSS = ({isTop}: {isTop: boolean}) => {
  return css`
  position: fixed;
  top: 0;
  width: 100%;
  height: var(--desktop-navbar-height);
  transition: background-color 1s;
  background-color: ${!isTop && `rgba(255, 255, 255, 0.8)`};
  z-index: 20;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`
}


const categoryWrapperCSS = css`
  display: flex;
  gap: 16px;
`

const rightSectionCSS = css`
  display: flex;
  gap: 16px;
  align-items: center;
`

const usernameWrapperCSS = css`
  cursor: pointer;
  user-select: none;
  transition: color 1s;
  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`


export default DesktopNavbar