import React, { useEffect, useState, useMemo } from "react";
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

export type selectFileHandlerType = ({
  pathIncludeName,
}: {
  pathIncludeName: string;
}) => void;

type SourceCodeIDEPropsType = {
  url: string;
  rootName: string;
};

function SourceCodeIDE({ url, rootName }: SourceCodeIDEPropsType) {
  const fileTree = useSourceCodeFileTree({
    url,
    rootName,
  });

  const router = useRouter();
  const { init } = router.query;
  const [selectedFilePathIncludeName, setSelectedFilePathIncludeName] =
    useState<string>("");

  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const [renderingIndex, setRenderingIndex] = useState<number>(-1);

  const selectFileHandler: selectFileHandlerType = ({
    pathIncludeName,
  }: {
    pathIncludeName: string;
  }) => {
    let temp = new Set();
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      newSet.add(pathIncludeName);
      temp = newSet;
      return newSet;
    });
    setRenderingIndex(() => Array.from(temp).indexOf(pathIncludeName));
  };

  // 탭 선택 시 (혹은 선택 인덱스가 변경되었을 때), 선택된 파일을 알리는 state 변경
  useEffect(() => {
    if (renderingIndex !== -1) {
      const pathIncludeName = Array.from(selectedFiles)[renderingIndex];
      setSelectedFilePathIncludeName(pathIncludeName);
    } else {
      setSelectedFilePathIncludeName('');
    }
  }, [renderingIndex]);


  return (
    <div css={wrapperCSS}>
      {fileTree.fileTree ? (
        <SourceCodeExplorer
          fileTree={fileTree.fileTree}
          selectFileHandler={selectFileHandler}
          selectedFilePathIncludeName={selectedFilePathIncludeName}
        />
      ) : (
        <Loading label={"파일 트리를 구성하는 중입니다."} />
      )}
      <div css={ideWrapperCSS}>
        {fileTree.fileTree && fileTree.fileIndexes && selectedFilePathIncludeName && (
          <SourceCodeIDETab
            fileTree={fileTree.fileTree}
            selectedFiles={selectedFiles}
            renderingIndex={renderingIndex}
            setSelectedFiles={setSelectedFiles}
            setRenderingIndex={setRenderingIndex}
          />
        )}
        {fileTree.fileTree && fileTree.fileIndexes && selectedFilePathIncludeName ? (
          <SourceCodeIDECodeBlocks
            fileTree={fileTree.fileTree}
            fileIndexes={fileTree.fileIndexes}
            selectedFiles={selectedFiles}
            renderingIndex={renderingIndex}
          />
        ) : <SourceCodeIDEEmpty/>}
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
