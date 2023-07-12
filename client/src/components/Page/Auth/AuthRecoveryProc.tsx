import React, { useState, useReducer, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import Animator from "@/components/Interface/Animator/useAnimator";
import Input from "@/components/Interface/Input/Input";
import LabelInput from "@/components/Interface/Input/LabelInput";
import Button from "@/components/Interface/Button/Button";
import {
  accountRecoveryBodyType,
  loginBodyType,
  signupProcType,
} from "@/types/auth";
import { debounce, throttle } from "lodash";
import mediaQuery from "@/util/responsive";
import { postSignupAPI } from "@/api/auth/postSignupAPI";
import { useRouter } from "next/router";
import { signupBodyType } from "@/types/auth";
import useValidation from "@/components/Interface/Auth/useValidation";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import { NAME_ICON, MAIL_ICON } from "@/components/Assets/AuthIcons";
import { postLoginAPI } from "@/api/auth/postLoginAPI";
import { setCookie } from "@/api/cookie";
import useAuthority from "@/hooks/useAuthority";
import { postPasswordRecoveryAPI } from "@/api/auth/postPasswordRecoveryAPI";
import { postUsernameRecoveryAPI } from "@/api/auth/postUsernameRecoveryAPI";
import AuthTemplate from "@/components/Interface/Auth/AuthTemplate";

function AuthRecoveryProc() {
  const router = useRouter();
  const { type } = router.query;
  const noti = useNotification();

  const [inputState, setInputState] = useState<accountRecoveryBodyType>({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (type !== "password" && type !== "username") {
      router.push("/");
    }
  }, [type]);

  const submitHandler = () => {
    if (inputState.name === "" || inputState.email === "") {
      noti({
        content: (
          <NotiTemplate
            type={"alert"}
            content={"회원 정보를 양식에 맞게 입력해 주세요."}
          />
        ),
      });
      return;
    }

    if (type === "password") {
      postPasswordRecoveryAPI({ body: inputState })
        .then((res) => {
          noti({
            content: (
              <NotiTemplate
                type={"ok"}
                content={"계정에 등록된 이메일로 계정 정보를 전송하였습니다."}
              />
            ),
          });
          router.push("/login");
        })
        .catch((err) => {
          noti({
            content: (
              <NotiTemplate
                type={"alert"}
                content={`${err.response.data.message}`}
              />
            ),
          });
        });
    } else if (type === "username") {
      postUsernameRecoveryAPI({ body: inputState })
        .then((res) => {
          noti({
            content: (
              <NotiTemplate
                type={"ok"}
                content={"계정에 등록된 이메일로 계정 정보를 전송하였습니다."}
              />
            ),
          });
          router.push("/login");
        })
        .catch((err) => {
          noti({
            content: (
              <NotiTemplate
                type={"alert"}
                content={`${err.response.data.message}`}
              />
            ),
          });
        });
    }
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
              {type === "password" ? "Password " : "Username "}
            </span>
            recovery
          </React.Fragment>
        }
        subTitle={"Having problems with your account?"}
      />

      <AuthTemplate.InputWrapper
        customCss={css`
          border-bottom: none;
        `}
      >
        <LabelInput
          theme={"auth"}
          label={"Name"}
          onChange={(e) =>
            setInputState((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{NAME_ICON}</div>
          </LabelInput.Left>
        </LabelInput>

        <LabelInput
          theme={"auth"}
          label={"Email"}
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            setInputState((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        >
          <LabelInput.Left>
            <div css={iconWrapperCSS}>{MAIL_ICON}</div>
          </LabelInput.Left>
        </LabelInput>
      </AuthTemplate.InputWrapper>

      <AuthTemplate.ButtonWrapper>
        <Button theme={"default"} customCss={buttonCSS} onClick={submitHandler}>
          Submit
        </Button>
        <Button
          theme={"outline"}
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

export default AuthRecoveryProc;
