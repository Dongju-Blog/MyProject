import React, { useEffect, useState, useMemo, useContext } from "react";
import JSZip from "jszip";
import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import { getFileAPI } from "@/api/playground/getFileAPI";
import useSourceCodeFileTree from "@/components/Page/SourceCode/useSourceCodeFileTree";

import SourceCodeExplorer from "@/components/Page/SourceCode/SourceCodeExplorer/SourceCodeExplorer";
import { css } from "@emotion/react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Loading from "@/components/Interface/Loading/Loading";
import SourceCodeExplorerListItemIcon from "./SourceCodeExplorer/SourceCodeExplorerListItemIcon";
// import SourceCodeIDEProcess from "./backup/SourceCodeIDECodeBlocksMapProcess";
import { useRouter } from "next/router";
import SourceCodeIDETab from "./SourceCodeIDETab";
import SourceCodeIDECodeBlocksItem from "./SourceCodeIDECodeBlocksItem";
import SourceCodeIDECodeBlocks from "./SourceCodeIDECodeBlocks";
import SourceCodeIDEEmpty from "./SourceCodeIDEEmpty";
import {
  SourceCodeContextProvider,
  useSourceCodeContext,
} from "./SourceCodeContext";

// export type selectFileHandlerType = ({
//   pathIncludeName,
// }: {
//   pathIncludeName: string;
// }) => void;

type SourceCodeIDEPropsType = {
  url: string;
  rootName: string;
};

function SourceCodeIDE({ url, rootName }: SourceCodeIDEPropsType) {
  useSourceCodeFileTree({
    url,
    rootName,
  });

  const {
    fileTree,
    fileIndexes,
    selectedFilesTab,
    selectedFileIndex,
    selectedFileNameIncludePath,
    setSelectedFileNameIncludePath,
  } = useSourceCodeContext();

  // const selectFileHandler: selectFileHandlerType = ({
  //   pathIncludeName,
  // }: {
  //   pathIncludeName: string;
  // }) => {
  //   let temp = new Set();
  //   setSelectedFilesTab((prev) => {
  //     const newSet = new Set(prev);
  //     newSet.add(pathIncludeName);
  //     temp = newSet;
  //     return newSet;
  //   });
  //   setSelectedFileIndex(() => Array.from(temp).indexOf(pathIncludeName));
  // };

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
      {fileTree && fileIndexes ? (
        <SourceCodeExplorer/>
      ) : (
        <Loading label={"파일 트리를 구성하는 중입니다."} />
      )}
      <div css={ideWrapperCSS}>
        {fileTree &&
          fileIndexes &&
          selectedFileNameIncludePath && (
            <SourceCodeIDETab/>
          )}
        {fileTree &&
        fileIndexes &&
        selectedFileNameIncludePath ? (
          <SourceCodeIDECodeBlocks/>
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
