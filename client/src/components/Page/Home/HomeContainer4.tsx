import React, {
  useEffect,
  useState,
  useRef,
  ReactElement,
  Children,
  useCallback,
} from "react";
import { css } from "@emotion/react";
import ContainerContent from "../../Interface/Container/ContainerContent";
import Animator from "../../Interface/Animator/useAnimator";
import { setConditionType } from "../../Interface/Container/useContainer";
import useAnimator from "../../Interface/Animator/useAnimator";
import { useQuery } from "@tanstack/react-query";
import { getArticleResponseType } from "@/types/board";
import { getArticleAPI } from "@/api/board/getArticleAPI";
import dynamic from "next/dynamic";
import SwipeableGallery from "@/components/Interface/SwipeableGallery/SwipeableGallery";
import Skeleton from "@/components/Interface/Loading/Skeleton";
import { debounce } from "lodash";
import Portal from "@/components/Interface/Portal/Portal";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import Loading from "@/components/Interface/Loading/Loading";

const ArticleViewer = dynamic(
  () => import("@/components/Page/Article/ArticleViewer"),
  { ssr: false }
);

type HomeContainer1Type = {
  setCondition: setConditionType;
  currentStep: number;
};

function HomeContainer4({ setCondition, currentStep }: HomeContainer1Type) {
  const condition = setCondition(currentStep);
  const { Animator, render } = useAnimator(condition.immediate);
  const [content, setContent] = useState<string[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [test, setTest] = useState<boolean>();
  const [contentCount, setContentCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const noti = useNotification();

  const article = useQuery<getArticleResponseType>(
    [`HomePPT`],
    () => getArticleAPI({ category: "etc", id: 127 }),
    {
      refetchOnWindowFocus: false,
      staleTime: 300000,
      cacheTime: 300000,
    }
  );

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [contentCount, content]);

  useEffect(() => {
    if (isFullscreen) {
      noti({
        content: (
          <NotiTemplate
            type={"ok"}
            content={"전체 화면을 종료하려면 ESC를 눌러주세요."}
          />
        ),
      });
    }
  }, [isFullscreen]);

  const keyDownHandler = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsFullscreen(() => true);
    }
    if (e.key === "Escape") {
      setIsFullscreen(() => false);
    }
  };

  const parellelogram = (
    <div
      css={[
        css`
          position: absolute;
          right: -50vw;
          top: -60vw;
          width: 100vw;
          height: 100vw;
          border-radius: 100%;
          /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
          background-color: rgb(183, 255, 0);
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

  const parellelogram2 = (
    <div
      css={Animator.Translate({
        id: "page-4-square-translate",
        trigger: condition.immediate,
        duration: 1000,
        delay: 500,
        offset: ["-70vw", "0px"],
        option: { hasReverse: true },
      })}
    >
      <div
        css={[
          Animator.Rotate({
            id: "page-4-square-rotate",
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
            background-color: rgb(255, 98, 0);
            position: absolute;
            left: -115vw;
            top: -50vw;
            /* visibility: hidden; */
          `,
        ]}
      />
    </div>
  );

  const parellelogram3 = (
    <div
      css={[
        css`
          position: absolute;
          right: -10vw;
          top: 10vw;
          width: 80vw;
          height: 80vw;
          border-radius: 100%;
          /* background: linear-gradient( to right, white, rgba(0, 0, 0, 0.3) ); */
          background-color: rgb(115, 0, 255);
        `,
        Animator.Translate({
          id: "parellel33",
          trigger: condition.immediate,
          duration: 1000,
          delay: 1000,
          offset: ["100vw", "0px"],
          option: { hasReverse: true },
        }),
      ]}
    />
  );

  useEffect(() => {
    if (article.data) {
      const urlRegex = /https?:\/\/[^\s[\]()"']+/g;
      const urls = article.data.content.match(urlRegex) as string[];
      setContent(() => urls);
    }
  }, [article.data]);

  const renderContent =
    content &&
    content.map((el) => {
      if (
        el.includes(".png") ||
        el.includes(".jpg") ||
        el.includes(".jpeg") ||
        el.includes(".gif") ||
        el.includes(".webp")
      ) {
        return (
          <div css={contentItemWrapperCSS}>
            <div css={contentItemInnerWrapperCSS({ isFullscreen })}>
              <img
                css={css`
                  width: 100%;
                  height: auto;
                `}
                src={el}
              />
            </div>
          </div>
        );
      } else if (el.includes(".mp4")) {
        return (
          <div css={contentItemWrapperCSS}>
            <div css={contentItemInnerWrapperCSS({ isFullscreen })}>
              <div
                css={css`
                  width: auto;
                  height: 90%;
                  border-radius: 20px;
                  overflow: hidden;
                  position: relative;
                `}
              >
                <video
                  preload="none"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width="100%"
                  height="100%"
                  css={css`
                    position: relative;
                    left: 0;
                    top: 0;
                    object-fit: cover !important;
                  `}
                >
                  <source src={el} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        );
      }
    });

  const dummy = [
    <div css={contentItemWrapperCSS}>
      <div css={contentItemInnerWrapperCSS({ isFullscreen })}>
        <Loading label={"컨텐츠를 불러오는 중입니다."}/>
      </div>
    </div>,
  ];

  const renderResult = (
    <Portal>
      <div
        css={[
          carouselOuterWrapper({ isFullscreen }),
          Animator.Translate({
            id: "carousel",
            trigger: condition.immediate,
            duration: 1000,
            delay: 0,
            offset: ["100vw", "0px"],
            option: { hasReverse: true },
          }),
        ]}
      >
        <div css={carouselWrapperCSS({ isFullscreen })}>
          <div
            onClick={() => {
              setIsFullscreen((prev) => !prev);
            }}
            css={carouselButtonWrapperCSS({ isFullscreen })}
          >
            <img src={"/assets/expand.svg"} />
          </div>
          {renderContent.length !== 0 ? (
            <SwipeableGallery
              key={`content-${content.length}`}
              content={renderContent}
              contentCount={contentCount}
              setContentCount={setContentCount}
              noButton={isFullscreen}
            />
          ) : (
            <SwipeableGallery
              key={"dummy"}
              content={dummy}
              contentCount={contentCount}
              setContentCount={setContentCount}
            />
          )}
        </div>
      </div>
    </Portal>
  );

  return (
    <ContainerContent customCss={containerWrapperCSS}>
      {render && parellelogram}
      {render && parellelogram2}
      {render && parellelogram3}

      <ContainerContent.Inner customCss={innerContentWrapperCSS}>
        {render && renderResult}
      </ContainerContent.Inner>
    </ContainerContent>
  );
}

