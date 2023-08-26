import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import { getFileAPI } from "@/api/playground/getFileAPI";
import useGetExtractedDir from "@/components/Page/Playground/useGetExtractedDir";
import CodeBlock from "@/components/Page/Playground/CodeBlock";
import Explorer from "@/components/Page/Playground/Explorer/Explorer";
import { css } from "@emotion/react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";


export type selectFileHandlerType = ({file}: {file: Blob; pathIncludeName: string}) => void

type PlaygroundPropsType = {
  url: string
}

function Playground({url}: PlaygroundPropsType) {
  const fileTree = useGetExtractedDir({
    url
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
      
      {fileTree && <Explorer fileTree={fileTree} selectFileHandler={selectFileHandler} selectedFilePathIncludeName={selectedFilePathIncludeName}/>}
      <CodeBlock content={String(content)} language={selectedFileType}/>
      
    </div>
    
  );
}

const wrapperCSS = css`
  flex: 1;
  display: flex;
  width: 100%;
  overflow: hidden;
`



export default Playground;