import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import ContainerContent from "../../Interface/Container/ContainerContent";
import Animator from "../../Interface/Animator/useAnimator";
import { setConditionType } from "../../Interface/Container/useContainer";

import useAnimator from "../../Interface/Animator/useAnimator";
import useModal from "@/components/Interface/Modal/useModal";
import { getActiveBoardAPI } from "@/api/board/getActiveBoardAPI";
import { getAdminAllBoardAPI } from "@/api/admin/getAdminAllBoardAPI";
import { postCommentAPI } from "@/api/comment/postCommentsAPI";
import { getCommentsAPI } from "@/api/comment/getCommentsAPI";
import useNewModal from "@/components/Interface/Modal/useNewModal";
import SwipeableGallery from "@/components/Interface/SwipeableGallery/SwipeableGallery";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getRepresentativeArticlesAPI } from "@/api/board/getRepresentativeArticlesAPI";
import { mobileArticlesResponseType, pageablePageArticlesResponseType } from "@/types/board";
import RepresentativeArticles from "./RepresentativeArticles";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";

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
  const { Animator, render } = useAnimator(condition.immediate);


  

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
                font-size: 6vw;
              `,
            ]}
          >
            I'm Junior Frontend <span css={css`font-weight: 700;`}>Developer!</span>
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
                margin-top: 32px;
                font-size: 2vw;
                color: rgba(0, 0, 0, 0.5);
              `,
            ]}
          >
            항상 노력하고, 다양한 경험을 하고자 합니다.
            
          </div>
          <div
            css={[
              Animator.Translate({
                id: "label",
                trigger: condition.maintain,
                duration: 1000,
                delay: 500,
                offset: ["0px", "100px"],
              }),
              css`
                margin-top: 8px;
                font-size: 1vw;
                color: rgba(0, 0, 0, 0.5);
              `,
            ]}
          >
            JavaScript | TypeScript | Java | React.js | Next.js | Spring Boot | CI/CD
          </div>

          

              
          
        </div>
        
        <div css={[
              Animator.Translate({
                id: "profile-animation",
                trigger: condition.maintain,
                duration: 1000,
                delay: 700,
                offset: ["100px", "0px"],
  
              }),
              profileWrapperCSS
            ]}>
          <img src={"/assets/Profile.png"}/>
        </div>
        
        
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




const profileWrapperCSS = css`
  position: absolute;
  right: 20%;;
  top: 10%;
  height: 750px;
  width: 250px;

  & img {
    height: 100%;
    width: auto;

  }
`
export default HomeContainer1;
