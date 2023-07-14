import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  ReactNode,
  Children,
} from "react";
import { getAllBoardAPI } from "@/api/board/getAllBoardAPI";
import { getAllBoardResponseType } from "@/types/board";
import { useQuery } from "@tanstack/react-query";
import { css } from "@emotion/react";
import Swipe, { SwipeEvent, SwipePosition } from "react-easy-swipe";

type categoryItemPropertyType = {
  height: number;
};

function category() {
  const categoryItemProperty: categoryItemPropertyType = {
    height: 42,
  };

  const categories = useQuery<getAllBoardResponseType>(
    ["boards"],
    getAllBoardAPI
  );

  const separatorRef = useRef<HTMLDivElement>(null);
  const categoryItemRef = useRef<HTMLDivElement>(null);

  const [movingElement, setMovingElement] = useState(-1);
  const [deltaY, setDeltaY] = useState(0);

  const [adjustedCategories, setAdjustedCategories] =
    useState<getAllBoardResponseType>();

  const [swipeEnd, setSwipeEnd] = useState(false);

  useEffect(() => {
    if (categories.data) {
      const temp = categories.data;
      let idx = 0;
      for (let category of temp) {
        if (category.viewOrder === null) {
          temp.splice(idx, 0, {
            viewOrder: -1,
            isSecret: false,
            name: "separator",
            id: -1,
          });
          break;
        }
        idx += 1;
      }
      setAdjustedCategories(() => temp);
    }
  }, [categories.data]);

  useEffect(() => {
    console.log(adjustedCategories);
    
  }, [adjustedCategories]);

  const renderCategories = adjustedCategories?.map((el, idx) => {
    if (el.viewOrder === -1) {
      return (
        <div
          key={`item-${el.id}`}
          css={[
            separatorCSS({ idx }),
            moveHandlerCSS({
              idx,
              movingElement,
              deltaY,
              categoryItemProperty,
              swipeEnd,
            }),
          ]}
          ref={separatorRef}
        ></div>
      );
    } else {
      return (
        <Swipe
          key={`item-${el.id}`}
          onSwipeStart={(e) =>
            {onSwipeStart(e, idx)}
          }
          onSwipeMove={(p, e) => {onSwipeMove(p, e, idx)}}
          onSwipeEnd={(e) => {onSwipeEnd(e, idx)}}
          allowMouseEvents={true}
          css={[
            categoryItemWrapperCSS,
            moveHandlerCSS({
              idx,
              movingElement,
              deltaY,
              categoryItemProperty,
              swipeEnd,
            }),
          ]}
        >
          <div ref={categoryItemRef}>{el.name}</div>
        </Swipe>
      );
    }
  });

  const renderDummy = adjustedCategories?.map((el, idx) => {
    return <div css={dummyCSS} />;
  });

  const changeArrayOrder = function (
    list: any,
    targetIdx: number,
    moveValue: number
  ) {
    if (list.length < 0) return;
    const newPosition = targetIdx + moveValue;
    if (newPosition < 0 || newPosition >= list.length) return;
    const tempList = JSON.parse(JSON.stringify(list));
    const target = tempList.splice(targetIdx, 1)[0];
    tempList.splice(newPosition, 0, target);
    return tempList;
  };

  function onSwipeStart(event: SwipeEvent, idx: number) {
    if (swipeEnd === false) {
      setMovingElement(() => idx);
    } else {
      return
    }
  }

  function onSwipeMove(
    position: SwipePosition,
    event: SwipeEvent,
    idx: number
  ) {
    if (swipeEnd === false && movingElement !== -1) {
      setDeltaY(() => position.y);
    } else {
      return
    }
  }

  function onSwipeEnd(event: SwipeEvent, idx: number) {
    
    if (swipeEnd === false) {
      setSwipeEnd(() => true);

      setTimeout(() => {
        setMovingElement(() => -1);
        if (Math.abs(deltaY) > categoryItemProperty.height / 2) {
          const movedValue = Math.floor(deltaY / categoryItemProperty.height);
          const correction = movedValue > 0 ? movedValue : movedValue + 1;

          if (adjustedCategories) {
            const newTemp = changeArrayOrder(adjustedCategories, idx, correction);

            setAdjustedCategories((prev) => {
              return newTemp;
            });
          }
        }
        
        setDeltaY(() => 0);
        setSwipeEnd(() => false);
      }, 1000);
      
    } else {
      return
    }
  }

  return (
    <div css={variableCSS({ categoryItemProperty })}>
      <div css={categoryPageWrapperCSS}>
        <div css={categoriesWrapperCSS}>
          {renderCategories}
          {renderDummy}
        </div>
      </div>
    </div>
  );
}

