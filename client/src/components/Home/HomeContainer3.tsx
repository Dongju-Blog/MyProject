import React from "react";
import { css } from "@emotion/react";
import ContainerContent from "../Container/ContainerContent";
import Animator from "../Animator/Animator";
import { setConditionType } from "../Container/useContainer";

type HomeContainer1Type = {
  setCondition: setConditionType;
  currentStep: number;
};

function HomeContainer3({ setCondition, currentStep }: HomeContainer1Type) {
  const condition = setCondition(currentStep);

  const parellelogram = (
    <div
      css={Animator.Translate({
        id: "parellel3",
        trigger: condition.immediate,
        duration: 1000,
        delay: 200,
        offset: ["70vw", "0px"],
        option: { hasReverse: true },
      })}
    >
      <div
        css={[
          Animator.Rotate({
            id: "parellel-inner3",
            trigger: condition.immediate,
            duration: 1000,
            delay: 600,
            offset: "20deg",
            option: { hasReverse: true },
          }),
          css`
            width: 150vw;
            height: 150vw;

            /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
            background-color: rgba(0, 0, 0, 0.1);
            position: absolute;
            right: -100vw;
            top: -7vw;
            /* visibility: hidden; */
          `,
        ]}
      />
    </div>
  );

  return (
    <ContainerContent customCss={containerWrapperCSS}>
      {parellelogram}
      <ContainerContent.Inner customCss={innerContentWrapperCSS}>
        <div>
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
                font-size: 5vw;
              `,
            ]}
          >
            Hi!
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
              `,
            ]}
          >
            I'm Frontend Developer!
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
                font-size: 2vw;
              `,
            ]}
          >
            But I know how to handle the backend, CI/CD as well!
          </div>
        </div>
        <div></div>
      </ContainerContent.Inner>
    </ContainerContent>
  );
}

const containerWrapperCSS = css`
  background-color: #e1ff00;
  overflow: hidden;
  /* opacity: 70%; */
`;

const innerContentWrapperCSS = css`
  display: flex;
`;

export default HomeContainer3;
