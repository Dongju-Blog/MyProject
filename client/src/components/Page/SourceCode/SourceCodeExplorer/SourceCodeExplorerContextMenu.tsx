import React, { useEffect, useState, ReactNode } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";

type SourceCodeExplorerContextMenuPropsType = {
  closeComp?: () => void;
  icon: ReactNode;
  name: string;
  dir: string;
  isDir: boolean
  openHandler: () => void
};

function SourceCodeExplorerContextMenu({
  closeComp,
  icon,
  name,
  dir,
  isDir,
  openHandler
}: SourceCodeExplorerContextMenuPropsType) {
  const [cursorOffset, setCursorOffset] = useState({ y: 0, x: 0 });
  const noti = useNotification()

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

  const copyPathHandler = (includeWebUrl = false) => {
    let currentUrl = window.document.location.host + window.document.location.pathname
    let clipboard = ''
    if (isDir) {
      if (includeWebUrl) {
        clipboard = currentUrl + '?init=' + dir
      } else {
        clipboard = dir
      }
      
    } else {
      if (includeWebUrl) {
        clipboard = currentUrl + '?init=' + dir + name
      } else {
        clipboard = dir + name
      }
      
    }
    navigator.clipboard.writeText(clipboard)
        .then(() => {
          if (includeWebUrl) {
            noti({content: <NotiTemplate type={"ok"} content={"웹 주소를 복사하였습니다."}/>})
          } else {
            noti({content: <NotiTemplate type={"ok"} content={"경로를 복사하였습니다."}/>})
          }
        
    })
  }

  const menu = [
    {
      content: (
        <React.Fragment>
          {icon}
          {name}
        </React.Fragment>
      ),
      function: openHandler,
    },
    { content: (<React.Fragment><img css={iconCSS} src={"/assets/ExplorerIcons/ContextMenu/link.svg"}/> 경로 복사</React.Fragment>), function: copyPathHandler },
    { content: (<React.Fragment><img css={iconCSS} src={"/assets/ExplorerIcons/ContextMenu/copy.svg"}/> 웹 주소 복사</React.Fragment>), function: copyPathHandler.bind(null, true) },
  ];

  const renderMenu = menu.map((el) => {
    return <div css={menuItemCSS} onClick={() => {el.function(); closeComp && closeComp();}}>{el.content}</div>;
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
`
export default SourceCodeExplorerContextMenu;
