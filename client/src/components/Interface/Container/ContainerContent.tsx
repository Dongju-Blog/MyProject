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
    <div
      css={
        Array.isArray(customCss)
          ? [innerContentWrapperCSS, ...customCss]
          : [innerContentWrapperCSS, customCss]
      }
    >
      {children}
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
  

  @media ${mediaQuery.overTablet} {
    padding: 10vw 15vw 10vw 15vw;
  }

  @media ${mediaQuery.tablet} {
    padding: 10vh 16px 10vh 16px;
  }
  /* background-color: blue; */
`;

ContainerContent.Inner = InnerContent;
export default ContainerContent;
