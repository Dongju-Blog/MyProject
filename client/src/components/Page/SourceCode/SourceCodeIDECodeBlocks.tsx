import React, { useMemo } from "react";
import { fileIndexesType, fileTreeType, useSourceCodeContext } from "./SourceCodeContext";
import SourceCodeIDECodeBlocksItem from "./SourceCodeIDECodeBlocksItem";
import { css } from "@emotion/react";



function SourceCodeIDECodeBlocks() {
  const {
    fileTree,
    fileContents,
    selectedFilesTab,
    selectedFileIndex,
  } = useSourceCodeContext();



  // const setSelectedFileNameIncludePath = useSourceCodeContext('setSelectedFileNameIncludePath')
  // const selectedFileNameIncludePath = useSourceCodeContext('selectedFileNameIncludePath')
  // const selectFileHandler = useSourceCodeContext('selectFileHandler')

  const renderCodeBlock = Array.from(selectedFilesTab).map((pathIncludeName, idx) => {
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
        
        if (fileContents) {
          return (
            <div
              key={`ide-${pathIncludeName}`}
              css={ideItemWrapperCSS({ selectedFileIndex, currentIndex: idx })}
            >
              <SourceCodeIDECodeBlocksItem
                language={type}
                file={fileContents[pathIncludeName]}
              />
            </div>
          );
        }
      })

  return <React.Fragment>{renderCodeBlock}</React.Fragment>;
}

const ideItemWrapperCSS = ({
  selectedFileIndex,
  currentIndex,
}: {
  selectedFileIndex: number;
  currentIndex: number;
}) => {
  return css`
    display: ${selectedFileIndex === currentIndex ? "block" : "none"};
    overflow: hidden;
  `;
};

export default SourceCodeIDECodeBlocks;
