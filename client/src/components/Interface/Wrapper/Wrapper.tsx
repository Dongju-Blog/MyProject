import React, { ReactNode } from "react";
import { css, SerializedStyles } from "@emotion/react";
import mediaQuery from "@/util/responsive";

type WrapperPropsType = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
function Wrapper({ children, ...props }: WrapperPropsType) {
  return (
    <div className={"wrapper-component"} css={wrapperCSS} {...props}>
      {children}
    </div>
  );
}

const wrapperCSS = css`
  width: 100%;
  height: 100%;

  @media ${mediaQuery.overTablet} {
    padding-top: var(--desktop-navbar-height);
  }

  @media ${mediaQuery.tablet} {
    padding-top: var(--mobile-navbar-height);
  }
`;

export default Wrapper;
