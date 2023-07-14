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

type elementPropertyType = {
  height: number;
};

type CategoryDragAndDropPropsType = {
  categories: getAllBoardResponseType
}

function CategoryDragAndDrop({categories}: CategoryDragAndDropPropsType) {
  const elementProperty: elementPropertyType = {
    height: 46,
  };






  const [movingElement, setMovingElement] = useState(-1);
  const [deltaY, setDeltaY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(-1)

  const [orders, setOrders] = useState<number[]>([]);

  useEffect(() => {
    if (categories) {
      const temp: number[] = [];
      let idx = 0;
      let initSeparate = false;
      for (let category of categories) {
        if (category.viewOrder === null) {
          if (!initSeparate) {
            temp.push(-1);
            initSeparate = true;
          }
          temp.push(categories[idx].id);
        } else {
          temp.push(categories[idx].id);
        }
        idx += 1;
      }
      console.log(categories, temp)
      setOrders(() => temp);
    }
  }, [categories]);

  const renderCategories = categories?.map((el, idx) => {


    return (
      <Swipe
        key={`item-${el.id}`}
        onSwipeStart={(e) => {
          onSwipeStart(e, orders.indexOf(el.id), el.id);
        }}
        onSwipeMove={(p, e) => {
          onSwipeMove(p, e, orders.indexOf(el.id));
        }}
        onSwipeEnd={(e) => {
          onSwipeEnd(e, orders.indexOf(el.id));
        }}
        allowMouseEvents={true}

        css={[
          categoryItemWrapperCSS,
          moveHandlerCSS({
            idx: orders.indexOf(el.id), id: el.id, movingElement, deltaY, elementProperty, isTransitioning
          }),
        ]}
      >
        <div css={itemInnerWrapperCSS}>{el.name}</div>
      </Swipe>
    );
  });


  const renderDummy = orders?.map((el, idx) => {
    return <div css={dummyCSS} />;
  });

  const renderSeparator = (<Swipe
    key={`item-separator`}
    onSwipeStart={(e) => {
      onSwipeStart(e, orders.indexOf(-1), -1);
    }}
    onSwipeMove={(p, e) => {
      onSwipeMove(p, e, orders.indexOf(-1));
    }}
    onSwipeEnd={(e) => {
      onSwipeEnd(e, orders.indexOf(-1));
    }}
    allowMouseEvents={true}

    css={[
      separatorCSS,
      moveHandlerCSS({
        idx: orders.indexOf(-1), id: -1, movingElement, deltaY, elementProperty, isTransitioning
      }),
    ]}
  ><span css={css`font-size: 12px; color: rgba(0, 0, 0, 0.4); margin-top: 8px;`}>아래의 카테고리들은 숨김 항목입니다.</span><div  /></Swipe>)

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

  function onSwipeStart(event: SwipeEvent, idx: number, id: number) {
      setMovingElement(() => idx);
      setIsTransitioning(() => id)
  }

  function onSwipeMove(
    position: SwipePosition,
    event: SwipeEvent,
    idx: number
  ) {
    setDeltaY(() => position.y);

   
  }

  function onSwipeEnd(event: SwipeEvent, idx: number) {
    setMovingElement(() => -1);
    setDeltaY(() => 0);
    

    if (Math.abs(deltaY) > elementProperty.height / 2) {
      const movedValue = Math.floor(deltaY / elementProperty.height);
      const correction = movedValue > 0 ? movedValue : movedValue + 1;

      if (orders && idx + correction >= 0 && idx + correction < orders.length) {
        const newTemp = changeArrayOrder(orders, idx, correction);
        console.log(newTemp)
        setOrders((prev) => {
          return newTemp;
        });
      }
    }
 
  }

  return (
    <div css={variableCSS({elementProperty})}>
      <div css={categoryPageWrapperCSS}>
        <div css={categoriesWrapperCSS}>
          {renderCategories}
          {renderSeparator}
          {renderDummy}

        </div>
      </div>
    </div>
  )


}

const variableCSS = ({
  elementProperty,
}: {
  elementProperty: elementPropertyType;
}) => {
  return css`
    width: 100%;
    height: 100%;
    --itemHeight: ${elementProperty.height}px;
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
  /* padding: 16px; */
  
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  box-shadow: 0px 0px 30px 1px rgba(0, 0, 0, 0.05);
  padding: 2px 0px 2px 0px;

`;


const dummyCSS = css`
  width: 100%;
  height: var(--itemHeight);
`;

const categoryItemWrapperCSS = css`
  width: 100%;
  
  padding: 2px 4px 2px 4px;

`;

const itemInnerWrapperCSS = css`
  background-color: #ecf0ff;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`


const separatorCSS = () => {
  return css`
    /* margin: 16px 0px 16px 0px; */
    width: 100%;
    height: var(--itemHeight);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* background-color: red; */
    &:before {
      width: 100%;
      height: 2px;
      background-color: rgba(0, 0, 0, 0.3);
      content: "";
    }
  `;
};





const moveHandlerCSS = ({
  idx,
  id,
  movingElement,
  deltaY,
  elementProperty,
  isTransitioning
}: {
  idx: number;
  id: number;
  movingElement: number;
  deltaY: number;
  elementProperty: elementPropertyType;
  isTransitioning: number
}) => {
  const nearByCondition =
  idx - Math.floor(deltaY / elementProperty.height) > movingElement;
  const bottomNearBy =
    deltaY !== 0 && nearByCondition
      ? `translateY(calc(100% * ${idx}))`
      : `translateY(calc(100% * ${idx} - 100%))`;
  const topNearBy =
    deltaY !== 0 && nearByCondition
      ? `translateY(calc(100% * ${idx} + 100%))`
      : `translateY(calc(100% * ${idx}))`;
  const other =
    movingElement === -1 && deltaY === 0
      ? `translateY(calc(100% * ${idx}))`
      : idx > movingElement
      ? bottomNearBy
      : topNearBy;

  const current = `translateY(calc(100% * ${idx} + ${deltaY}px)) scale3d(1.1, 1.1, 0.3) `

  return css`
    height: var(--itemHeight);
    position: absolute;
    /* transition: ${idx !== movingElement && `transform 1s, box-shadow 1s`}; */
    transition-property: ${(idx !== movingElement || deltaY === 0) && 'transform box-shadow'};
    transition-duration: ${(idx !== movingElement || deltaY === 0) && '1s'};
    /* transition: transform 1s; */
    transform: ${idx === movingElement ? current : other};
    transition-timing-function: cubic-bezier(0.5, 0.25, 0, 1);
    z-index: ${(isTransitioning === id) && '99'};

    & div {
      transition-property: ${(idx !== movingElement || deltaY === 0) && 'transform box-shadow'};
      transition-duration: ${(idx !== movingElement || deltaY === 0) && '1s'};
      box-shadow: ${idx === movingElement && '0px 0px 50px 1px rgba(0, 0, 0, 0.3)'};
    }
    
    cursor: pointer;
  `;
};

export default CategoryDragAndDrop;
