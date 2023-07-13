import React, { useState, useEffect } from "react";
import { getAllBoardAPI } from "@/api/board/getAllBoardAPI";
import { getAllBoardResponseType } from "@/types/board";
import { useQuery } from "@tanstack/react-query";
import { css } from "@emotion/react";
import Swipe, { SwipeEvent, SwipePosition } from "react-easy-swipe";

function category() {
  const categories = useQuery<getAllBoardResponseType>(
    ["boards"],
    getAllBoardAPI
  );

  const [adjustedCategories, setAdjustedCategories] =
    useState<getAllBoardResponseType>();

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

  const renderCategories = adjustedCategories?.map((el) => {
    if (el.viewOrder === -1) {
      return <div css={separatorCSS} />;
    } else {
      return <div css={categoryItemWrapperCSS}>{el.name}</div>;
    }
  });

  function onSwipeStart(event: SwipeEvent) {
    console.log("Start swiping...", event);
  }

  function onSwipeMove(position: SwipePosition, event: SwipeEvent) {
    console.log(`Moved ${position.x} pixels horizontally`, event);
    console.log(`Moved ${position.y} pixels vertically`, event);
  }

  function onSwipeEnd(event: SwipeEvent) {
    console.log("End swiping...", event);
  }

  return (
    <div css={categoryPageWrapperCSS}>
      <Swipe
        onSwipeStart={onSwipeStart}
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}
        allowMouseEvents={true}
      >
        <div css={categoriesWrapperCSS}>{renderCategories}</div>
      </Swipe>
    </div>
  );
}

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
`;

const categoryItemWrapperCSS = css`
  border: 1px solid black;
  width: 100%;
  height: 64px;
`;

const separatorCSS = css`
  margin: 16px 0px 16px 0px;
  width: 100%;
  height: 3px;
  background-color: black;
`;

export default category;
