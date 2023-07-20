import { css, SerializedStyles } from "@emotion/react";
import React, { Children, ReactElement, ReactNode, useState, useEffect, useRef } from "react";

type TextareaPropsType = {
  theme: ThemeProviderKeys;
  customCss?: SerializedStyles | SerializedStyles[];
  children?: ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type contentPropsType = {
  children: ReactNode;
};

function Textarea({ theme, customCss, children, ...props }: TextareaPropsType) {
  const [isFocusing, setIsFocusing] = useState<boolean>(false);
  const [inputState, setInputState] = useState("");



  const childrenArray = Children.toArray(children) as Array<
    ReactElement<contentPropsType>
  >;
  const topContent = childrenArray.filter((el) => el.type === TopContent);
  const bottomContent = childrenArray.filter((el) => el.type === BottomContent);

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
        {topContent}

        <textarea
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

      {bottomContent}
    </div>
  );
}

function TopContent({ children }: contentPropsType) {
  return <React.Fragment>{children}</React.Fragment>;
}

function BottomContent({ children }: contentPropsType) {
  return <React.Fragment>{children}</React.Fragment>;
}

const initInputWrapperCSS = css`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  /* flex: 1; */
  min-width: 0px;
  overflow: hidden;
`;

const initLabelCSS = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 8px; */
  min-width: 0px;
  flex: 1;
  padding: 8px;
`;

const initInputCSS = css`
  /* margin: 0px 8px 0px 8px; */
  flex: 1;
  resize: none;

  height: 100%;
  width: 100%;
  border: none;
  min-width: 0px;
  background-color: rgba(255, 255, 255, 0);
  padding: 6px;
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

type ThemeProviderKeys = "default" | "restraint" | "none";
type themeProviderType = { [prop: string]: SerializedStyles[] };

const themeProvider = ({ isFocusing }: { isFocusing: boolean }) => {
  const themes: themeProviderType = {
    default: [
      css`
        /* border: 1px solid rgba(0, 0, 0, 0.1); */
        border-radius: 20px;
        transition: box-shadow 1s;
        box-shadow: ${isFocusing
          ? "0px 0px 1px 4px #789cff85"
          : "0px 0px 0px 1px rgba(0, 0, 0, 0.1)"};
      `,
    ],
    restraint: [
      css`
        border-radius: 2px;
        transition: box-shadow 1s;
        box-shadow: ${isFocusing
          ? "inset 0px 0px 0px 2px rgba(0, 0, 0, 0.3)"
          : "inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1)"};
      `,
    ],
    none: [css``],
  };

  return themes;
};

Textarea.Top = TopContent;
Textarea.Bottom = BottomContent;

export default Textarea;
