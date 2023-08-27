import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import { getFileAPI } from "@/api/playground/getFileAPI";
import useGetExtractedDir from "@/components/Page/SourceCode/useGetExtractedDir";
import SourceCodeCodeBlock from "@/components/Page/SourceCode/SourceCodeCodeBlock";
import SourceCodeExplorer from "@/components/Page/SourceCode/SourceCodeExplorer/SourceCodeExplorer";
import { css } from "@emotion/react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Loading from "@/components/Interface/Loading/Loading";


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

  const [selectedFile, setSelectedFile] = useState<Blob>()
  
  const [selectedFileType, setSelectedFileType] = useState<string>('')
  const [selectedFilePathIncludeName, setSelectedFilePathIncludeName] = useState<string>('')
  const [content, setContent] = useState<string | ArrayBuffer | null>("")

  
  
  const selectFileHandler: selectFileHandlerType = ({file, pathIncludeName}: {file: Blob; pathIncludeName: string}) => {
    setSelectedFilePathIncludeName(() => pathIncludeName)
    setSelectedFile(() => file)
    
  }

  useEffect(() => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result
      setContent(() => result)
    }

    if (selectedFile) {
      reader.readAsText(selectedFile)
      
    }
  }, [selectedFile])

  useEffect(() => {
    const splitted = selectedFilePathIncludeName.split('.')
    setSelectedFileType(() => splitted[splitted.length - 1])
  }, [selectedFilePathIncludeName])


  return (
    
    <div css={wrapperCSS}>
      
      {fileTree ? <SourceCodeExplorer fileTree={fileTree} selectFileHandler={selectFileHandler} selectedFilePathIncludeName={selectedFilePathIncludeName}/> : <Loading label={"파일 트리를 구성하는 중입니다."}/>}
      <SourceCodeCodeBlock content={String(content)} language={selectedFileType}/>
      
    </div>
    
  );
}

const wrapperCSS = css`
  flex: 1;
  display: flex;
  width: 100%;
  overflow: hidden;
`



export default SourceCodeIDE;