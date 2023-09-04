import React, { useMemo } from "react";
import { useSourceCodeContext } from "./SourceCodeContext";
import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import SourceCodeIDECodeBlocksItem from "@/components/Page/SourceCode/SourceCodeIDECodeBlocksItem";
// const SourceCodeIDECodeBlocksItem = dynamic(
//   () => import("@/components/Page/SourceCode/SourceCodeIDECodeBlocksItem"),
//   { ssr: false }
// );

function SourceCodeIDECodeBlocks() {
  const { fileContents, selectedFilesTab, selectedFileIndex } =
    useSourceCodeContext();

  const renderCodeBlock = useMemo(
    () =>
      Array.from(selectedFilesTab).map((pathIncludeName, idx) => {
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

        const content = fileContents.get(pathIncludeName);

        if (content) {
          return (
            <div
              key={`ide-${pathIncludeName}`}
              css={ideItemWrapperCSS({ selectedFileIndex, currentIndex: idx })}
            >
              <SourceCodeIDECodeBlocksItem language={type} content={content} />
            </div>
          );
        }
      }),
    [selectedFilesTab, selectedFileIndex, fileContents]
  );

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
