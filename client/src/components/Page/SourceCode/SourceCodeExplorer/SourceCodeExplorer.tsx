import React, { useEffect, useRef, useState } from "react";
import SourceCodeExplorerList from "./SourceCodeExplorerList";
import { fileTreeType } from "../useGetExtractedDir";
import SourceCodeExplorerListItemIcon from "./SourceCodeExplorerListItemIcon";
import { css } from "@emotion/react";

import { selectFileHandlerType } from "../SourceCodeIDE";

import "overlayscrollbars/overlayscrollbars.css";
import {
  OverlayScrollbarsComponent,
  useOverlayScrollbars,
} from "overlayscrollbars-react";
import Swipe from "react-easy-swipe";

type SourceCodeExplorerPropsType = {
  fileTree: fileTreeType;
  selectFileHandler: selectFileHandlerType;
  selectedFilePathIncludeName: string;
};

function SourceCodeExplorer({
  fileTree,
  selectFileHandler,
  selectedFilePathIncludeName,
}: SourceCodeExplorerPropsType) {
  const root = "root/";

  const [explorerWidth, setExplorerWidth] = useState<number>(300)
  const [positionx, setPositionx] = useState<number>(0)
	const [endSwipe, setEndSwipe] = useState(true)

  const onSwipeMove = (position = { x: 0 }) => {
		setEndSwipe(false)
		if (position.x !== null) {
			const x = position.x
			setPositionx(() => x)
		}
	}

	const onSwipeEnd = () => {

    const calc = explorerWidth + positionx > 600 ? 600 : (explorerWidth + positionx < 200 ? 200 : explorerWidth + positionx)
    setExplorerWidth(() => calc)
		setPositionx(() => 0)
		setEndSwipe(true)
	}

  return (
    <div css={moveableWrapperCSS}>
      <div css={explorerWrapperCSS({explorerWidth, positionx, endSwipe})}>
        <div css={headerCSS}>EXPLORER</div>
        <div css={rootCSS}>{root}</div>
        {/* {JSON.stringify(Object.keys(fileTree)[0])} */}
        <OverlayScrollbarsComponent css={explorerInnerWrapperCSS} defer>

          <SourceCodeExplorerList
            depth={1}
            dir={root}
            fileTree={fileTree}
            selectFileHandler={selectFileHandler}
            selectedFilePathIncludeName={selectedFilePathIncludeName}
          />

          
        </OverlayScrollbarsComponent>
      </div>
      <Swipe 	
      allowMouseEvents={true}
      onSwipeStart={(event: any) => {
					event.stopPropagation()
				}}
				onSwipeEnd={onSwipeEnd}
				onSwipeMove={onSwipeMove}>
        <div css={dragHandlerCSS} />
      </Swipe>
      
    </div>
  );
}

const moveableWrapperCSS = css`
  display: flex;
  position: relative;
`;

const dragHandlerCSS = css`
  width: 6px;
  transform: translateX(-3px);
  height: 100%;
  position: absolute;
  z-index: 999;
  cursor: e-resize;
  user-select: none;
  /* background-color: rgba(0, 0, 0, 0.02); */
`;

const explorerWrapperCSS = ({explorerWidth, positionx, endSwipe}: {explorerWidth: number, positionx: number, endSwipe: boolean}) => {
  const calc = explorerWidth + positionx > 600 ? 600 : (explorerWidth + positionx < 200 ? 200 : explorerWidth + positionx)

  
  return css`
  background-color: rgba(250, 250, 250, 1);
  width: ${endSwipe ? explorerWidth : calc}px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;
}

const explorerInnerWrapperCSS = css`
  width: 100%;

`;

const headerCSS = css`
  padding: 16px 24px 16px 24px;
  color: rgba(0, 0, 0, 0.6);
`;

const rootCSS = css`
  font-weight: 700;
  padding: 0px 0px 6px 16px;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default SourceCodeExplorer;
