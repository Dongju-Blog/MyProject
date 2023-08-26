import React from 'react'
import { fileTreeType } from '../useGetExtractedDir'
import ExplorerListItem from './ExplorerListItem'
import { selectFileHandlerType } from '../Playground';


type ExplorerListPropsType = {
  depth: number
  dir: string
  fileTree: fileTreeType
  selectFileHandler: selectFileHandlerType
  selectedFilePathIncludeName: string
}
function ExplorerList({depth, dir, fileTree, selectFileHandler, selectedFilePathIncludeName}: ExplorerListPropsType) {
  
  const renderDir = fileTree[dir] && fileTree[dir]["dir"].map((el) => {
    const splitted = el.split('/')
    const name = splitted[splitted.length - 2]
    return <ExplorerListItem name={name} dir={el} isDir={true} fileTree={fileTree} depth={depth} selectFileHandler={selectFileHandler} selectedFilePathIncludeName={selectedFilePathIncludeName} />
  })
  const renderFile = fileTree[dir] && Object.keys(fileTree[dir]["file"]).map((el) => {
    return <ExplorerListItem name={el} dir={dir} isDir={false} fileTree={fileTree} depth={depth} selectFileHandler={selectFileHandler} selectedFilePathIncludeName={selectedFilePathIncludeName} />
  })


  return (
    <div>
      {renderDir}
      {renderFile}
    </div>
  )
}

export default ExplorerList