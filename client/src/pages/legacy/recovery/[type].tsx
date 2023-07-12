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

function index() {
  const router = useRouter();
  const { type } = router.query;
  const auth = useAuthority();
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
    <div css={signupWrapperCSS}>
      <div css={formWrapperCSS} className={"form-wrapper"}>
        <div css={mobileWallpaperCSS}>
          <img src={"/assets/Wallpaper3.jpg"} />
        </div>

        <div css={contentWrapperCSS}>
          <div css={titleWrapperCSS}>
            <div
              css={css`
                font-size: 28px;
                font-weight: 500;
              `}
            >
              <span
                css={css`
                  font-weight: 300;
                `}
              >
                {type === "password" ? "Password " : "Username "}
              </span>
              recovery
            </div>
            <div
              css={css`
                font-size: 12px;
                color: rgba(0, 0, 0, 0.4);
              `}
            >
              Having problems with your account?
            </div>
          </div>
          <div css={inputSectionCSS}>
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
          </div>

          <div css={buttonWrapperCSS}>
            <Button
              theme={"default"}
              customCss={buttonCSS}
              onClick={submitHandler}
            >
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
          </div>
        </div>
      </div>
    </div>
  );
}

const signupWrapperCSS = css`
  @media ${mediaQuery.desktop} {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -22vw;
      left: 0;
      width: 100vw;
      height: 150vh;
      background-image: url(graphic-to-be-filtered.jpg);
      background-image: url("/assets/Wallpaper3.jpg");
      background-size: cover;
      opacity: 20%;
      /* filter: brightness(40%); */
    }
  }

  min-width: 100vw;
  min-height: 100%;
  height: 100%;
  overflow: hidden;
`;

const formWrapperCSS = css`
  background-color: #fafbff;

  @media ${mediaQuery.mobile} {
    min-width: 100vw;
    min-height: 100%;
  }
  @media ${mediaQuery.desktop} {
    width: 25vw;
    min-width: 300px;
    border-radius: 20px;
    box-shadow: 0px 0px 150px 1px rgba(0, 0, 0, 0.4);
    position: relative;
  }

  /* height: 70vh; */

  /* border: 1px solid rgba(45, 48, 71, 0.253); */
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const contentWrapperCSS = css`
  @media ${mediaQuery.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    /* flex: 1; */
  }
  width: 100%;
`;

const titleWrapperCSS = css`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 4px;
  width: 100%;
  margin-top: 24px;
`;

const inputSectionCSS = css`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 1px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: none;
  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.05);
`;

const iconWrapperCSS = css`
  height: 100%;
  width: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const buttonWrapperCSS = css`
  @media ${mediaQuery.mobile} {
    flex-direction: column;
    align-items: center;
    /* margin-top: 16px; */
  }

  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
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

const mobileWallpaperCSS = css`
  @media ${mediaQuery.mobile} {
    display: block;
  }

  display: none;
  width: 100vw;
  /* height: 45vh; */
  position: relative;
  overflow: hidden;
  flex: 1;

  & img {
    position: absolute; // 포지션을 주고,
    top: -20%; // 보이기 원하는 위치를 지정
    left: 0;
    width: 100%;
    height: auto;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #ffff000f, #ffff000f, #fafbff);
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

export default index;
