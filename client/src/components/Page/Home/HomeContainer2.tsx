import React from "react";
import { css } from "@emotion/react";
import ContainerContent from "../../Interface/Container/ContainerContent";
import Animator from "../../Interface/Animator/useAnimator";
import { setConditionType } from "../../Interface/Container/useContainer";
import useAnimator from "../../Interface/Animator/useAnimator";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import RepresentativeArticles from "./RepresentativeArticles";
import { useAtom } from "jotai";
import { pauseAnimation } from "@/store/store";


type HomeContainer1Type = {
  setCondition: setConditionType;
  currentStep: number;
};

function HomeContainer2({ setCondition, currentStep }: HomeContainer1Type) {
  const condition = setCondition(currentStep);
  const {Animator, render} = useAnimator(condition.immediate)
  const isMobile = useResponsive(mediaQuery.mobile)
  const [pauseAnimationAtom, setPauseAnimationAtom] = useAtom(pauseAnimation)

  // const parellelogram = (
  //   <div
  //     css={[
  //       Animator.Translate({
  //         id: "parellel",
  //         trigger: condition.immediate,
  //         duration: 1000,
  //         delay: 200,
  //         offset: ["70vw", "0px"],
  //         option: { hasReverse: true },
  //       }),
  //       css`
  //         width: 70vw;
  //         height: 70vw;
  //         border-radius: 30%;
  //         /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
  //         background-color: rgba(0, 0, 0, 0.1);
  //         position: absolute;
  //         right: -30vw;
  //         top: 10vw;
  //         /* visibility: hidden; */
  //       `,
  //     ]}
  //   />
  // );

  const parellelogram = (
    <div
      css={Animator.Translate({
        id: "page-2-square-translate",
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
            id: "page-2-square-rotate",
            trigger: condition.immediate,
            duration: 1000,
            delay: 600,
            offset: "-20deg",
            option: { hasReverse: true },
          }),
          css`
            width: 150vw;
            height: 150vw;

            /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
            background-color: rgba(0, 0, 0, 0.2);
            position: absolute;
            right: -115vw;
            top: -70vw;
            /* visibility: hidden; */
          `,
        ]}
      />
    </div>
  );

  return (
    <ContainerContent customCss={containerWrapperCSS}>
      <div css={css`
        width: 100%;
        height: 100%;
        position: relative;
      `}>
        <img  css={[Animator.Scale({
                id: "wallpaper",
                trigger: condition.maintain,
                duration: 10000,
                delay: 0,
                offset: ["150%", "100%"],
                option: {
                  opacityFrom: '30%',
                  opacityTo: '50%'
                }
              }),
          css`
          position: absolute;
          height: 100vh;
          width: 100vw;
          object-fit: cover;
          opacity: 50%;;
          animation-play-state: ${pauseAnimationAtom ? `paused` : `running`};
        `]} src={"/assets/Wallpaper7_compressed.png"}/>
      </div>
      
      {render && parellelogram}
      
      <ContainerContent.Inner customCss={innerContentWrapperCSS}>
        <div css={contentWrapperCSS}>
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
                font-size: 6vw;
                font-weight: 700;
              `,
            ]}
          >
            Portfolio
          </div>
          {/* <div
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
            
          </div> */}
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
                color: rgba(0, 0, 0, 0.6);

              `,
            ]}
          >
            부족하지만 끊임없이 노력하며 발전해 왔습니다.
          </div>

          <div css={[Animator.Translate({
                  id: "page2-decorator",
                  trigger: condition.maintain,
                  duration: 1000,
                  delay: 600,
                  offset: ["0px", "100px"],
                }), decoratorCSS]}/>

          <div css={[Animator.Translate({
                  id: "page2-gallery",
                  trigger: condition.maintain,
                  duration: 1000,
                  delay: 700,
                  offset: ["0px", "100px"],
                }), galleryWrapperCSS]}>
                  {/* <div css={portfolioTitleCSS}>Portfolio</div> */}
                  <div css={galleryInnerWrapperCSS} onTouchEnd={(e) => {e.stopPropagation()}}>
            
            {isMobile ? condition.maintain && <RepresentativeArticles articleSize={1} key={`mobile-representative`} /> : condition.maintain && <RepresentativeArticles articleSize={3} key={`desktop-representative`} />}
              
          </div>
        </div>
          
        </div>
        <div></div>
      </ContainerContent.Inner>
    </ContainerContent>
  );
}

const containerWrapperCSS = css`
  /* background-color: #ae00ff; */
  background-color: white;
  overflow: hidden;
`;

const contentWrapperCSS = css`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const innerContentWrapperCSS = css`
  display: flex;
`;

const galleryInnerWrapperCSS = css`
  flex: 1;
`

const galleryWrapperCSS = css`
  width: 100%;
  height: 280px;
  /* background-color: rgba(255, 255, 255, 0.1); */
  border-radius: 10px;
  margin-top: 48px;

  display: flex;
  flex-direction: column;
  /* box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.05); */
  
`

const decoratorCSS = css`
margin-top: 18px;
  width: 60px;
  height: 6px;
  background-color: black;
`



const portfolioTitleCSS = css`
  margin-top: 16px;
  margin-left: 36px;
  font-size: 36px;
  /* margin-bottom: 8px; */
`

export default HomeContainer2;
