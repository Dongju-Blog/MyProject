import React, { useState, useEffect, ReactNode } from "react";
import Portal from "@/components/Interface/Portal/Portal";
import { css } from "@emotion/react";
import { getArticlesItemType } from "@/types/board";
import dynamic from "next/dynamic";
import Button from "@/components/Interface/Button/Button";
// import Article from "./Article";

const Article = dynamic(
  () => import("@/components/Page/Article/Article"),
  { ssr: false }
);


type ModalArticlePropsType = {
  parentRef: React.RefObject<HTMLDivElement>;
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  article: getArticlesItemType;
  thumbnail: ReactNode
};

function ModalArticle({
  parentRef,
  setIsModalOn,
  article,
  thumbnail
}: ModalArticlePropsType) {
  const [isTriggered, setIsTriggered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTriggered(() => true);
    }, 10);
    setTimeout(() => {
      setIsExpanded(() => true);
    }, 1000);
  }, []);

  const closeHandler = () => {
    setIsExpanded(() => false)
    
    setTimeout(() => {
      setIsTriggered(() => false);
    }, 500);
    setTimeout(() => {
      setIsModalOn(() => false);
    }, 1000);
  };


  return (
    <Portal>
      <div css={backdropCSS} onClick={closeHandler} onWheel={(e) => {e.stopPropagation()}}>
        <div css={wrapperCSS({ parentRef, isTriggered })} onClick={(e) => {e.stopPropagation()}}>
          <div css={renderThumbnailWrapperCSS({isTriggered, isExpanded})}>
            {thumbnail}
          </div>
          <div css={articleWrapperCSS({isExpanded})}>
            <div css={headerCSS}>
              <div css={headerContentWrapperCSS}>
                Board <span css={css`color: rgba(0, 0, 0, 0.3);`}> / </span> {article.boardName} <span css={css`color: rgba(0, 0, 0, 0.3);`}> / </span> {article.title}
              </div>
              <div css={headerContentWrapperCSS}>
                <Button onClick={closeHandler} theme={"grey"}>Close</Button>
              </div>
            </div>
            {isTriggered && <Article articleId={article.id} boardName={article.boardName} isDelayed={!isExpanded}/>}
          </div>
        </div>
      </div>
    </Portal>
  );
}

const backdropCSS = css`
  width: 100vw;
  height: 100%;
  z-index: 199;
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const wrapperCSS = ({
  parentRef,
  isTriggered,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  isTriggered: boolean;
}) => {
  const parent = parentRef.current;

  return css`
    /* background-color: #ff0000; */
    will-change: width height transform box-shadow;
    background-color: ${isTriggered ? `white` : `white`};
    position: fixed;
    overflow: hidden;
    transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
    transition-property: width height transform background-color;
    transition-duration: 0.5s;
    max-width: 1080px;
    width: ${isTriggered ? `100%` : `${parent && parent.clientWidth}px`};
    height: ${isTriggered ? `90%` : `${parent && parent.clientHeight}px`};
    border-radius: ${isTriggered ? `10px` : `20px`};
    box-shadow: ${isTriggered && `0px 0px 50px 0px rgba(0, 0, 0, 0.4)`};
    ${isTriggered
      ? `transform: translate(0px, 0px)`
      : `transform: translate(calc(${
          parent && parent.getBoundingClientRect().left
        }px - 50vw + ${parent && parent.clientWidth / 2}px), calc(${
          parent && parent.getBoundingClientRect().top
        }px - 50vh + ${parent && parent.clientHeight / 2}px))`};
    display: flex;
    flex-direction: column;
  `;
};

const renderThumbnailWrapperCSS = ({ isTriggered, isExpanded }: { isTriggered: boolean; isExpanded: boolean }) => {
  return css`
    pointer-events: none;
    opacity: ${isTriggered  ? `0%` : `100%`};
    will-change: opacity;
    transition-property: opacity;
    transition-duration: 0.5s;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9999;
  `
}

// const thumbnailWrapperCSS = ({ isTriggered }: { isTriggered: boolean }) => {
//   return css`
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     /* align-items: center; */
//     overflow: hidden;
//     position: absolute;
//   `;
// };

// const thumbnailCSS = ({ isTriggered }: { isTriggered: boolean }) => {
//   return css`
//     transition-property: height;
//     transition-duration: 0.5s;
//     z-index: 10;
//     width: 100%;
//     object-fit: cover;

//     position: absolute;
//     height: ${isTriggered ? `100%` : `70%`};
//   `;
// };

// const contentWrapperCSS = css`
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 12px;
//   background-color: white;
//   top: 70%;
//   height: 30%;
// `;

const articleWrapperCSS = ({ isExpanded }: { isExpanded: boolean }) => {
  return css`
    width: 100vw;
    max-width: 1080px;
    height: 100vh;
    overflow-y: scroll;
    position: relative;
  `
} 

const headerCSS = css`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  z-index: 99;
  pointer-events: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  align-items: center;
  padding: 24px;

`

const headerContentWrapperCSS = css`
  pointer-events: auto;
`


export default ModalArticle;
