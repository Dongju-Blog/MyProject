import React, {useEffect, useRef} from 'react'
import ExplorerList from './ExplorerList'
import { fileTreeType } from '../useGetExtractedDir'
import ExplorerListItemIcon from './ExplorerListItemIcon'
import { css } from "@emotion/react";

import { selectFileHandlerType } from '../Playground';

import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent, useOverlayScrollbars } from 'overlayscrollbars-react';

type ExplorerPropsType = {
  fileTree: fileTreeType
  selectFileHandler: selectFileHandlerType
  selectedFilePathIncludeName: string
}

function Explorer({fileTree, selectFileHandler, selectedFilePathIncludeName}: ExplorerPropsType) {
  const root = Object.keys(fileTree)[0]



  return (
    
      <div css={explorerWrapperCSS} >
            <div css={headerCSS}>EXPLORER</div>
            <div css={rootCSS}>{root}</div>
            {/* {JSON.stringify(Object.keys(fileTree)[0])} */}
            <OverlayScrollbarsComponent css={explorerInnerWrapperCSS} defer> 
              <ExplorerList depth={1} dir={root} fileTree={fileTree} selectFileHandler={selectFileHandler} selectedFilePathIncludeName={selectedFilePathIncludeName} />
            </OverlayScrollbarsComponent>
            

      </div>
    
  )
}

const explorerWrapperCSS = css`
  background-color: rgba(250, 250, 250, 1);
  width: 400px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const explorerInnerWrapperCSS = css`
  flex: 1;

`

const headerCSS = css`
  padding: 16px 24px 16px 24px;
  color: rgba(0, 0, 0, 0.6);
`

const rootCSS = css`
  font-weight: 700;;
  padding: 0px 0px 6px 16px;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`


export default Explorer