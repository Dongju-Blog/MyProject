import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import React, { ReactNode } from "react";
import { css } from "@emotion/react";

type useSourceCodeExplorerContextMenuPropsType = {
  dir: string;
  isDir: boolean;
  name: string;
  icon: ReactNode;
  openHandler: () => void;
};

function useSourceCodeExplorerContextMenu({
  dir,
  isDir,
  name,
  icon,
  openHandler,
}: useSourceCodeExplorerContextMenuPropsType) {
  const noti = useNotification();

  const copyPathHandler = (includeWebUrl = false) => {
    let currentUrl =
      window.document.location.protocol +
      window.document.location.host +
      window.document.location.pathname;
    let clipboard = "";
    if (isDir) {
      if (includeWebUrl) {
        clipboard = currentUrl + "?init=" + dir;
      } else {
        clipboard = dir;
      }
    } else {
      if (includeWebUrl) {
        clipboard = currentUrl + "?init=" + dir + name;
      } else {
        clipboard = dir + name;
      }
    }
    navigator.clipboard.writeText(clipboard).then(() => {
      if (includeWebUrl) {
        noti({
          content: (
            <NotiTemplate type={"ok"} content={"웹 주소를 복사하였습니다."} />
          ),
        });
      } else {
        noti({
          content: (
            <NotiTemplate type={"ok"} content={"경로를 복사하였습니다."} />
          ),
        });
      }
    });
  };

  const contextMenu = [
    {
      content: (
        <React.Fragment>
          {icon}
          <span>{name}</span>
        </React.Fragment>
      ),
      function: openHandler,
    },
    {
      content: (
        <React.Fragment>
          <img
            css={iconCSS}
            src={"/assets/ExplorerIcons/ContextMenu/link.svg"}
          />{" "}
          <span>경로 복사</span>
        </React.Fragment>
      ),
      function: copyPathHandler,
    },
    {
      content: (
        <React.Fragment>
          <img
            css={iconCSS}
            src={"/assets/ExplorerIcons/ContextMenu/copy.svg"}
          />{" "}
          <span>웹 주소 복사</span>
        </React.Fragment>
      ),
      function: copyPathHandler.bind(null, true),
    },
  ];

  return contextMenu;
}

const iconCSS = css`
  width: 16px;
  height: 16px;
`;

export default useSourceCodeExplorerContextMenu;
