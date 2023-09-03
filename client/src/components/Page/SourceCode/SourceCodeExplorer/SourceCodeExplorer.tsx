import React, { useState } from "react";
import SourceCodeExplorerList from "./SourceCodeExplorerList";
import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { codeBlockExplorerOption } from "@/store/store";

import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Swipe from "react-easy-swipe";
import CheckBox from "@/components/Interface/CheckBox/CheckBox";

function SourceCodeExplorer() {
  const root = "root/";
  const [explorerWidth, setExplorerWidth] = useState<number>(300);
  const [positionx, setPositionx] = useState<number>(0);
  const [endSwipe, setEndSwipe] = useState(true);
  const [codeBlockExplorerOptionAtom, setCodeBlockExplorerOptionAtom] = useAtom(
    codeBlockExplorerOption
  );

  const onSwipeMove = (position = { x: 0 }) => {
    setEndSwipe(false);
    if (position.x !== null) {
      const x = position.x;
      setPositionx(() => x);
    }
  };

  const onSwipeEnd = () => {
    const calc =
      explorerWidth + positionx > 600
        ? 600
        : explorerWidth + positionx < 250
        ? 250
        : explorerWidth + positionx;
    setExplorerWidth(() => calc);
    setPositionx(() => 0);
    setEndSwipe(true);
  };

  const optionCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCodeBlockExplorerOptionAtom((prev) => {
        return { ...prev, unfoldAuto: true };
      });
    } else {
      setCodeBlockExplorerOptionAtom((prev) => {
        return { ...prev, unfoldAuto: false };
      });
    }
  };

  return (
    <div css={moveableWrapperCSS}>
      <div css={explorerWrapperCSS({ explorerWidth, positionx, endSwipe })}>
        <div css={headerCSS}>
        <div css={headerTitleCSS}>EXPLORER</div>
        <div css={rootCSS}>
          <span>{root}</span>{" "}
          <CheckBox
            checked={codeBlockExplorerOptionAtom.unfoldAuto}
            onChange={optionCheckHandler}
            theme={"default"}
          >
            <CheckBox.Left>
              <span
                css={css`
                  margin-right: 8px;
                  font-size: 14px;
                  font-weight: 500;
                `}
              >
                유효한 경로 자동 탐색
              </span>
            </CheckBox.Left>
          </CheckBox>
        </div>
        </div>
        
        {/* {JSON.stringify(Object.keys(fileTree)[0])} */}
        <OverlayScrollbarsComponent css={explorerInnerWrapperCSS} defer>
          <SourceCodeExplorerList depth={1} dir={root} />
        </OverlayScrollbarsComponent>
      </div>
      <Swipe
        allowMouseEvents={true}
        onSwipeStart={(event: any) => {
          event.stopPropagation();
        }}
        onSwipeEnd={onSwipeEnd}
        onSwipeMove={onSwipeMove}
      >
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

const explorerWrapperCSS = ({
  explorerWidth,
  positionx,
  endSwipe,
}: {
  explorerWidth: number;
  positionx: number;
  endSwipe: boolean;
}) => {
  const calc =
    explorerWidth + positionx > 600
      ? 600
      : explorerWidth + positionx < 250
      ? 250
      : explorerWidth + positionx;

  return css`
    background-color: rgba(250, 250, 250, 1);
    width: ${endSwipe ? explorerWidth : calc}px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  `;
};

const explorerInnerWrapperCSS = css`
  width: 100%;
  flex: 1;
`;

const headerCSS = css`
  height: var(--source-code-header-height);
  max-height: var(--source-code-header-height);
  /* background-color: red; */
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow:hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const headerTitleCSS = css`
  /* padding: 12px 16px 12px 16px; */
  color: rgba(0, 0, 0, 0.6);

  /* display: flex;
  justify-content: space-between; */
`;

const rootCSS = css`
  font-weight: 700;
  /* padding: 0px 8px 6px 16px; */
  color: rgba(0, 0, 0, 0.6);
  
  display: flex;
  justify-content: space-between;
`;

export default SourceCodeExplorer;
