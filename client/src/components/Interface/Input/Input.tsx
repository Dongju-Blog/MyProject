import { css, SerializedStyles } from "@emotion/react";
import React, { Children, ReactElement, ReactNode, useState } from "react";

type InputPropsType = {
  theme: ThemeProviderKeys;
  customCss?: SerializedStyles | SerializedStyles[];
  children?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

type contentPropsType = {
  children: ReactNode;
};

function Input({
  theme,
  customCss,
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
        <label htmlFor={props.id} css={initLabelCSS}>
        {leftContent}

        <input
          {...props}
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
        </label>
  
        {rightContent}
        
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
`

const initInputCSS = css`
  /* margin: 0px 8px 0px 8px; */
  flex: 1;
  
  height: 100%;
  /* width: 100%; */
  border: none;
  min-width: 0px;
  background-color: rgba(255, 255, 255, 0);
  padding: 0px 12px 0px 12px;
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

type ThemeProviderKeys = "default" | "navBar" | "restraint" | "dark" | "none";
type themeProviderType = { [prop: string]: SerializedStyles[] };

const themeProvider = ({ isFocusing }: { isFocusing: boolean }) => {
  const themes: themeProviderType = {
    default: [css`
    /* border: 1px solid rgba(0, 0, 0, 0.1); */
    border-radius: 20px;
    transition: box-shadow 1s;
    box-shadow: ${isFocusing
      ? "0px 0px 1px 4px #789cff85"
      : "0px 0px 0px 1px rgba(0, 0, 0, 0.1)"};

    `],
    navBar: [css`
    /* border: 1px solid rgba(0, 0, 0, 0.1); */
    background-color: ${isFocusing ? `rgba(0, 0, 0, 0.07)` : `rgba(0, 0, 0, 0.03)`};
    border-radius: 20px;
    mix-blend-mode: exclusion;
    transition: box-shadow 1s, background-color 1s;
    box-shadow: ${isFocusing
      ? "0px 0px 1px 4px rgba(0, 0, 0, 0.2)"
      : "0px 0px 0px 1px rgba(0, 0, 0, 0.1)"};
    & input::placeholder {
      color: rgba(0, 0, 0, 0.5);
      font-style: italic;
    }

    `],
    restraint: [
      css`
        border-radius: 2px;
        transition: box-shadow 1s;
        box-shadow: ${isFocusing
          ? "inset 0px 0px 0px 2px rgba(0, 0, 0, 0.3)"
          : "inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1)"};
      `,
    ],
    dark: [css`
    /* border: 1px solid rgba(0, 0, 0, 0.1); */
    border-radius: 20px;
    background-color: #151515;
    transition: box-shadow 1s;

    & input {
      color: white;
    }
    

    `],
    none: [
      css`
        
      `
    ]
  };

  return themes;
};

Input.Left = LeftContent;
Input.Right = RightContent;

export default Input;
