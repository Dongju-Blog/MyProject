import React, {useEffect, useRef} from 'react'
import { Highlight, themes } from "prism-react-renderer";
import { css } from "@emotion/react";

import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent, useOverlayScrollbars } from 'overlayscrollbars-react';

import { useAtom } from "jotai";
import { codeBlockOption } from "@/store/store";

import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-gradle';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-properties';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-batch';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-ignore.js';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-cshtml';
import 'prismjs/components/prism-rust';


type SourceCodeCodeBlockPropsType = {
  content: string
  language: string
}

function SourceCodeCodeBlock({content, language}: SourceCodeCodeBlockPropsType) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [codeBlockOptionAtom, useCodeBlockOptionAtom] = useAtom(codeBlockOption)

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  }, [content])

  const [initialize, instance] = useOverlayScrollbars();

  useEffect(() => {
    if (wrapperRef.current) {
      initialize(wrapperRef.current);
    }
  }, [initialize]);


  return (
    <div css={scrollWrapperCSS} ref={wrapperRef}>
      <div css={outerWrapperCSS({wrap: codeBlockOptionAtom.wrap})} >
      <div css={topDummyCSS}>
        <div className='indicator' />
      </div> 
      <Highlight prism={Prism} theme={themes.github} code={content} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <div className="indicator">{i + 1}</div>
                <div className="token-wrapper">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
                
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <div css={bottomDummyCSS}>
        <div className='indicator' />
      </div>  
      
    </div>
    </div>


  )
}

const scrollWrapperCSS = css`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
`

const outerWrapperCSS = ({wrap}: {wrap: boolean}) => {
  return css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  /* overflow: scroll; */
  
  /* overflow:hidden; */
    
  & .token-line {
    font-family: 'Consolas';
    padding: 0px;
    display: flex;
  }

  & .token-wrapper {
    display: flex;
    flex-wrap: ${wrap && `wrap`};
    /* display: inline-block; */
  }

  & .indicator {
    font-family: 'Consolas';
    color: rgba(0, 0, 0, 0.4);
    background-color: rgba(250, 250, 250, 1);
    text-align: right;
    padding-right: 6px;
    width: 64px;
    min-width: 64px;
    margin-right: 24px;
    display: inline-block;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    /* height: 100%; */
    user-select: none;
  }
`
}

const topDummyCSS = css`
  height: 16px;
  & .indicator {
    height: 100%;
    
  }
  
`;

const bottomDummyCSS = css`
  flex: 1;
  
  & .indicator {
    height: 100%;
  }
  
`;

export default SourceCodeCodeBlock