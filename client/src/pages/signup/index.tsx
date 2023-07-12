import React, { useState, useReducer, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import Animator from "@/components/Interface/Animator/useAnimator";
import Input from "@/components/Interface/Input/Input";
import LabelInput from "@/components/Interface/Input/LabelInput";
import Button from "@/components/Interface/Button/Button";
import { signupProcType } from "@/types/auth";
import { debounce, throttle } from "lodash";
import mediaQuery from "@/util/responsive";
import { postSignupAPI } from "@/api/auth/postSignupAPI";
import { useRouter } from "next/router";
import { signupBodyType } from "@/types/auth";
import useValidation from "@/components/Interface/Auth/useValidation";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import {
  ID_ICON,
  MAIL_ICON,
  NAME_ICON,
  PASSWORD_ICON,
} from "@/components/Assets/AuthIcons";
import AuthTemplate from "@/components/Interface/Auth/AuthTemplate";

const inputReducer = (
  state: signupBodyType,
  action: { type: string; value: string }
) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return { ...state, name: action.value };
    case "CHANGE_USERNAME":
      return { ...state, username: action.value };
    case "CHANGE_PASSWORD":
      return { ...state, password: action.value };
    case "CHANGE_CHECKED_PASSWORD":
      return { ...state, checkedPassword: action.value };
    case "CHANGE_EMAIL":
      return { ...state, email: action.value };
    default:
      return state;
  }
};

function index() {
  const router = useRouter();
  const noti = useNotification();

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    name: "",
    username: "",
    password: "",
    checkedPassword: "",
    email: "",
  });

  const { isValid, validMessage, validInjector } = useValidation(inputState);

  const submitHandler = () => {
    const inputStateKeys = Object.keys(inputState) as Array<
      keyof signupBodyType
    >;
    const filteredInputState: signupProcType = {};
    inputStateKeys.forEach((key) => {
      if (inputState[key] !== "") {
        filteredInputState[key] = inputState[key];
      }
    });

    postSignupAPI({ body: filteredInputState })
      .then((res) => {
        noti({
          content: (
            <NotiTemplate type={"ok"} content={"가입이 완료되었습니다!"} />
          ),
        });
        router.push("/");
      })
      .catch((err) => {
        validInjector(err.response.data);
      });
  };

  return (
    <AuthTemplate imageSrc={"/assets/Wallpaper3.jpg"} mobileImageTop={"-15%"}>
      <AuthTemplate.TitleWrapper
        title={
          <React.Fragment>
            <span
              css={css`
                font-weight: 300;
              `}
            >
              Welcome to{" "}
            </span>
            dj.Blog
          </React.Fragment>
        }
        subTitle={"I appreciate that you are going to join my workspace."}
      />

      <AuthTemplate.InputWrapper
        customCss={css`
          border-bottom: none;
        `}
      >
        <LabelInput
          theme={"auth"}
          label={validMessage.name ? validMessage.name : "Name"}
          isValid={isValid.name}
          onChange={(e) => {
            dispatchInput({ type: "CHANGE_NAME", value: e.target.value });
          }}
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{NAME_ICON}</div>
          </LabelInput.Left>
        </LabelInput>
        <LabelInput
          theme={"auth"}
          label={validMessage.username ? validMessage.username : "Username"}
          isValid={isValid.username}
          onChange={(e) => {
            dispatchInput({
              type: "CHANGE_USERNAME",
              value: e.target.value,
            });
          }}
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{ID_ICON}</div>
          </LabelInput.Left>
        </LabelInput>
        <LabelInput
          theme={"auth"}
          label={validMessage.password ? validMessage.password : "Password"}
          type={"password"}
          isValid={isValid.password}
          onChange={(e) => {
            dispatchInput({
              type: "CHANGE_PASSWORD",
              value: e.target.value,
            });
          }}
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{PASSWORD_ICON}</div>
          </LabelInput.Left>
        </LabelInput>
        <LabelInput
          theme={"auth"}
          label={
            validMessage.checkedPassword
              ? validMessage.checkedPassword
              : "Repeat Password"
          }
          type={"password"}
          isValid={isValid.checkedPassword}
          onChange={(e) => {
            dispatchInput({
              type: "CHANGE_CHECKED_PASSWORD",
              value: e.target.value,
            });
          }}
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{PASSWORD_ICON}</div>
          </LabelInput.Left>
        </LabelInput>
        <LabelInput
          theme={"auth"}
          label={validMessage.email ? validMessage.email : "Email Address"}
          isValid={isValid.email}
          onChange={(e) => {
            dispatchInput({ type: "CHANGE_EMAIL", value: e.target.value });
          }}
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{MAIL_ICON}</div>
          </LabelInput.Left>
        </LabelInput>
      </AuthTemplate.InputWrapper>

      <AuthTemplate.ButtonWrapper>
        <Button theme={"default"} customCss={buttonCSS} onClick={submitHandler}>
          Sign Up
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
    </AuthTemplate>
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

export default index;
