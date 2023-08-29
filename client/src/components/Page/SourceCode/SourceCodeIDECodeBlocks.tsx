import React, { useMemo } from "react";
import { fileIndexesType, fileTreeType } from "./useSourceCodeFileTree";
import SourceCodeIDECodeBlocksItem from "./SourceCodeIDECodeBlocksItem";
import { css } from "@emotion/react";

type SourceCodeIDECodeBlocksPropsType = {
  fileTree: fileTreeType;
  fileIndexes: fileIndexesType
  selectedFiles: Set<string>;
  renderingIndex: number;
};

function SourceCodeIDECodeBlocks({
  fileTree,
  fileIndexes,
  selectedFiles,
  renderingIndex,
}: SourceCodeIDECodeBlocksPropsType) {
  const renderCodeBlock = useMemo(
    () =>
      Array.from(selectedFiles).map((pathIncludeName, idx) => {
        const splitIndex = pathIncludeName.lastIndexOf("/") + 1;
        const path = pathIncludeName.substring(0, splitIndex);

        const filename = pathIncludeName.substring(
          splitIndex,
          pathIncludeName.length
        );
        const type = filename.substring(
          filename.lastIndexOf(".") + 1,
          filename.length
        );

        if (fileTree) {
          return (
            <div
              key={`ide-${pathIncludeName}`}
              css={ideItemWrapperCSS({ renderingIndex, currentIndex: idx })}
            >
              <SourceCodeIDECodeBlocksItem
                fileIndexes={fileIndexes}
                language={type}
                file={fileTree[path]["file"][filename]}
              />
            </div>
          );
        }
      }),
    [selectedFiles, renderingIndex]
  );

  return <React.Fragment>{renderCodeBlock}</React.Fragment>;
}

const ideItemWrapperCSS = ({
  renderingIndex,
  currentIndex,
}: {
  renderingIndex: number;
  currentIndex: number;
}) => {
  return css`
    display: ${renderingIndex === currentIndex ? "block" : "none"};
    overflow: hidden;
  `;
};

export default SourceCodeIDECodeBlocks;
