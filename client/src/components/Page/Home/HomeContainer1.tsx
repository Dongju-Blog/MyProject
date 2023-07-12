import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import ContainerContent from "../../Interface/Container/ContainerContent";
import Animator from "../../Interface/Animator/useAnimator";
import { setConditionType } from "../../Interface/Container/useContainer";
import { getUserInfoAPI } from "@/api/auth/getUserInfoAPI.ts";
import useAnimator from "../../Interface/Animator/useAnimator";

type HomeContainer1Type = {
  setCondition: setConditionType;
  currentStep: number;
  setStep: Function;
};

function HomeContainer1({
  setCondition,
  currentStep,
  setStep,
}: HomeContainer1Type) {
  const condition = setCondition(currentStep);
  const testRef = useRef<HTMLDivElement>(null);
  const {Animator, render} = useAnimator(condition.immediate)

  const parellelogram = (
    <div
      css={[
        css`
          position: absolute;
          right: -30vw;
          top: -7vw;
          width: 100vw;
          height: 100vw;
          border-radius: 100%;
          /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
          background-color: rgba(0, 0, 0, 0.1);
        `,
        Animator.Translate({
          id: "parellel",
          trigger: condition.immediate,
          duration: 1000,
          delay: 200,
          offset: ["70vw", "0px"],
          option: { hasReverse: true },
        }),
      ]}
    />
  );

  return (
    <ContainerContent customCss={containerWrapperCSS}>
      {render && parellelogram}
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
  background-color: white;
  overflow: hidden;
`;

const innerContentWrapperCSS = css`
  display: flex;
`;

export default HomeContainer1;
