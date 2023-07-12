// import React, { useState, useReducer, useEffect, useMemo } from "react";
// import { css } from "@emotion/react";
// import Animator from "@/components/Interface/Animator/useAnimator";
// import Input from "@/components/Interface/Input/Input";
// import LabelInput from "@/components/Interface/Input/LabelInput";
// import Button from "@/components/Interface/Button/Button";
// import { signupProcType } from "@/types/auth";
// import { debounce, throttle } from "lodash";
// import mediaQuery from "@/util/responsive";
// import { postSignupAPI } from "@/api/auth/postSignupAPI";
// import { useRouter } from "next/router";
// import { signupBodyType } from "@/types/auth";
// import useValidation from "@/components/Interface/Auth/useValidation";
// import useNotification from "@/components/Interface/StackNotification/useNotification";
// import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
// import {
//   ID_ICON,
//   MAIL_ICON,
//   NAME_ICON,
//   PASSWORD_ICON,
// } from "@/components/Assets/AuthIcons";

// const inputReducer = (
//   state: signupBodyType,
//   action: { type: string; value: string }
// ) => {
//   switch (action.type) {
//     case "CHANGE_NAME":
//       return { ...state, name: action.value };
//     case "CHANGE_USERNAME":
//       return { ...state, username: action.value };
//     case "CHANGE_PASSWORD":
//       return { ...state, password: action.value };
//     case "CHANGE_CHECKED_PASSWORD":
//       return { ...state, checkedPassword: action.value };
//     case "CHANGE_EMAIL":
//       return { ...state, email: action.value };
//     default:
//       return state;
//   }
// };

// function index() {
//   const router = useRouter();
//   const noti = useNotification();

//   const [inputState, dispatchInput] = useReducer(inputReducer, {
//     name: "",
//     username: "",
//     password: "",
//     checkedPassword: "",
//     email: "",
//   });

//   const { isValid, validMessage, validInjector } = useValidation(inputState);

//   // useEffect(() => {
//   //   const debouncedHandler = debounce(() => {
//   //     postSignupProcAPI({ body: inputState }).then((res) => {
//   //       setSignupProc(() => res);
//   //     });
//   //     console.log(signupProc);
//   //   }, 1000);

//   //   debouncedHandler();

//   //   return () => {
//   //     debouncedHandler.cancel();
//   //   };
//   // }, [inputState]);

//   const submitHandler = () => {
//     const inputStateKeys = Object.keys(inputState) as Array<
//       keyof signupBodyType
//     >;
//     const filteredInputState: signupProcType = {};
//     inputStateKeys.forEach((key) => {
//       if (inputState[key] !== "") {
//         filteredInputState[key] = inputState[key];
//       }
//     });

//     postSignupAPI({ body: filteredInputState })
//       .then((res) => {
//         noti({
//           content: (
//             <NotiTemplate type={"ok"} content={"가입이 완료되었습니다!"} />
//           ),
//         });
//         router.push("/");
//       })
//       .catch((err) => {
//         validInjector(err.response.data);
//       });
//   };

//   return (
//     <div css={signupWrapperCSS}>
//       <div css={formWrapperCSS}>
//         <div css={mobileWallpaperCSS}>
//           <img src={"/assets/Wallpaper3.jpg"} />
//         </div>

//         <div css={contentWrapperCSS}>
//           <div css={titleWrapperCSS}>
//             <div
//               css={css`
//                 font-size: 28px;
//                 font-weight: 500;
//               `}
//             >
//               <span
//                 css={css`
//                   font-weight: 300;
//                 `}
//               >
//                 Welcome to{" "}
//               </span>
//               dj.Blog
//             </div>
//             <div
//               css={css`
//                 font-size: 12px;
//                 color: rgba(0, 0, 0, 0.4);
//               `}
//             >
//               I appreciate that you are going to join my workspace.
//             </div>
//           </div>
//           <div css={inputSectionCSS}>
//             <LabelInput
//               theme={"auth"}
//               label={validMessage.name ? validMessage.name : "Name"}
//               isValid={isValid.name}
//               onChange={(e) => {
//                 dispatchInput({ type: "CHANGE_NAME", value: e.target.value });
//               }}
//             >
//               <LabelInput.Left>
//                 <div css={iconWrapperCSS}>{NAME_ICON}</div>
//               </LabelInput.Left>
//             </LabelInput>
//             <LabelInput
//               theme={"auth"}
//               label={validMessage.username ? validMessage.username : "Username"}
//               isValid={isValid.username}
//               onChange={(e) => {
//                 dispatchInput({
//                   type: "CHANGE_USERNAME",
//                   value: e.target.value,
//                 });
//               }}
//             >
//               <LabelInput.Left>
//                 <div css={iconWrapperCSS}>{ID_ICON}</div>
//               </LabelInput.Left>
//             </LabelInput>
//             <LabelInput
//               theme={"auth"}
//               label={validMessage.password ? validMessage.password : "Password"}
//               type={"password"}
//               isValid={isValid.password}
//               onChange={(e) => {
//                 dispatchInput({
//                   type: "CHANGE_PASSWORD",
//                   value: e.target.value,
//                 });
//               }}
//             >
//               <LabelInput.Left>
//                 <div css={iconWrapperCSS}>{PASSWORD_ICON}</div>
//               </LabelInput.Left>
//             </LabelInput>
//             <LabelInput
//               theme={"auth"}
//               label={
//                 validMessage.checkedPassword
//                   ? validMessage.checkedPassword
//                   : "Repeat Password"
//               }
//               type={"password"}
//               isValid={isValid.checkedPassword}
//               onChange={(e) => {
//                 dispatchInput({
//                   type: "CHANGE_CHECKED_PASSWORD",
//                   value: e.target.value,
//                 });
//               }}
//             >
//               <LabelInput.Left>
//                 <div css={iconWrapperCSS}>{PASSWORD_ICON}</div>
//               </LabelInput.Left>
//             </LabelInput>
//             <LabelInput
//               theme={"auth"}
//               label={validMessage.email ? validMessage.email : "Email Address"}
//               isValid={isValid.email}
//               onChange={(e) => {
//                 dispatchInput({ type: "CHANGE_EMAIL", value: e.target.value });
//               }}
//             >
//               <LabelInput.Left>
//                 <div css={iconWrapperCSS}>{MAIL_ICON}</div>
//               </LabelInput.Left>
//             </LabelInput>
//           </div>

