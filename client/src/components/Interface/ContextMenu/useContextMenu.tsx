import React, { useEffect, useState, ReactNode } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import useModal from "../Modal/useModal";

type ContextMenuRenderPropsType = {
  closeComp?: () => void;
  contextMenu: { content: string | ReactNode; function: any }[];
};

function ContextMenuRender({ closeComp, contextMenu }: ContextMenuRenderPropsType) {
  const [cursorOffset, setCursorOffset] = useState({ y: 0, x: 0 });

  const getCursorOffset = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cursorOffset.x === 0 && cursorOffset.y === 0) {
      setCursorOffset((prev) => {
        return { ...prev, y: e.clientY, x: e.clientX };
      });
    }
  };

  const closeHandler = (e: any) => {
    e.preventDefault();
    closeComp && closeComp();
  };

  const renderMenu = contextMenu.map((el) => {
    return (
      <div
        css={menuItemCSS}
        onClick={() => {
          el.function();
          closeComp && closeComp();
        }}
      >
        {el.content}
      </div>
    );
  });

  return (
    <div
      css={backdropCSS}
      onMouseEnter={getCursorOffset}
      onClick={closeHandler}
      onContextMenu={closeHandler}
    >
      <div
        css={wrapperCSS({ cursorOffset })}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {renderMenu}
      </div>
    </div>
  );
}

function useContextMenu() {
  const modal = useModal({
    transition: "fadeIn",
    duration: 300,
    hasBackdrop: false,
  });

  const contextMenu = (contextMenu: { content: string | ReactNode; function: any }[]) => {
    return (
    <React.Fragment>{modal(<ContextMenuRender contextMenu={contextMenu} />)}</React.Fragment>
    )
  }

  contextMenu.open = modal.open
  contextMenu.close = modal.close
  
  return contextMenu
}

const backdropCSS = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const wrapperCSS = ({
  cursorOffset,
}: {
  cursorOffset: { y: number; x: number };
}) => {
  return css`
    position: fixed;
    width: 200px;
    overflow: hidden;
    /* height: 100%; */
    transform: translate(${cursorOffset.x}px, ${cursorOffset.y}px);
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  `;
};

const menuItemCSS = css`
  width: 100%;
  height: 32px;
  padding: 8px;
  font-size: 13px;

  display: flex;
  gap: 6px;

  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.5s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
`;

const iconCSS = css`
  width: 16px;
  height: 16px;
`;
export default useContextMenu;
