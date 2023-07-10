import React, { useState } from 'react'
import { css } from "@emotion/react";
import Animator from '@/components/Interface/Animator/Animator';
import Input from '@/components/Interface/Input/Input';
import LabelInput from '@/components/Interface/Input/LabelInput';
import Button from '@/components/Interface/Button/Button';

function signup() {

  const NAME_ICON = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 9H15.01M9 9H9.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.5 9C15.5 9.27614 15.2761 9.5 15 9.5C14.7239 9.5 14.5 9.27614 14.5 9C14.5 8.72386 14.7239 8.5 15 8.5C15.2761 8.5 15.5 8.72386 15.5 9ZM9.5 9C9.5 9.27614 9.27614 9.5 9 9.5C8.72386 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.72386 8.5 9 8.5C9.27614 8.5 9.5 8.72386 9.5 9ZM12 17.5C14.5005 17.5 16.5 15.667 16.5 14H7.5C7.5 15.667 9.4995 17.5 12 17.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  const MAIL_ICON = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  const ID_ICON = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  const PASSWORD_ICON = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  const [nameFocus, setNameFocus] = useState(false)
  const [usernameFocus, setUsernameFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [checkedPasswordFocus, setCheckedPasswordFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  
  return (
    <div css={signupWrapperCSS}>
 


      <div css={formWrapperCSS}>
        <div css={titleWrapperCSS}>
          <div css={css`font-size: 28px; font-weight: 500;`}><span css={css`font-weight: 300;`}>Welcome to </span>dj.Blog</div>
          <div css={css`font-size: 12px; color: rgba(0, 0, 0, 0.4);`}>I appreciate that you are going to join my workspace.</div>
        </div>
        <div css={inputSectionCSS}>
          <LabelInput theme={'auth'} label={'Name'} isValid={false} onFocus={() => {setNameFocus(true)}} onBlur={() => {setNameFocus(false)}} >
            <LabelInput.Left>
              <div css={iconWrapperCSS}>{NAME_ICON}</div>
            </LabelInput.Left>
          </LabelInput>
          <LabelInput theme={'auth'} label={'Username'} onFocus={() => {setUsernameFocus(true)}} onBlur={() => {setUsernameFocus(false)}}>
            <LabelInput.Left>
              <div css={iconWrapperCSS}>{ID_ICON}</div>
            </LabelInput.Left>
          </LabelInput>
          <LabelInput theme={'auth'} label={'Password'} type={'password'} onFocus={() => {setPasswordFocus(true)}} onBlur={() => {setPasswordFocus(false)}}>
            <LabelInput.Left>
              <div css={iconWrapperCSS}>{PASSWORD_ICON}</div>
            </LabelInput.Left>
          </LabelInput>
          <LabelInput theme={'auth'} label={'Repeat Password'} type={'password'} onFocus={() => {setCheckedPasswordFocus(true)}} onBlur={() => {setCheckedPasswordFocus(false)}}>
            <LabelInput.Left>
              <div css={iconWrapperCSS}>{PASSWORD_ICON}</div>
            </LabelInput.Left>
          </LabelInput>
          <LabelInput theme={'auth'} label={'Email Address'} onFocus={() => {setEmailFocus(true)}} onBlur={() => {setEmailFocus(false)}}>
            <LabelInput.Left>
              <div css={iconWrapperCSS}>{MAIL_ICON}</div>
            </LabelInput.Left>
          </LabelInput>
        </div>

        <div css={buttonWrapperCSS}>
          <Button theme={'outline'} customCss={buttonCSS}>Cancel</Button>
          <Button theme={'default'} customCss={buttonCSS}>Sign Up</Button>
        </div>
        
      </div>
    </div>
  )
}

const signupWrapperCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 100vw;
    min-height: 100vh;

    overflow: hidden;



  	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-image: url(graphic-to-be-filtered.jpg);
		background-image: url("/assets/Wallpaper1.jpg");
		background-size: cover;
    opacity: 20%;
		/* filter: brightness(40%); */
	}


`



const formWrapperCSS = css`
  position: relative;
  background-color: #fafbff;
  width: 25vw;
  /* height: 70vh; */
  border-radius: 20px;
  box-shadow: 0px 0px 150px 1px rgba(0, 0, 0, 0.4);
  /* border: 1px solid rgba(45, 48, 71, 0.253); */
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const titleWrapperCSS = css`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 4px;
  width: 100%;
`

const inputSectionCSS = css`
  width: 100%;
  margin-top: 18px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: none;
  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.05);
`

const iconWrapperCSS = css`
    height: 100%;
    width: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
  `


const buttonWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
`

const buttonCSS = css`
  width: 40%;
`

export default signup