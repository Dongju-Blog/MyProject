import React, { useEffect, useState, useMemo } from "react";
import JSZip from "jszip";
import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import { getFileAPI } from "@/api/playground/getFileAPI";
import useGetExtractedDir from "@/components/Page/SourceCode/useGetExtractedDir";

import SourceCodeExplorer from "@/components/Page/SourceCode/SourceCodeExplorer/SourceCodeExplorer";
import { css } from "@emotion/react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Loading from "@/components/Interface/Loading/Loading";
import SourceCodeIDECodeBlock, { ideIndicatorCSS } from "./SourceCodeIDEProcessCodeBlock";
import SourceCodeExplorerListItemIcon from "./SourceCodeExplorer/SourceCodeExplorerListItemIcon";
import SourceCodeIDEProcess from "./SourceCodeIDEProcess";



export type selectFileHandlerType = ({file}: {file: Blob; pathIncludeName: string}) => void

type SourceCodeIDEPropsType = {
  url: string
  rootName: string
}

function SourceCodeIDE({url, rootName}: SourceCodeIDEPropsType) {
  const fileTree = useGetExtractedDir({
    url,
    rootName
  });



  const [selectedFilePathIncludeName, setSelectedFilePathIncludeName] = useState<string>('')


  const [selectedFiles, setSelectedFiles] = useState<Array<string>>([])

  const [renderingIndex, setRenderingIndex] = useState<number>(0)
  
  
  const selectFileHandler: selectFileHandlerType = ({file, pathIncludeName}: {file: Blob; pathIncludeName: string}) => {
    // setSelectedFilePathIncludeName(() => pathIncludeName)
    const temp = selectedFiles
    if (!selectedFiles.some((el) => el === pathIncludeName)) {
      setSelectedFiles((prev) => {
        return [...prev, pathIncludeName]
      })
    }
    setRenderingIndex(() => temp.indexOf(pathIncludeName))
  }

  // useEffect(() => {
  //   setRenderingIndex(() => selectedFiles.indexOf(selectedFilePathIncludeName))
  // }, [selectedFilePathIncludeName])

  useEffect(() => {
    setSelectedFilePathIncludeName(() => selectedFiles[renderingIndex])
  }, [renderingIndex])


  const renderCodeBlock = useMemo(() => selectedFiles.map((pathIncludeName, idx) => {
    const splitIndex = pathIncludeName.lastIndexOf('/') + 1
    const path = pathIncludeName.substring(0, splitIndex)

    const filename = pathIncludeName.substring(splitIndex, pathIncludeName.length)
    const type = filename.substring(filename.lastIndexOf('.') + 1, filename.length)

    if (fileTree) {
      return (
        <div key={`ide-${pathIncludeName}`} css={ideItemWrapperCSS({renderingIndex, currentIndex: idx})}>
          <SourceCodeIDEProcess type={type} file={fileTree[path]['file'][filename]}/>
        </div>
      )
    }
  }), [selectedFiles, renderingIndex])


  const closeTabHandler = (pathIncludeName: string) => {
    setRenderingIndex(() => 0)
    setSelectedFiles((prev) => {
      return [...prev.filter(el => el !== pathIncludeName)]
    })
  }

  const renderTab = useMemo(() => selectedFiles.map((pathIncludeName, idx) => {
    const splitIndex = pathIncludeName.lastIndexOf('/') + 1
    const filename = pathIncludeName.substring(splitIndex, pathIncludeName.length)
    return (
      
      <div key={`tab-${pathIncludeName}`} css={tabItemWrapperCSS({renderingIndex, currentIndex: idx})} onClick={() => {setRenderingIndex(() => idx)}} >
        <div css={tabItemNameWrapperCSS}>
          <SourceCodeExplorerListItemIcon name={filename} css={css`width: 18px; height: 18px;`}/>
          <span className="tab-name">{filename}</span>
        </div>
        
        <div css={closeTabWrapperCSS} onClick={(e) => {closeTabHandler(pathIncludeName)}}>✕</div>
      </div>
    )
  }), [selectedFiles, renderingIndex])


  return (
    
    <div css={wrapperCSS}>
      
      {fileTree ? <SourceCodeExplorer fileTree={fileTree} selectFileHandler={selectFileHandler} selectedFilePathIncludeName={selectedFilePathIncludeName}/> : <Loading label={"파일 트리를 구성하는 중입니다."}/>}
      {/* <SourceCodeCodeBlock content={String(content)} language={selectedFileType}/> */}
      <div css={ideWrapperCSS}>
        
        <div css={tabWrapperCSS}>
          <div css={[ideIndicatorCSS, indicatorSpaceCSS]}/>
          {renderTab}
          <div css={tabLineCSS}/>
        </div>
        {renderCodeBlock}
      </div>
    </div>
    
  );
}

const wrapperCSS = css`
  flex: 1;
  display: flex;
  width: 100%;
  overflow: hidden;
`

const ideWrapperCSS = css`
  flex: 1;
  display: grid;

`

const ideItemWrapperCSS = ({renderingIndex, currentIndex}: {renderingIndex: number; currentIndex: number}) => {
  return css`
    display: ${renderingIndex !== currentIndex && 'none'};
    overflow: hidden;
  `
}

const tabWrapperCSS = css`
  display: flex;
  width: 100%;
  overflow: hidden;
`

const tabItemWrapperCSS = ({renderingIndex, currentIndex}: {renderingIndex: number; currentIndex: number}) => {
  return css`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  font-size: 14px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  transition-property: background-color border;
  transition-duration: 0.5s;
  min-width: 160px;
  width: 160px;
  

  cursor: pointer;

  border-bottom: ${renderingIndex === currentIndex ? `1px solid rgba(0, 0, 0, 0)` : `1px solid rgba(0, 0, 0, 0.1)`};
  background-color: ${renderingIndex === currentIndex ? `rgba(0, 0, 0, 0.05)` : `rgba(0, 0, 0, 0)`};

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    
  }

  
`
} 

const tabItemNameWrapperCSS = css`
  display: flex;
  gap: 8px;
  overflow: hidden;
  & .tab-name {
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
`

const closeTabWrapperCSS = css`
  transition-property: background-color;
  transition-duration: 0.5s;
  border-radius: 100%;
  min-width: 18px;
  min-height: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

`

const indicatorSpaceCSS = css`
  margin-right: 0px;
  z-index: 1;;

`

const tabLineCSS = css`
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`


export default SourceCodeIDE;