//           <div css={buttonWrapperCSS}>
//             <Button
//               theme={"default"}
//               customCss={buttonCSS}
//               onClick={submitHandler}
//             >
//               Sign Up
//             </Button>
//             <Button
//               theme={"outline"}
//               customCss={buttonCSS}
//               onClick={() => {
//                 router.push("/");
//               }}
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const signupWrapperCSS = css`
//   @media ${mediaQuery.desktop} {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: relative;
//     &::before {
//       content: "";
//       position: absolute;
//       top: -22vw;
//       left: 0;
//       width: 100vw;
//       height: 150vh;
//       background-image: url(graphic-to-be-filtered.jpg);
//       background-image: url("/assets/Wallpaper3.jpg");
//       background-size: cover;
//       opacity: 20%;
//       /* filter: brightness(40%); */
//     }
//   }

//   min-width: 100vw;
//   height: 100%;
//   min-height: 100%;
//   /* height: 100%; */
//   overflow: hidden;
// `;

// const formWrapperCSS = css`
//   background-color: #fafbff;

//   @media ${mediaQuery.mobile} {
//     min-width: 100vw;
//     min-height: 100%;
//   }
//   @media ${mediaQuery.desktop} {
//     width: 25vw;
//     min-width: 300px;
//     border-radius: 20px;
//     box-shadow: 0px 0px 150px 1px rgba(0, 0, 0, 0.4);
//     position: relative;
//   }

//   /* height: 70vh; */

//   /* border: 1px solid rgba(45, 48, 71, 0.253); */
//   padding: 0px 24px 24px 24px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const contentWrapperCSS = css`
//   @media ${mediaQuery.mobile} {
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;

//     /* flex: 1; */
//   }
//   width: 100%;
// `;

// const titleWrapperCSS = css`
//   display: flex;
//   flex-direction: column;
//   /* align-items: center; */
//   gap: 4px;
//   width: 100%;
//   margin-top: 24px;
// `;

// const inputSectionCSS = css`
//   width: 100%;
//   margin-top: 24px;
//   margin-bottom: 24px;
//   display: flex;
//   flex-direction: column;
//   border-radius: 1px;
//   border: 1px solid rgba(0, 0, 0, 0.05);
//   border-bottom: none;
//   border-radius: 4px;
//   overflow: hidden;
//   background-color: rgba(255, 255, 255, 0.5);
//   box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.05);
// `;

// const iconWrapperCSS = css`
//   height: 100%;
//   width: 54px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const buttonWrapperCSS = css`
//   @media ${mediaQuery.mobile} {
//     flex-direction: column;
//     align-items: center;
//     /* margin-top: 16px; */
//   }

//   width: 100%;
//   display: flex;
//   justify-content: center;
//   gap: 16px;
// `;

// const buttonCSS = css`
//   @media ${mediaQuery.mobile} {
//     width: 100%;
//     height: 48px;
//   }
//   @media ${mediaQuery.desktop} {
//     width: 50%;
//   }
// `;

// const mobileWallpaperCSS = css`
//   @media ${mediaQuery.mobile} {
//     display: block;
//   }

//   display: none;
//   width: 100vw;
//   /* height: 30vh; */
//   flex: 1;
//   position: relative;
//   overflow: hidden;

//   & img {
//     position: absolute; // 포지션을 주고,
//     top: -30%; // 보이기 원하는 위치를 지정
//     left: 0;
//     width: 100%;
//     height: auto;
//   }

//   &:after {
//     content: "";
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(
//       to bottom,
//       #ffff000f,
//       #ffff000f,
//       #ffff000f,
//       #fafbff
//     );
//   }
// `;

// export default index;
