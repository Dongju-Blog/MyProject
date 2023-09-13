import React, { ReactNode } from "react";
import { SerializedStyles, css } from "@emotion/react";
import mediaQuery from "@/util/responsive";

type ContainerContentPropsType = {
  customCss?: SerializedStyles | SerializedStyles[];
  children: ReactNode;
};

type InnerContentPropsType = {
  customCss?: SerializedStyles | SerializedStyles[];
  children: ReactNode;
};

function ContainerContent({ customCss, children }: ContainerContentPropsType) {
  return (
    <div
      css={
        Array.isArray(customCss)
          ? [containerContentWrapperCSS, ...customCss]
          : [containerContentWrapperCSS, customCss]
      }
    >
      
        {children}
      </div>
      
    
  );
}

function InnerContent({ customCss, children }: InnerContentPropsType) {
  return (

    <div css={innerContentWrapperCSS}>
    <div
      css={
        Array.isArray(customCss)
          ? [innerContentSecondWrapperCSS, ...customCss]
          : [innerContentSecondWrapperCSS, customCss]
      }
    >
      {children}
    </div>
    </div>
  );
}

const containerContentWrapperCSS = css`
  position: relative;
  min-width: 100%;
  min-height: 100%;
  /* height: 100%; */
  background-color: white;
  
`;

const innerContentWrapperCSS = css`
  position: absolute;
  z-index: 10;
  min-width: 100%;
  min-height: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  display: grid;
  place-items: center;

  /* @media ${mediaQuery.overTablet} {
    padding: 10vw 15vw 10vw 15vw;
  }

  @media ${mediaQuery.tablet} {
    padding: 10vh 48px 10vh 48px;
  } */
  /* background-color: blue; */
`;

const innerContentSecondWrapperCSS = css`

/* background-color: red; */
  @media ${mediaQuery.overTablet} {
    max-width: 1440px;
    width: 60%;
    height: 100%;
  }

  @media ${mediaQuery.tablet} {
    width: 100%;
    height: 100%;
    padding: 10vh 48px 10vh 48px;
  }
`

ContainerContent.Inner = InnerContent;
export default ContainerContent;
