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
  const isMobile = useResponsive(mediaQuery.mobile)

  

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
          
          {/* <div
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
          </div> */}

          
        </div>
        
        <div css={[Animator.Translate({
                  id: "label",
                  trigger: condition.maintain,
                  duration: 1000,
                  delay: 600,
                  offset: ["0px", "100px"],
                }), galleryWrapperCSS]}>
                  <div css={portfolioTitleCSS}>Portfolio</div>
          <div css={galleryInnerWrapperCSS}>
            
            {isMobile ? <RepresentativeArticles articleSize={1} key={`mobile-representative`} /> : <RepresentativeArticles articleSize={3} key={`desktop-representative`} />}
              
          </div>
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
  /* display: flex; */
`;

const galleryWrapperCSS = css`
  width: 100%;
  height: 360px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  margin-top: 24px;

  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.05);
  
`

const galleryInnerWrapperCSS = css`
  flex: 1;
`

const portfolioTitleCSS = css`
  margin-top: 16px;
  margin-left: 36px;
  font-size: 36px;
  /* margin-bottom: 8px; */
`
export default HomeContainer1;
