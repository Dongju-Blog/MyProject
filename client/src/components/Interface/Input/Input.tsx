import { css, SerializedStyles } from "@emotion/react";
import React, { Children, ReactElement, ReactNode, useState } from "react";

type InputPropsType = {
  theme: ThemeProviderKeys;
  customCss?: SerializedStyles | SerializedStyles[];
  label: string;
  children?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

type contentPropsType = {
  children: ReactNode;
};

function Input({
  theme,
  customCss,
  label,
  children,
  ...props
}: InputPropsType) {
  const [isFocusing, setIsFocusing] = useState<boolean>(false);
  const [inputState, setInputState] = useState("");

  const childrenArray = Children.toArray(children) as Array<
    ReactElement<contentPropsType>
  >;
  const leftContent = childrenArray.filter((el) => el.type === LeftContent);
  const rightContent = childrenArray.filter((el) => el.type === RightContent);

  return (
    <label htmlFor={props.id}>
      <div
        css={
          Array.isArray(customCss)
            ? [
                initInputWrapperCSS,
                ...themeProvider({ isFocusing })[theme],
                ...customCss,
              ]
            : [
                initInputWrapperCSS,
                ...themeProvider({ isFocusing })[theme],
                customCss,
              ]
        }
      >
        {leftContent}

        <input
          css={initInputCSS}
          onChange={(e) => {
            props.onChange && props.onChange(e);
            setInputState(() => e.target.value);
          }}
          onFocus={(e) => {
            props.onFocus && props.onFocus(e);
            setIsFocusing(() => true);
          }}
          onBlur={(e) => {
            props.onBlur && props.onBlur(e);
            setIsFocusing(() => false);
          }}
        />

        {rightContent}
      </div>
    </label>
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
`;

const initInputCSS = css`
  margin: 4px 8px 4px 8px;
  flex: 1;
  width: 100%;
  height: 20px;
  /* width: 100%; */
  border: none;
  min-width: 0px;
  background-color: rgba(255, 255, 255, 0);
  /* padding: 0px 12px 0px 12px; */
  /* height: 100%; */
  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

type ThemeProviderKeys = "default" | "auth";
type themeProviderType = { [prop: string]: SerializedStyles[] };

const themeProvider = ({ isFocusing }: { isFocusing: boolean }) => {
  const themes: themeProviderType = {
    default: [css``],
    auth: [
      css`
        background-color: white;
        border: 1px solid black;
        & span {
          color: ${isFocusing ? "#0044ff" : "rgba(0, 0, 0, 0.6)"};
        }
      `,
    ],
  };

  return themes;
};

Input.Left = LeftContent;
Input.Right = RightContent;

export default Input;
