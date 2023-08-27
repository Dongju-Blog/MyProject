import React from "react";
import { fileTreeType } from "../useGetExtractedDir";
import SourceCodeExplorerListItem from "./SourceCodeExplorerListItem";
import { selectFileHandlerType } from "../SourceCodeIDE";
import { css } from "@emotion/react";

type SourceCodeExplorerListPropsType = {
  depth: number;
  dir: string;
  fileTree: fileTreeType;
  selectFileHandler: selectFileHandlerType;
  selectedFilePathIncludeName: string;
};
function SourceCodeExplorerList({
  depth,
  dir,
  fileTree,
  selectFileHandler,
  selectedFilePathIncludeName,
}: SourceCodeExplorerListPropsType) {
  const renderDir =
    fileTree[dir] &&
    fileTree[dir]["dir"].map((el) => {
      const splitted = el.split("/");
      const name = splitted[splitted.length - 2];
      return (
        <SourceCodeExplorerListItem
          name={name}
          dir={el}
          isDir={true}
          fileTree={fileTree}
          depth={depth}
          selectFileHandler={selectFileHandler}
          selectedFilePathIncludeName={selectedFilePathIncludeName}
        />
      );
    });

  const renderFile =
    fileTree[dir] &&
    Object.keys(fileTree[dir]["file"]).map((el) => {
      return (
        <SourceCodeExplorerListItem
          name={el}
          dir={dir}
          isDir={false}
          fileTree={fileTree}
          depth={depth}
          selectFileHandler={selectFileHandler}
          selectedFilePathIncludeName={selectedFilePathIncludeName}
        />
      );
    });

  return (
    <div css={wrapperCSS}>
      <div className={"separator"} css={lineCSS({depth})}/>
      {renderDir}
      {renderFile}
    </div>
  );
}

const wrapperCSS = css`
  position: relative;
  display: grid;
  &:hover {
    .separator {
      opacity: 100%;
    } 
    
  }
`

const lineCSS = ({depth}: {depth: number}) => {
  return css`
  position: absolute;
  width: 1px;
  height: 100%;
  transform: translateX(${(depth - 1) * 8}px);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 99;

  opacity: 0;
  transition-property: opacity;
  transition-duration: 1s;

  
`
}

export default SourceCodeExplorerList;
