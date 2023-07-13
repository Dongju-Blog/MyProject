import { css, SerializedStyles } from "@emotion/react";
import React, {
  Children,
  ReactElement,
  ReactNode,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";

type InputPropsType = {
  theme: ThemeProviderKeys;
  customCss?: SerializedStyles | SerializedStyles[];
  label: string;
  children?: ReactNode;
  isValid?: boolean;
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
  const [inputState, setInputState] = useState("");
  const [widths, setWidths] = useState<{
    spanWidth: number;
    inputWrapperWidth: number;
  }>({ spanWidth: 0, inputWrapperWidth: 0 });

  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const childrenArray = Children.toArray(children) as Array<
    ReactElement<contentPropsType>
  >;
  const leftContent = childrenArray.filter((el) => el.type === LeftContent);
  const rightContent = childrenArray.filter((el) => el.type === RightContent);
  const id = useMemo(() => Math.random().toString(36).substring(2), [label]);

  useEffect(() => {
    if (spanRef.current && inputWrapperRef.current) {
      const spanWidth = spanRef.current.clientWidth;
      const inputWrapperWidth = inputWrapperRef.current.clientWidth;
      setWidths(() => {
        return { spanWidth, inputWrapperWidth };
      });
    }
  }, [id, label]);

  useEffect(() => {
    if (props.value && String(props.value).trim() !== "") {
      setInputState(() => String(props.value))
    }
    
  }, [props.value])

  return (
    <label
      htmlFor={props.id}
      onClick={() => {
        console.log(spanRef);
      }}
    >
      <div
        css={
          Array.isArray(customCss)
            ? [
                initInputWrapperCSS({disabled: props.disabled}),
                ...themeProvider({ isFocusing, isValid })[theme],
                ...customCss,
              ]
            : [
                initInputWrapperCSS({disabled: props.disabled}),
                ...themeProvider({ isFocusing, isValid })[theme],
                customCss,
              ]
        }
      >
        {leftContent}
        <div css={initInputInnerWrapperCSS} ref={inputWrapperRef}>
          <span
            css={initSpanCSS({ id, isFocusing, inputState, ...widths })}
            ref={spanRef}
            key={id}
          >
            {label}
          </span>

          <input
            {...props}
            css={initInputCSS}
            onChange={(e) => {
              props.onChange && props.onChange(e);
              !props.value && setInputState(() => e.target.value);
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

const initInputWrapperCSS = ({disabled}: {disabled: boolean | undefined}) => {
 return css`
    display: flex;
    min-height: 44px;
    height: 44px;
    ${disabled && 'opacity: 50%'};
  `;
}

const initInputInnerWrapperCSS = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* justify-content: flex-end; */
  margin: 0px 0px 0px 0px;
  position: relative;
  overflow: hidden;
  cursor: text;
`;

const initSpanCSS = ({
  id,
  isFocusing,
  inputState,
  inputWrapperWidth,
  spanWidth,
}: {
  id: string;
  isFocusing: boolean;
  inputState: string;
  inputWrapperWidth: number;
  spanWidth: number;
}) => {
  // const spanWidth = spanRef.current && spanRef.current.clientWidth
  // const inputWrapperWidth = inputWrapperRef.current && inputWrapperRef.current.clientWidth
  return css`
    /* font-size: ${isFocusing || inputState ? "10px" : "14px"}; */
    font-size: 14px;
    font-weight: 500;
    position: absolute;
    user-select: none;
    transition: transform 0.5s, font-size 0.5s, color 1s;
    transition-timing-function: ease;
    overflow: hidden;
    white-space: nowrap;
    transform: translate(
        ${isFocusing || inputState ? "-10% , -65%" : "0% , 0%"}
      )
      scale(${isFocusing || inputState ? "80%" : "100%"});

    /* will-change: font-size, transform; */

    ${isFocusing &&
    spanWidth * 0.8 > inputWrapperWidth &&
    `
    
      animation: span-translate-${id} ${spanWidth / 100 + 1}s linear infinite;
      animation-delay: 0.5s;
        @keyframes span-translate-${id} {
          20% {
            transform: translate(${
              isFocusing ? "-10% , -65%" : "0% , 0%"
            }) scale(${isFocusing || inputState ? "80%" : "100%"});
          }

          70% {
            transform: translate(${
              isFocusing
                ? `${inputWrapperWidth - spanWidth}px , -65%`
                : `0% , 0%`
            }) scale(${isFocusing || inputState ? "80%" : "100%"}) ;
          }

          100% {
            transform: translate(${
              isFocusing
                ? `${inputWrapperWidth - spanWidth}px , -65%`
                : `0% , 0%`
            }) scale(${isFocusing || inputState ? "80%" : "100%"}) ;
          }
      }
    
  `}
  `;
};

const initInputCSS = css`
  transform: translateY(35%);
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

const themeProvider = ({
  isFocusing,
  isValid,
}: {
  isFocusing: boolean;
  isValid: boolean;
}) => {
  const themes: themeProviderType = {
    default: [css``],
    auth: [
      css`
        /* background-color: white; */
        /* border: 1px solid black; */
        /* border-bottom: 2px solid rgba(0, 0, 0, 0.1) ; */
        height: 48px;
        transition: box-shadow 1s;
        box-shadow: ${isFocusing
          ? "inset 0px -4px 1px -1px #0044ffb1"
          : "inset 0px -2px 0px -1px rgba(0, 0, 0, 0.05)"};
        box-shadow: ${isFocusing
          ? !isValid && "inset 0px -4px 1px -1px #ff0000b0"
          : !isValid && "inset 0px -2px 0px -1px #ff0000b0"};
        & span {
          color: ${isFocusing ? "#0044ff" : "rgba(0, 0, 0, 0.4)"};
          color: ${!isValid && "#ff0000"};
        }
        & path {
          transition: stroke 1s;
          stroke: ${isFocusing ? "#0044ffb1" : "rgba(0, 0, 0, 0.3)"};
          stroke: ${!isValid && "#ff0000b0"};
        }
      `,
    ],
  };

  return themes;
};

LabelInput.Left = LeftContent;
LabelInput.Right = RightContent;

export default LabelInput;
