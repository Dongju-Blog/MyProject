import React from "react";
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { pauseAnimation } from "@/store/store";


type SkeletonPropsType = {} & React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ ...props }: SkeletonPropsType) {
  const [pauseAnimationAtom, setPauseAnimationAtom] = useAtom(pauseAnimation)

  return (
    <div {...props} css={skeletonCSS({pauseAnimationAtom})}>
      <div className={"skeleton"}></div>
    </div>
  );
}

const skeletonCSS = ({pauseAnimationAtom}: {pauseAnimationAtom: boolean}) => {
  return css`
  display: grid;
  overflow: hidden;

  .skeleton {
    width: 100%;
    height: 100%;
    border-radius: 4px;

    color: rgba(0, 0, 0, 0);
    background-image: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.1)
    );
    background-size: 200% 100%;
    animation: skeleton-loading 8s ease-in-out infinite;
    display: grid;

    animation-play-state: ${pauseAnimationAtom ? `paused` : `running`};
  }
  @keyframes skeleton-loading {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;
} 

export default Skeleton;
