import React from "react";
import { css } from "@emotion/react";
import ContainerContent from "../../Interface/Container/ContainerContent";
import Animator from "../../Interface/Animator/useAnimator";
import { setConditionType } from "../../Interface/Container/useContainer";
import useAnimator from "../../Interface/Animator/useAnimator";
import { CONTACT_ICON, PHONE_ICON } from "@/components/Assets/ContactIcons";

type HomeContainer1Type = {
  setCondition: setConditionType;
  currentStep: number;
};

function HomeContainer3({ setCondition, currentStep }: HomeContainer1Type) {
  const condition = setCondition(currentStep);
  const {Animator, render} = useAnimator(condition.immediate)

  const circle = (
    <div
      css={Animator.Translate({
        id: "parellel3",
        trigger: condition.maintain,
        duration: 1000,
        delay: 200,
        offset: ["0", "-70vw"],
      })}
    >
      <div
        css={
          css`
            width: 80vh;
            height: 80vh;
            border-radius: 100%;
            /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
            background-color: #ffffff;
            /* box-shadow: 0px 0px 100px 0px rgba(255, 222, 185, 0.493);; */
            /* position: absolute; */
            
            /* visibility: hidden; */
          `
        }
      />
    </div>
  );

  const parellelogram = (
    <div
      css={[Animator.Translate({
        id: "page-3-square-translate",
        trigger: condition.maintain,
        duration: 30000,
        delay: 1000,
        offset: ["0px", "-40vh"],
        option: {
          opacityFrom: '100%'
        }
      }), css` position: absolute;`]}
    >
      <div
        css={[Animator.Scale({
          id: "page-3-square-scale",
          trigger: condition.maintain,
          duration: 27000,
          delay: 1000,
          offset: ["0%", "100%"],
          option: {
            opacityFrom: '100%'
          }
        }),
          css`
            width: 80vh;
            height: 80vh;
            z-index: 0;
            /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
            background-color: #ffffff;
            box-shadow: 0px 0vh 10vh 50px #ffffff;
            border-radius: 100%;
            /* top: 0%; */
            /* top: 100vh; */
            /* visibility: hidden; */
          `
        ]}
      />
    </div>
  );

  return (
    <ContainerContent customCss={containerWrapperCSS}>
      {render && parellelogram}
      {render && circle}
      
      <ContainerContent.Inner >
        <div css={innerContentWrapperCSS}>
          <div css={[Animator.Translate({
                id: "contact-title",
                trigger: condition.maintain,
                duration: 1000,
                delay: 100,
                offset: ["0px", "100px"],
              }), contactTextWrapperCSS]}>Contact</div>
              <div
            css={[
              Animator.Translate({
                id: "label",
                trigger: condition.maintain,
                duration: 1000,
                delay: 200,
                offset: ["0px", "100px"],
              }),
              css`
                font-size: 2vw;
                color: rgba(0, 0, 0, 0.6);
                margin-bottom: 24px;
              `,
            ]}
          >
            열린 마음으로 경청하겠습니다.
          </div>
            

          <div
            css={[
              Animator.Translate({
                id: "label",
                trigger: condition.maintain,
                duration: 1000,
                delay: 300,
                offset: ["0px", "100px"],
              }),
              css`
                font-size: 5vw;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                justify-content: center;
                margin-bottom: 140px;
                & path {
                  stroke: rgba(0, 0, 0, 0.6);
                }
              `,
            ]}
          >
            {CONTACT_ICON}
            <div css={css`margin-top: -100px; width: 20%; height: 20px; border-radius: 100%; box-shadow: 0px 90px 30px 0px rgba(0, 0, 0, 0.2);`}></div>
          </div>
          <div
            css={[
              Animator.Translate({
                id: "label",
                trigger: condition.maintain,
                duration: 1000,
                delay: 400,
                offset: ["0px", "100px"],
              }),
              css`
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                /* margin-top: 0px; */
                

              `,
            ]}
          >
            <div css={css`display: flex; flex-direction:column; align-items: center;`}>
              
            <div css={css`font-size: 24px; font-weight: 700; margin-bottom: 16px;`}>김동주</div>
              <div css={css`color: rgba(0, 0, 0, 0.6);`}>+82 10-8521-6414</div>
              <div css={css`color: rgba(0, 0, 0, 0.6);`}>jook1356@gmail.com</div>
            
            </div>
            
 
            
          </div>

        </div>
      
      </ContainerContent.Inner>
    </ContainerContent>
  );
}

const containerWrapperCSS = css`
  background-color: #e1ff00;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  /* opacity: 70%; */
`;

const innerContentWrapperCSS = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const contactTextWrapperCSS = css`font-size: 5vw; font-weight: 700; `

export default HomeContainer3;
