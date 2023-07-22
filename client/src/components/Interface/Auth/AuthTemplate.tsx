import React, { ReactNode } from "react";
import { SerializedStyles, css } from "@emotion/react";
import mediaQuery from "@/util/responsive";

type AuthTemplatePropsType = {
  children: ReactNode;
  imageSrc: string;
  mobileImageTop: string;
};

type AuthTitleWrapperPropsType = {
  title: ReactNode | string;
  subTitle: ReactNode | string;
};

type AuthWrapperPropsType = {
  customCss?: SerializedStyles | SerializedStyles[];
  children: ReactNode;
};

function AuthTemplate({ children, imageSrc, mobileImageTop }: AuthTemplatePropsType) {
  return (
    <div css={pageWrapperCSS}>
      <div css={formWrapperCSS}>
        <div css={mobileWallpaperCSS({mobileImageTop})}>
          <img src={imageSrc} />
        </div>
        <div css={contentWrapperCSS}>
          {children}
        </div>
      </div>
    </div>
  );
}

function AuthTitleWrapper({ title, subTitle }: AuthTitleWrapperPropsType) {
  return (
    <div css={titleWrapperCSS}>
      <div
        css={css`
          font-size: 28px;
          font-weight: 500;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
        `}
      >
        {subTitle}
      </div>
    </div>
  );
}

function AuthInputWrapper({ customCss, children }: AuthWrapperPropsType) {
  return (
    <div
      css={
        Array.isArray(customCss)
          ? [inputSectionCSS, ...customCss]
          : [inputSectionCSS, customCss]
      }
    >
      {children}
    </div>
  );
}

function AuthButtonWrapper({ customCss, children }: AuthWrapperPropsType) {
  return (
    <div
      css={
        Array.isArray(customCss)
          ? [buttonWrapperCSS, ...customCss]
          : [buttonWrapperCSS, customCss]
      }
    >
      {children}
    </div>
  );
}

const pageWrapperCSS = css`
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

  min-width: 100vw;
  /* height: var(--screen-height); */
  min-height: 100%;
  height: 100%;
  overflow: hidden;
`;

const formWrapperCSS = css`
  background-color: #fafbff;

  @media ${mediaQuery.mobile} {
    min-width: 100vw;
    min-height: 100%;
  }
  @media ${mediaQuery.desktop} {
    width: 25vw;
    min-width: 400px;
    max-width: 500px;
    border-radius: 20px;
    box-shadow: 0px 0px 150px 1px rgba(0, 0, 0, 0.4);
    position: relative;
  }

  transition-property: width height min-width min-height max-width max-height;
  transition-duration: 1s;

  /* height: 70vh; */

  /* border: 1px solid rgba(45, 48, 71, 0.253); */
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const mobileWallpaperCSS = ({mobileImageTop}: {mobileImageTop: string}) => {
  return css`
  @media ${mediaQuery.mobile} {
    display: block;
  }

  display: none;
  width: 100vw;
  /* height: 30vh; */
  flex: 1;
  position: relative;
  overflow: hidden;

  & img {
    transition-property: top;
    transition-duration: 1s;
    position: absolute; // 포지션을 주고,
    /* transform: translateY(${mobileImageTop}); */
    top: ${mobileImageTop}; // 보이기 원하는 위치를 지정
    left: 0;
    width: 100%;
    height: auto;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      #ffff000f,
      #ffff000f,
      #ffff000f,
      #fafbff
    );
  }
`;
}

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
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;

  border: 1px solid rgba(0, 0, 0, 0.05);
  /* border-bottom: none; */
  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.05);
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

AuthTemplate.TitleWrapper = AuthTitleWrapper;
AuthTemplate.InputWrapper = AuthInputWrapper;
AuthTemplate.ButtonWrapper = AuthButtonWrapper;

export default AuthTemplate;
