import React, { useEffect } from "react";
import useSourceCodeFileTree from "@/components/Page/SourceCode/useSourceCodeFileTree";
import SourceCodeExplorer from "@/components/Page/SourceCode/SourceCodeExplorer/SourceCodeExplorer";
import { css } from "@emotion/react";
import SourceCodeIDETab from "./SourceCodeIDETab";
import SourceCodeIDECodeBlocks from "./SourceCodeIDECodeBlocks";
import SourceCodeIDEEmpty from "./SourceCodeIDEEmpty";
import { useSourceCodeContext } from "./SourceCodeContext";
import SourceCodeHeader from "./SourceCodeHeader";
import { UseQueryResult } from "@tanstack/react-query";
import { getSourceCodeResponseType } from "@/types/board";

type SourceCodeIDEPropsType = {
  url: string;
  rootName: string;
};

function SourceCodeIDE({ url, rootName }: SourceCodeIDEPropsType) {
  const initFile = useSourceCodeFileTree({
    url,
    rootName,
  });

  const {
    fileTree,
    fileIndexes,
    fileContents,
    selectedFilesTab,
    selectedFileIndex,
    selectedFileNameIncludePath,
    setSelectedFileNameIncludePath,
  } = useSourceCodeContext();

  // 탭 선택 시 (혹은 선택 인덱스가 변경되었을 때), 선택된 파일을 알리는 state 변경
  useEffect(() => {
    if (selectedFileIndex !== -1) {
      const pathIncludeName = Array.from(selectedFilesTab)[selectedFileIndex];
      setSelectedFileNameIncludePath(pathIncludeName);
    } else {
      setSelectedFileNameIncludePath("");
    }
  }, [selectedFileIndex]);

  return (
    <div css={wrapperCSS}>
      {initFile && <SourceCodeExplorer />}


      <div css={ideWrapperCSS}>
        <SourceCodeIDETab />
        {selectedFileNameIncludePath ? (
          <SourceCodeIDECodeBlocks />
        ) : (
          <SourceCodeIDEEmpty />
        )}
      </div>
   
    </div>
  );
}

const wrapperCSS = css`
  flex: 1;
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const ideWrapperCSS = css`
  flex: 1;
  display: grid;
`;

export default SourceCodeIDE;
