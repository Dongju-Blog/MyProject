import { css, SerializedStyles } from "@emotion/react";
import React, { Children, ReactElement, ReactNode, useState, useRef } from "react";

type InputPropsType = {
  theme: ThemeProviderKeys;
  customCss?: SerializedStyles | SerializedStyles[];
  label: string;
  children?: ReactNode;
  isValid?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>;

type contentPropsType = {
  children: ReactNode;
};

function LabelInput({
  theme,
  customCss,
  label,
  children,
  isValid = true,
  ...props
}: InputPropsType) {
  const [isFocusing, setIsFocusing] = useState<boolean>(false);
  const [inputState, setInputState] = useState('')

  const spanWrapperRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

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
                ...themeProvider({ isFocusing, isValid})[theme],
                ...customCss,
              ]
            : [
                initInputWrapperCSS,
                ...themeProvider({ isFocusing, isValid})[theme],
                customCss,
              ]
        }
      >
        {leftContent}
        <div css={initInputInnerWrapperCSS}>
          <div css={spanWrapperCSS({isFocusing, inputState, spanWrapperRef, spanRef})} ref={spanWrapperRef}>
            <span css={initSpanCSS({isFocusing, inputState})} ref={spanRef}>
              
              {label}
              
            </span>
          </div>
          
          
          <input
            {...props}
            css={initInputCSS}
            onChange={(e) => {props.onChange && props.onChange(e); setInputState(() => e.target.value)}}
            onFocus={(e) => {props.onFocus && props.onFocus(e); setIsFocusing(() => true)}}
            onBlur={(e) => {props.onBlur && props.onBlur(e); setIsFocusing(() => false)}}
          />
        </div>
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
  min-height: 44px;
  height: 44px;
`;

const initInputInnerWrapperCSS = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* justify-content: flex-end; */
  margin: 0px 0px 0px 0px;
  position: relative;
  
  cursor: text;
`;

const initSpanCSS = ({isFocusing, inputState}: {isFocusing: boolean, inputState: string}) => {
  return css`
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  user-select: none;
  transition: transform 0.5s, font-size 0.5s, color 1s;
  transition-timing-function: ease;
  transform: translate(${isFocusing || inputState ? '-10% , -65%' : '0% , 0%'}) scale(${isFocusing || inputState ? '80%' : '100%'});
  overflow:hidden;
  white-space:nowrap;
  
`;
} 

const spanWrapperCSS = ({isFocusing, inputState, spanWrapperRef, spanRef}: {isFocusing: boolean, inputState: string, spanWrapperRef: any, spanRef: any}) => {
  return css`
  width: 100%;
  height: 100%;
  flex:1;
  overflow:hidden;
  position: absolute;
  display: flex;
  align-items: center;
  

  ${spanWrapperRef.current && spanRef.current && spanRef.current.clientWidth - 80 > spanWrapperRef.current.clientWidth &&
  `
    & span {
      animation: span-translate 5s linear infinite;
        @keyframes span-translate {
          10% {
            transform: translate(${isFocusing || inputState ? '-10% , -65%' : '0% , 0%'}) scale(${isFocusing || inputState ? '80%' : '100%'});
          }

          60% {
            transform: translate(${isFocusing || inputState ? `${-(spanRef.current.clientWidth - spanWrapperRef.current.clientWidth) + 40}px , -65%` : `0% , 0%`}) scale(${isFocusing || inputState ? '80%' : '100%'}) ;
          }

          100% {
            transform: translate(${isFocusing || inputState ? `${-(spanRef.current.clientWidth - spanWrapperRef.current.clientWidth) + 40}px , -65%` : `0% , 0%`}) scale(${isFocusing || inputState ? '80%' : '100%'}) ;
          }
      }
    }
  `
  }

`
}

const initInputCSS = css`
  transform: translateY( 35%);
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

  &::-ms-reveal,
  &::-ms-clear {
  display: none;
}
`;



type ThemeProviderKeys = "default" | "auth";
type themeProviderType = { [prop: string]: SerializedStyles[] };

const themeProvider = ({ isFocusing, isValid }: { isFocusing: boolean, isValid: boolean }) => {
  const themes: themeProviderType = {
    default: [
      css`
        
      `,
    ],
    auth: [
      css`
        /* background-color: white; */
        /* border: 1px solid black; */
        /* border-bottom: 2px solid rgba(0, 0, 0, 0.1) ; */
        height: 48px;
        transition: box-shadow 1s;
        box-shadow: ${isFocusing ? 'inset 0px -3px 0px -1px #0044ffb1' : 'inset 0px -2px 0px -1px rgba(0, 0, 0, 0.05)'};
        box-shadow: ${!isValid && 'inset 0px -3px 0px -1px #ff0000b0'};
        & span {
          color: ${isFocusing ? '#0044ff' : 'rgba(0, 0, 0, 0.4)'};
          color: ${!isValid && '#ff0000'};
        }
        & path {
          transition: stroke 1s;
          stroke: ${isFocusing ? '#0044ffb1' : 'rgba(0, 0, 0, 0.3)'};
          stroke: ${!isValid && '#ff0000b0'};
        }
      `,
    ],
  };

  return themes;
};

LabelInput.Left = LeftContent;
LabelInput.Right = RightContent;

export default LabelInput;
