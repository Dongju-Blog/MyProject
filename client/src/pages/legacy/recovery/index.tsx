import React, { useState, useReducer, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import Animator from "@/components/Interface/Animator/useAnimator";
import Input from "@/components/Interface/Input/Input";
import LabelInput from "@/components/Interface/Input/LabelInput";
import Button from "@/components/Interface/Button/Button";
import { loginBodyType, signupProcType } from "@/types/auth";
import { debounce, throttle } from "lodash";
import mediaQuery from "@/util/responsive";
import { postSignupAPI } from "@/api/auth/postSignupAPI";
import { useRouter } from "next/router";
import { signupBodyType } from "@/types/auth";
import useValidation from "@/components/Interface/Auth/useValidation";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import { ID_ICON, PASSWORD_ICON } from "@/components/Assets/AuthIcons";
import { postLoginAPI } from "@/api/auth/postLoginAPI";
import { setCookie } from "@/api/cookie";
import useAuthority from "@/hooks/useAuthority";

function index() {
  const router = useRouter();

  return (
    <div css={signupWrapperCSS}>
      <div css={formWrapperCSS} className={"form-wrapper"}>
        <div css={mobileWallpaperCSS}>
          <img src={"/assets/Wallpaper3.jpg"} />
        </div>

        <div css={contentWrapperCSS}>
          <div css={titleWrapperCSS}>
            <div
              css={css`
                font-size: 28px;
                font-weight: 500;
              `}
            >
              <span
                css={css`
                  font-weight: 300;
                `}
              >
                Account{" "}
              </span>
              recovery
            </div>
            <div
              css={css`
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
              `}
            >
              Having problems with your account?
            </div>
          </div>
          <div css={inputSectionCSS}>
            <Button
              theme={"outline"}
              customCss={findButtonCSS}
              onClick={() => {
                router.push("/recovery/username");
              }}
            >
              <div css={iconWrapperCSS}>
                {ID_ICON}
                <span>USERNAME</span>
              </div>
            </Button>
            <Button
              theme={"outline"}
              customCss={findButtonCSS}
              onClick={() => {
                router.push("/recovery/password");
              }}
            >
              <div css={iconWrapperCSS}>
                {PASSWORD_ICON}
                <span>PASSWORD</span>
              </div>
            </Button>
          </div>

          <div css={buttonWrapperCSS}>
            <Button
              theme={"default"}
              customCss={buttonCSS}
              onClick={() => {
                router.push("/login");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const signupWrapperCSS = css`
  @media ${mediaQuery.desktop} {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -22vw;
      left: 0;
      width: 100vw;
      height: 150vh;
      background-image: url(graphic-to-be-filtered.jpg);
      background-image: url("/assets/Wallpaper3.jpg");
      background-size: cover;
      opacity: 20%;
      /* filter: brightness(40%); */
    }
  }

  height: 100%;
  min-width: 100vw;
  min-height: 100%;
  /* height: 100%; */
  overflow: hidden;
`;

const formWrapperCSS = css`
  background-color: #fafbff;

  @media ${mediaQuery.mobile} {
    min-width: 100vw;
    min-height: 100%;
    height: 100%;
  }
  @media ${mediaQuery.desktop} {
    width: 25vw;
    min-width: 300px;
    border-radius: 20px;
    box-shadow: 0px 0px 150px 1px rgba(0, 0, 0, 0.4);
    position: relative;
  }

  /* height: 70vh; */

  /* border: 1px solid rgba(45, 48, 71, 0.253); */
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const contentWrapperCSS = css`
  @media ${mediaQuery.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    /* flex: 1; */
  }
  width: 100%;
`;

const titleWrapperCSS = css`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 4px;
  width: 100%;
  margin-top: 24px;
`;

const inputSectionCSS = css`
  @media ${mediaQuery.mobile} {
    height: 150px;
  }

  @media ${mediaQuery.desktop} {
    height: 120px;
  }

  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  /* border-bottom: none; */
  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.05);
  padding: 16px;
  gap: 16px;
`;

const iconWrapperCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;

  & path {
    stroke: #006effd9;
  }
`;

const buttonWrapperCSS = css`
  @media ${mediaQuery.mobile} {
    flex-direction: column;
    align-items: center;
    /* margin-top: 16px; */
  }

  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const buttonCSS = css`
  @media ${mediaQuery.mobile} {
    width: 95%;
    height: 48px;
  }
  @media ${mediaQuery.desktop} {
    width: 50%;
  }
`;

const findButtonCSS = css`
  width: 50%;
  height: 100%;
`;

const mobileWallpaperCSS = css`
  @media ${mediaQuery.mobile} {
    display: block;
  }

  display: none;
  width: 100vw;
  /* height: 50vh; */
  flex: 1;
  position: relative;
  overflow: hidden;

  & img {
    position: absolute; // 포지션을 주고,
    top: 0%; // 보이기 원하는 위치를 지정
    left: 0;
    width: 100%;
    height: auto;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #ffff000f, #ffff000f, #fafbff);
  }
`;

export default index;
