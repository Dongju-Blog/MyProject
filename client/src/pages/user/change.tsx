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
import { getVisibleUserInfoAPI } from "@/api/auth/getVisibleUserInfoAPI";
import RefreshingToken from "@/components/Layout/RefreshingToken";
import { postChangeUserInfoAPI } from "@/api/auth/postChangeUserInfoAPI";
import Loading from "@/components/Interface/Loading/Loading";

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

  useEffect(() => {
    getVisibleUserInfoAPI()
    .then((res) => {
      console.log(res)
      dispatchInput({ type: "CHANGE_NAME", value: res.name});
      dispatchInput({ type: "CHANGE_USERNAME", value: res.username});
      dispatchInput({ type: "CHANGE_EMAIL", value: res.email});
    })
    .catch((err) => {
      noti({
        content: (
          <NotiTemplate type={"alert"} content={"계정 정보 조회중 오류가 발생하였습니다."} />
        ),
      });
    })
  }, [])

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

    postChangeUserInfoAPI({ body: filteredInputState })
      .then((res) => {
        noti({
          content: (
            <NotiTemplate type={"ok"} content={"회원 정보를 수정하였습니다."} />
          ),
        });
        router.push("/");
      })
      .catch((err) => {
        console.log(err)
        validInjector(err.response.data);
      });
  };



  return (
    <AuthTemplate imageSrc={"/assets/Wallpaper3.jpg"} mobileImageTop={"-15%"}>
      {inputState.username === "" && <div css={loadingWrapperCSS}><Loading label={"개인 정보를 가져오는 중입니다."}/></div>}
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
            management
          </React.Fragment>
        }
        subTitle={"For security reasons, please change your account information regularly."}
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
          disabled={true}
          value={inputState.name}
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
          disabled={true}
          value={inputState.username}
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
          value={inputState.password}
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
          value={inputState.checkedPassword}
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
          value={inputState.email}
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
          Change
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

const loadingWrapperCSS = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 9999;
`

export default index;
