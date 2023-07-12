import React, { useState, useReducer, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import Animator from "@/components/Interface/Animator/useAnimator";
import Input from "@/components/Interface/Input/Input";
import LabelInput from "@/components/Interface/Input/LabelInput";
import Button from "@/components/Interface/Button/Button";
import { loginBodyType, signupProcType } from "@/types/auth";
import { debounce, throttle } from "lodash";
import mediaQuery from "@/util/responsive";
import { postSignupAPI } from "@/api/auth/postSignupAPI";
import { useRouter } from "next/router";
import { signupBodyType } from "@/types/auth";
import useValidation from "@/components/Interface/Auth/useValidation";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import { ID_ICON, PASSWORD_ICON } from "@/components/Assets/AuthIcons";
import { postLoginAPI } from "@/api/auth/postLoginAPI";
import { setCookie } from "@/api/cookie";
import useAuthority from "@/hooks/useAuthority";
import AuthTemplate from "@/components/Interface/Auth/AuthTemplate";

function AuthLogin() {
  const router = useRouter();
  const auth = useAuthority();

  const [inputState, setInputState] = useState<loginBodyType>({
    username: "",
    password: "",
  });

  const submitHandler = () => {
    auth.loginHandler(inputState);
    // postLoginAPI({body: inputState})
    // .then((res) => {
    //   setCookie("Authorization", res.accessToken, { path: "/", maxAge: 2 * 60 * 60 })
    //   setCookie("RefreshToken", res.accessToken, { path: "/", maxAge: 14 * 24 * 60 * 60 })
    //   router.push('/')
    // })
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <React.Fragment>
      <AuthTemplate.TitleWrapper
        title={
          <React.Fragment>
            <span
              css={css`
                font-weight: 300;
              `}
            >
              Welcome back to{" "}
            </span>
            dj.Blog
          </React.Fragment>
        }
        subTitle={"I'm happy to see you again."}
      />

      <AuthTemplate.InputWrapper
        customCss={css`
          border-bottom: none;
          margin-bottom: 12px;
        `}
      >
        <LabelInput
          theme={"auth"}
          label={"Username"}
          onChange={(e) =>
            setInputState((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{ID_ICON}</div>
          </LabelInput.Left>
        </LabelInput>

        <LabelInput
          theme={"auth"}
          label={"Password"}
          type={"password"}
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            setInputState((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{PASSWORD_ICON}</div>
          </LabelInput.Left>
        </LabelInput>
      </AuthTemplate.InputWrapper>
      <div css={accountConfigWrapperCSS}>
        <div></div>
        <span
          css={recoverySpanCSS}
          onClick={() => {
            router.push({
              pathname: "/login",
              query: { func: 'recovery' },
          });
          }}
        >
          Forgot Account?
        </span>
      </div>
      <AuthTemplate.ButtonWrapper customCss={css`margin-top: 12px;`}>
        <Button theme={"default"} customCss={buttonCSS} onClick={submitHandler}>
          Login
        </Button>
        <Button
          theme={"outline"}
          customCss={buttonCSS}
          onClick={() => {
            router.push("/");
          }}
        >
          Cancel
        </Button>
      </AuthTemplate.ButtonWrapper>
    </React.Fragment>
  );
}









const iconWrapperCSS = css`
  height: 100%;
  width: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
`;



const buttonCSS = css`
  @media ${mediaQuery.mobile} {
    width: 100%;
    height: 48px;
  }
  @media ${mediaQuery.desktop} {
    width: 50%;
  }
`;



const accountConfigWrapperCSS = css`
  display: flex;
  justify-content: space-between;
`;

const recoverySpanCSS = css`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  user-select: none;
  transition: color 1s;
  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

export default AuthLogin;
