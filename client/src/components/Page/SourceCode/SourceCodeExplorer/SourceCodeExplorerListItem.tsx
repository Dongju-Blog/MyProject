import React, { useState } from "react";
import { fileTreeType } from "../useGetExtractedDir";
import { css } from "@emotion/react";
import SourceCodeExplorerList from "./SourceCodeExplorerList";
import SourceCodeExplorerListItemIcon from "./SourceCodeExplorerListItemIcon";
import { selectFileHandlerType } from "../SourceCodeIDE";

type SourceCodeExplorerListItemPropsType = {
  name: string;
  dir: string;
  isDir: boolean;
  fileTree: fileTreeType;
  depth: number;
  selectFileHandler: selectFileHandlerType;
  selectedFilePathIncludeName: string;
};

function SourceCodeExplorerListItem({
  name,
  dir,
  isDir,
  fileTree,
  depth,
  selectFileHandler,
  selectedFilePathIncludeName,
}: SourceCodeExplorerListItemPropsType) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [specifiedFolder, setSpecifiedFolder] = useState<boolean>(false)

  const onClickHandler = () => {
    if (isDir) {
      setIsOpened((prev) => !prev);
    } else {
      const splitted = name.split(".");
      selectFileHandler({
        file: fileTree[dir].file[name],
        pathIncludeName: dir + name,
      });
    }
  };

  const defaultSrc = isOpened
    ? `/assets/ExplorerIcons/folder-default-open.svg`
    : `/assets/ExplorerIcons/folder-default.svg`;
  const specificSrc = isOpened
    ? `/assets/ExplorerIcons/folder-${name}-open.svg`
    : `/assets/ExplorerIcons/folder-${name}.svg`;

  return (
    <React.Fragment>
      <div
        css={itemWrapperCSS({
          depth,
          isSelected: selectedFilePathIncludeName === dir + name,
        })}
        onClick={onClickHandler}
      >
        {isDir ? (
          <img
            css={bracketImgCSS({ isOpened, bracketSize: "6px" })}
            src={"/assets/bracket.png"}
          />
        ) : (
          <div css={fileIconSpaceCSS} />
        )}
        {isDir ? (
          <React.Fragment>
            <img
              css={iconCSS({render: !specifiedFolder})}
              src={defaultSrc}
              
            />
            <img
              css={iconCSS({render: specifiedFolder})}
              src={specificSrc}
              onLoad={() => {setSpecifiedFolder(() => true)}}
              
            />
          </React.Fragment>
          
        ) : (
          <SourceCodeExplorerListItemIcon css={iconCSS({render: true})} name={name} />
        )}
        {name}
      </div>
      {isOpened && isDir && (
        <SourceCodeExplorerList
          depth={depth + 1}
          dir={dir}
          fileTree={fileTree}
          selectFileHandler={selectFileHandler}
          selectedFilePathIncludeName={selectedFilePathIncludeName}
        />
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
    width: 100%;
    background-color: ${isSelected
      ? `rgba(230, 230, 230, 1)`
      : `rgba(250, 250, 250, 1)`};
    padding: 3px;
    padding-left: ${depth * 6}px;
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

const iconCSS = ({render}: {render: boolean}) => {
  return css`
    display: ${render ? 'block': 'none'};
    width: 18px;
    height: 18px;
  `;
} 

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
    margin-left: 10px;
  `;
};

const fileIconSpaceCSS = css`
  margin-right: 21px;
`;

export default SourceCodeExplorerListItem;
