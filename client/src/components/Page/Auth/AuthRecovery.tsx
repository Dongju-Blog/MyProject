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

function AuthRecovery() {
  const router = useRouter();

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
              Account{" "}
            </span>
            recovery
          </React.Fragment>
        }
        subTitle={"Having problems with your account?"}
      />
      <AuthTemplate.InputWrapper customCss={inputWrapperCustomCSS}>
        <Button
          theme={"outline"}
          customCss={findButtonCSS}
          onClick={() => {
            router.push({
              pathname: "/login",
              query: { func: 'recovery_proc', type: 'username' },
          });
          }}
        >
          <div css={iconWrapperCSS}>
            {ID_ICON}
            <span>USERNAME</span>
          </div>
        </Button>
        <Button
          theme={"outline"}
          customCss={findButtonCSS}
          onClick={() => {
            router.push({
              pathname: "/login",
              query: { func: 'recovery_proc', type: 'password' },
            });
          }}
        >
          <div css={iconWrapperCSS}>
            {PASSWORD_ICON}
            <span>PASSWORD</span>
          </div>
        </Button>
      </AuthTemplate.InputWrapper>
      <AuthTemplate.ButtonWrapper>
        <Button
          theme={"default"}
          customCss={buttonCSS}
          onClick={() => {
            router.push("/login");
          }}
        >
          Cancel
        </Button>
      </AuthTemplate.ButtonWrapper>
    </React.Fragment>
  );
}








const iconWrapperCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;

  & path {
    stroke: #006effd9;
  }
`;



const buttonCSS = css`
  @media ${mediaQuery.mobile} {
    width: 95%;
    height: 48px;
  }
  @media ${mediaQuery.desktop} {
    width: 50%;
  }
`;

const findButtonCSS = css`
  width: 50%;
  height: 100%;
`;

const inputWrapperCustomCSS = css`
  @media ${mediaQuery.mobile} {
    height: 150px;
  }

  @media ${mediaQuery.desktop} {
    height: 120px;
  }

  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  /* border-bottom: none; */
  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.05);
  padding: 16px;
  gap: 16px;
`


export default AuthRecovery;