const containerWrapperCSS = css`
  background-color: #00bbff;
  overflow: hidden;
  /* opacity: 70%; */
`;

const innerContentWrapperCSS = css`
  justify-content: center;
  align-items: center;
  /* width: 80% !important;
  height: 80% !important; */
  position: relative;
`;

const contentItemWrapperCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const contentItemInnerWrapperCSS = ({
  isFullscreen,
}: {
  isFullscreen: boolean;
}) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transition-property: transform;
    will-change: transform;
    transition-duration: 0.5s;
    transform: ${!isFullscreen && `scale(90%)`};
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: ${isFullscreen ? `0px` : `10px`};
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  `;
};

const carouselWrapperCSS = ({ isFullscreen }: { isFullscreen: boolean }) => {
  return css`
    transition-property: width height;
    will-change: width, height;
    transition-duration: 0.5s;
    position: relative;
    width: ${isFullscreen ? `100%` : `70%`};
    height: ${isFullscreen ? `100%` : `70%`};
    transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
    pointer-events: auto;
  `;
};

const carouselOuterWrapper = ({
  isFullscreen,
}: {
  isFullscreen: boolean;
}) => css`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${isFullscreen ? `99` : `10`};
  pointer-events: none;
`;

const carouselButtonWrapperCSS = ({
  isFullscreen,
}: {
  isFullscreen: boolean;
}) => {
  return css`
    position: absolute;
    z-index: 99;
    right: 60px;
    top: 40px;
    will-change: opacity, background-color;
    transition-property: opacity background-color;
    transition-duration: 0.5s;
    opacity: ${isFullscreen && "0%"};
    border-radius: 10px;
    width: 32px;
    height: 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    pointer-events: ${isFullscreen && `none`};

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `;
};
export default HomeContainer4;
