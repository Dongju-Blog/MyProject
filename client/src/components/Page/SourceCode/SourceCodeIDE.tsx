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
  useSourceCodeContext,
} from "./SourceCodeContext";
import { isEmpty } from "lodash";

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
        {initFile && <SourceCodeExplorer/>}
        
        {initFile &&
        <div css={ideWrapperCSS}>
          <SourceCodeIDETab/>
          {selectedFilesTab ? (
            <SourceCodeIDECodeBlocks />
          ) : (
            <SourceCodeIDEEmpty />
          )}
        </div>}
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
