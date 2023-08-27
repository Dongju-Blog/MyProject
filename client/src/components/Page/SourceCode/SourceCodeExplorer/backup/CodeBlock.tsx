import React, {useEffect, useRef} from 'react'
import { Highlight, themes } from "prism-react-renderer";
import { css } from "@emotion/react";

import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbarsComponent, useOverlayScrollbars } from 'overlayscrollbars-react';

type CodeBlockPropsType = {
  content: string
  language: string
}

function CodeBlock({content, language}: CodeBlockPropsType) {
  const wrapperRef = useRef<HTMLDivElement>(null)

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
      <div css={outerWrapperCSS} >
      <div css={topDummyCSS}>
        <div className='indicator' />
      </div> 
      <Highlight theme={themes.github} code={content} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <div className="indicator">{i + 1}</div>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
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

const outerWrapperCSS = css`
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
    /* display: flex;
    flex-wrap: wrap; */

  }

  & .indicator {
    font-family: 'Consolas';
    color: rgba(0, 0, 0, 0.4);
    background-color: rgba(250, 250, 250, 1);
    text-align: right;
    padding-right: 6px;
    width: 64px;
    margin-right: 24px;
    display: inline-block;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    /* height: 100%; */
  }
`

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

export default CodeBlock