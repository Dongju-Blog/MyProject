import React, { useEffect, useState } from "react";
import { fileTreeType } from "../useGetExtractedDir";
import { css } from "@emotion/react";
import SourceCodeExplorerList from "./SourceCodeExplorerList";
import SourceCodeExplorerListItemIcon from "./SourceCodeExplorerListItemIcon";
import { selectFileHandlerType } from "../SourceCodeIDE";
import { useRouter } from "next/router";
import { lastIndexOf } from "lodash";
import useModal from "@/components/Interface/Modal/useModal";
import SourceCodeExplorerContextMenu from "./SourceCodeExplorerContextMenu";

type SourceCodeExplorerListItemPropsType = {
  name: string;
  dir: string;
  isDir: boolean;
  fileTree: fileTreeType;
  depth: number;
  selectFileHandler: selectFileHandlerType;
  selectedFilePathIncludeName: string;
  initOpened?: boolean
};

function SourceCodeExplorerListItem({
  name,
  dir,
  isDir,
  fileTree,
  depth,
  selectFileHandler,
  selectedFilePathIncludeName,
  initOpened
}: SourceCodeExplorerListItemPropsType) {
  const [isOpened, setIsOpened] = useState<boolean>(initOpened ? initOpened : false);
  const [specifiedFolder, setSpecifiedFolder] = useState<boolean>(false)
  const contextMenuModal = useModal({transition: 'fadeIn', duration: 300, hasBackdrop: false})

  const router = useRouter();
  const { init } = router.query;
  
  useEffect(() => {
    if (isDir) {
      if (init && init.includes(dir)) {
        setIsOpened(() => true)
      }
      if (init && init === dir) {
        const params = router.query;
        delete params["init"];
        // router.push({ query: { ...params } }, undefined, { shallow: true });
      }
    } else {
      if (dir + name === init) {
        selectFileHandler({
          file: fileTree[dir]["file"][name],
          pathIncludeName: dir + name,
        });
        const params = router.query;
        delete params["init"];
        // router.push({ query: { ...params } }, undefined, { shallow: true });
      }
    }
  }, [init])

  const onClickHandler = () => {
    if (isDir) {
      setIsOpened((prev) => !prev);

    } else {
      
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

  const icon = (
    <React.Fragment>
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
    </React.Fragment>
  )

  const onContextMenuHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    contextMenuModal.open()
  }


  return (
    <React.Fragment>
      {contextMenuModal(
        <SourceCodeExplorerContextMenu icon={icon} name={name} dir={dir} isDir={isDir} openHandler={onClickHandler} />
      )}
      <div
        css={itemWrapperCSS({
          depth,
          isSelected: selectedFilePathIncludeName === dir + name,
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
    margin-left: 2px;
  `;
};

const fileIconSpaceCSS = css`
  margin-right: 13px;
`;

export default SourceCodeExplorerListItem;
