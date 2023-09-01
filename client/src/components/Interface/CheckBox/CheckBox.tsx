import { css, SerializedStyles } from "@emotion/react";
import React, { Children, ReactElement, ReactNode, useState } from "react";

type CheckBoxPropsType = {
  theme: ThemeProviderKeys;
  children?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

type contentPropsType = {
  children: ReactNode;
};

function CheckBox({ theme, children, ...props }: CheckBoxPropsType) {
  const childrenArray = Children.toArray(children) as Array<
    ReactElement<contentPropsType>
  >;
  const leftContent = childrenArray.filter((el) => el.type === LeftContent);
  const rightContent = childrenArray.filter((el) => el.type === RightContent);

  return (
    <div css={[initInputWrapperCSS, ...themeProvider()[theme]]}>
      <label htmlFor={props.id} css={initLabelCSS}>
        {leftContent}

        <input {...props} css={initInputCSS} type="checkbox" />
        {rightContent}
      </label>
    </div>
  );
}

function LeftContent({ children }: contentPropsType) {
  return Children.toArray(<React.Fragment>{children}</React.Fragment>);
}

function RightContent({ children }: contentPropsType) {
  return <React.Fragment>{children}</React.Fragment>;
}

const initInputWrapperCSS = css`
  display: flex;
  /* width: 100%; */
  /* flex: 1; */
  min-width: 0px;
`;

const initLabelCSS = css`
  /* width: 100%; */
  height: 100%;
  display: flex;
  align-items: center;
  /* gap: 8px; */
  min-width: 0px;
  flex: 1;
`;

const initInputCSS = css`
  width: 18px;
  height: 18px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid #999;
  appearance: none;
  transition: background 0.2s;

  :checked {
    background: black;
    border: none;
  }
`;

type ThemeProviderKeys = "default";
type themeProviderType = { [prop: string]: SerializedStyles[] };

const themeProvider = () => {
  const themes: themeProviderType = {
    default: [css``],
  };

  return themes;
};

CheckBox.Left = LeftContent;
CheckBox.Right = RightContent;

export default CheckBox;
