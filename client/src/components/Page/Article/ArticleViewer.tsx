
import React from 'react'
import { Viewer } from "@toast-ui/react-editor";
import prism from "prismjs";
import "prismjs/themes/prism.css";
// @ts-ignore
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";


type ArticleViewerPropsType = {
  content: string | undefined
}

function ArticleViewer({content}: ArticleViewerPropsType) {
  return (
    <div>
      <Viewer initialValue={content} plugins={[[codeSyntaxHighlight, { highlighter: prism }]]} />
    </div>
  )
}

export default ArticleViewer