const variableCSS = ({
  categoryItemProperty,
}: {
  categoryItemProperty: categoryItemPropertyType;
}) => {
  return css`
    --itemHeight: ${categoryItemProperty.height}px;
  `;
};

const categoryPageWrapperCSS = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const categoriesWrapperCSS = css`
  width: 300px;
  padding: 16px;
  border: 1px solid black;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;

const dummyCSS = css`
  width: 100%;
  height: var(--itemHeight);
`;

const categoryItemWrapperCSS = css`
  border: 1px solid black;
  width: 90%;
`;

const moveHandlerCSS = ({
  idx,
  movingElement,
  deltaY,
  categoryItemProperty,
  swipeEnd,
}: {
  idx: number;
  movingElement: number;
  deltaY: number;
  categoryItemProperty: categoryItemPropertyType;
  swipeEnd: boolean;
}) => {
  //Math.abs(deltaY) > categoryItemProperty.height &&
  // const otherHandler = movingElement !== -1 && Math.abs(deltaY) > categoryItemProperty.height && idx - Math.floor(deltaY / categoryItemProperty.height) > movingElement ? `translateY(calc(100% * ${idx} + 100%))` : `translateY(calc(100% * ${idx}))`
  const minimum = Math.abs(deltaY) > categoryItemProperty.height / 2
  const nearByCondition =
  idx - Math.floor(deltaY / categoryItemProperty.height) > movingElement;
  const bottomNearBy =
    deltaY !== 0 && nearByCondition
      ? `translateY(calc(100% * ${idx}))`
      : (minimum ? `translateY(calc(100% * ${idx} - 100%))`: `translateY(calc(100% * ${idx}))`);
  const topNearBy =
    deltaY !== 0 && nearByCondition
      ? (minimum ? `translateY(calc(100% * ${idx} + 100%))` : `translateY(calc(100% * ${idx}))`)
      : `translateY(calc(100% * ${idx}))`;
  const other =
    movingElement === -1 && deltaY === 0
      ? `translateY(calc(100% * ${idx}))`
      : idx > movingElement
      ? bottomNearBy
      : topNearBy;

  const movedValue = Math.floor(deltaY / categoryItemProperty.height);
  const correction = movedValue > 0 ? movedValue : movedValue + 1;
  const current = minimum && swipeEnd
    ? `translateY(calc(100% * ${idx + correction}))`
    : `translateY(calc(100% * ${idx} + ${deltaY}px))`;
  return css`
    height: var(--itemHeight);
    position: absolute;
    transition: ${(idx !== movingElement || swipeEnd) && `transform 1s`};
    /* transition: transform 1s; */
    transform: ${idx === movingElement ? current : other};
    transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);

    /* animation: scales 1000ms ease forwards;


      @keyframes scales {
        from {
          background-color: red;
        }

        to {
          background-color: white;
        }
      } */
  `;
};

const separatorCSS = ({ idx }: { idx: number }) => {
  return css`
    /* margin: 16px 0px 16px 0px; */
    width: 100%;
    height: var(--itemHeight);
    position: absolute;
    /* transform: translateY(calc(var(--itemHeight) * ${idx})); */
    display: flex;
    align-items: center;
    /* background-color: red; */
    &:after {
      width: 100%;
      height: 3px;
      background-color: black;
      content: "";
    }
  `;
};

export default category;
