import React from "react";
import { fileTreeType } from "../useGetExtractedDir";
import SourceCodeExplorerListItem from "./SourceCodeExplorerListItem";
import { selectFileHandlerType } from "../SourceCodeIDE";

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
    <div>
      {renderDir}
      {renderFile}
    </div>
  );
}

export default SourceCodeExplorerList;
