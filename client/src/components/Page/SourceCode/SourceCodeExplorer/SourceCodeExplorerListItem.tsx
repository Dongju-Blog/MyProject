import React, { useEffect, useState } from "react";
import { useSourceCodeContext } from "../SourceCodeContext";
import { css } from "@emotion/react";
import SourceCodeExplorerList from "./SourceCodeExplorerList";
import SourceCodeExplorerListItemIcon from "./SourceCodeExplorerListItemIcon";
import { useRouter } from "next/router";
import useContextMenu from "@/components/Interface/ContextMenu/useContextMenu";
import useSourceCodeExplorerContextMenu from "./useSourceCodeExplorerContextMenu";
import { useAtom } from "jotai";
import { codeBlockExplorerOption } from "@/store/store";

type SourceCodeExplorerListItemPropsType = {
  name: string;
  dir: string;
  isDir: boolean;
  depth: number;
  initOpened?: boolean;
};

function SourceCodeExplorerListItem({
  name,
  dir,
  isDir,
  depth,
  initOpened,
}: SourceCodeExplorerListItemPropsType) {
  const {
    fileTree,
    fileContents,
    selectedFileNameIncludePath,
    selectFileHandler,
  } = useSourceCodeContext();

  const [isOpened, setIsOpened] = useState<boolean>(
    initOpened ? initOpened : false
  );
  const [specifiedFolder, setSpecifiedFolder] = useState<boolean>(false);
  const contextMenu = useContextMenu();
  const [codeBlockExplorerOptionAtom, setCodeBlockExplorerOptionAtom] = useAtom(
    codeBlockExplorerOption
  );

  const router = useRouter();
  const { init } = router.query;

  useEffect(() => {
    if (isDir) {
      if (codeBlockExplorerOptionAtom.unfoldAuto) {
        const splitted = dir.split("/");
        const prevDir = splitted.slice(0, splitted.length - 2).join("/") + "/";
        if (
          fileTree[prevDir] &&
          fileTree[prevDir]["file"].length === 0 &&
          fileTree[prevDir]["dir"].length === 1
        ) {
          setIsOpened(() => true);
        }
      }
      if (init && init.includes(dir)) {
        setIsOpened(() => true);
      }
    } else {
      if (dir + name === init) {
        selectFileHandler({
          pathIncludeName: dir + name,
        });
      }
    }
  }, [init]);

  const onClickHandler = () => {
    if (isDir) {
      setIsOpened((prev) => !prev);
    } else {
      router.push({ query: { ...router.query, init: dir + name } }, undefined, {
        shallow: true,
      });
    }
  };

  const defaultSrc = isOpened
    ? `/assets/ExplorerIcons/folder-default-open.svg`
    : `/assets/ExplorerIcons/folder-default.svg`;
  const specificSrc = isOpened
    ? `/assets/ExplorerIcons/folder-${name}-open.svg`
    : `/assets/ExplorerIcons/folder-${name}.svg`;

  const icon = (
    <React.Fragment>
      {isDir ? (
        <React.Fragment>
          <img css={iconCSS({ render: !specifiedFolder })} src={defaultSrc} />
          <img
            css={iconCSS({ render: specifiedFolder })}
            src={specificSrc}
            onLoad={() => {
              setSpecifiedFolder(() => true);
            }}
          />
        </React.Fragment>
      ) : (
        <SourceCodeExplorerListItemIcon
          css={iconCSS({ render: true })}
          name={name}
        />
      )}
    </React.Fragment>
  );

  const onContextMenuHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    contextMenu.open();
    // contextMenuModal.open();
  };

  const explorerContextMenu = useSourceCodeExplorerContextMenu({
    dir: dir,
    isDir: isDir,
    name: name,
    icon: icon,
    openHandler: onClickHandler,
  });

  return (
    <React.Fragment>
      {contextMenu(explorerContextMenu)}
      <div
        css={itemWrapperCSS({
          depth,
          isSelected: selectedFileNameIncludePath === dir + name,
        })}
        onClick={onClickHandler}
        onContextMenu={onContextMenuHandler}
      >
        {isDir ? (
          <img
            css={bracketImgCSS({ isOpened, bracketSize: "6px" })}
            src={"/assets/bracket.png"}
          />
        ) : (
          <div css={fileIconSpaceCSS} />
        )}
        {icon}
        {name}
      </div>
      {isOpened && isDir && (
        <SourceCodeExplorerList depth={depth + 1} dir={dir} />
      )}
    </React.Fragment>
  );
}

const itemWrapperCSS = ({
  depth,
  isSelected,
}: {
  depth: number;
  isSelected: boolean;
}) => {
  return css`
    /* min-width: 100%; */
    background-color: ${isSelected
      ? `rgba(230, 230, 230, 1)`
      : `rgba(250, 250, 250, 1)`};
    padding: 3px;
    padding-left: ${depth * 8}px;
    font-size: 13px;

    display: flex;
    align-items: center;
    gap: 6px;

    cursor: pointer;
    transition-property: background-color;
    transition-duration: 1s;
    user-select: none;

    &:hover {
      background-color: rgba(240, 240, 240, 1);
    }
  `;
};

const iconCSS = ({ render }: { render: boolean }) => {
  return css`
    display: ${render ? "block" : "none"};
    width: 18px;
    height: 18px;
  `;
};

const bracketImgCSS = ({
  isOpened,
  bracketSize,
}: {
  isOpened: boolean;
  bracketSize: string;
}) => {
  return css`
    transition-property: transform;
    transition-duration: 0.4s;
    width: auto;
    /* height: 18px; */
    height: ${bracketSize};
    transform: ${isOpened ? "rotate( 0deg )" : "rotate( -90deg )"};
    margin-left: 2px;
  `;
};

const fileIconSpaceCSS = css`
  margin-right: 13px;
`;

export default SourceCodeExplorerListItem;
