import { css, SerializedStyles } from "@emotion/react";
import React from "react";

type ButtonPropsType = {
  theme: ThemeProviderKeys;
  customCss?: SerializedStyles | SerializedStyles[];
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ theme, customCss, ...props }: ButtonPropsType) {
  return (
    <button
      {...props}
      css={
        Array.isArray(customCss)
          ? [initButtonCSS, ...themeProvider()[theme], ...customCss]
          : [initButtonCSS, ...themeProvider()[theme], customCss]
      }
    >
      {props.children}
    </button>
  );
}

const initButtonCSS = css`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

type ThemeProviderKeys = "default" | "outline" | "text" | "dark";

type themeProviderType = { [prop: string]: SerializedStyles[] };
const themeProvider = () => {
  const themes: themeProviderType = {
    default: [
      css`
        background-color: #006effd9;
        border-radius: 20px;
        padding: 10px 15px 10px 15px;
        color: white;
        transition-property: box-shadow transform;
        transition-duration: 1s;
        transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
        /* mix-blend-mode: difference; */
        /* outline: 0px solid rgba(255, 255, 255, 0.01); */
        &:hover {
          /* outline: 4px solid #c382ffa6; */
          box-shadow: 0px 0px 1px 5px #789cff85;
          transform: scale(110%);
        }
      `,
    ],
    outline: [
      css`
        background-color: #f4f9ffd9;
        border: 1px solid #006effd9;
        border-radius: 20px;
        padding: 10px 15px 10px 15px;
        /* color: white; */
        color: #006effd9;
        transition-property: box-shadow transform;
        transition-duration: 1s;

        &:hover {
          box-shadow: 0px 0px 1px 4px #789cff85;
          transform: scale(110%);
        }
      `,
    ],

    dark: [
      css`
        background-color: #151515;
        border-radius: 20px;
        padding: 10px 15px 10px 15px;
        color: white;
        transition-property: box-shadow transform;
        transition-duration: 1s;
        transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
        /* mix-blend-mode: difference; */
        /* outline: 0px solid rgba(255, 255, 255, 0.01); */
        &:hover {
          /* outline: 4px solid #c382ffa6; */
          /* box-shadow: 0px 0px 1px 5px #789cff85; */
          transform: scale(110%);
        }
      `,
    ],
    text: [
      css`
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.6);
        transition-property: transform color;
        transition-duration: 1s;

        &:hover {
          transform: scale(110%);
          color: rgba(0, 0, 0, 1);
        }
      `,
    ],
  };

  return themes;
};

export default Button;
