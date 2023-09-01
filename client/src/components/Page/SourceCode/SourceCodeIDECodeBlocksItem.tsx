import React, { useEffect, useRef, useState, useMemo } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { css } from "@emotion/react";

import "overlayscrollbars/overlayscrollbars.css";
import {
  OverlayScrollbarsComponent,
  useOverlayScrollbars,
} from "overlayscrollbars-react";

import { useAtom } from "jotai";
import { codeBlockOption } from "@/store/store";

import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-gradle";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-properties";
import "prismjs/components/prism-git";
import "prismjs/components/prism-batch";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-ignore.js";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-rust";
import { debounce, throttle } from "lodash";
// import { fileIndexesType } from './useSourceCodeFileTree';
import { fileIndexesType, useSourceCodeContext } from "./SourceCodeContext";
import { useRouter } from "next/router";

type SourceCodeIDECodeBlocksItemPropsType = {
  file: Blob;
  language: string;
};

function SourceCodeIDECodeBlocksItem({
  file,
  language,
}: SourceCodeIDECodeBlocksItemPropsType) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [codeBlockOptionAtom, useCodeBlockOptionAtom] =
    useAtom(codeBlockOption);
  const [isTop, setIsTop] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const {
    fileIndexes,
    selectedFileIndex,
    selectedFilesTab,
  } = useSourceCodeContext();

  useEffect(() => {
    const reader = new FileReader();
    if (file) {
      reader.readAsText(file);
      reader.onload = () => {
        setContent(() => String(reader.result));
      };
    }
    
  }, [file]);

  // useEffect(() => {
  //   if (wrapperRef.current) {
  //     wrapperRef.current.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  //   }
  // }, [content])

  const onScrollHandler = throttle((i, e: any) => {
    if (e.target && e.target.scrollTop > 0) {
      setIsTop(() => false);
    } else {
      setIsTop(() => true);
    }
  }, 500);

  // const [initialize, instance] = useOverlayScrollbars({events: {scroll: onScrollHandler}});

  // useEffect(() => {
  //   if (wrapperRef.current) {
  //     initialize(wrapperRef.current);
  //   }
  // }, [initialize]);

  const findFileByToken = (e: any) => {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let target = e.target.innerText.trim();
    target.replace(reg, "");
    // console.log(fileIndexes)
    if (target !== "" && target in fileIndexes) {
      router.push(
        { query: { ...router.query, init: fileIndexes[target] } },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  const findFileHighlighter = (e: any) => {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let target = e.target.innerText.trim();
    target.replace(reg, "");
    // console.log(fileIndexes)
    if (target !== "" && target in fileIndexes) {
      e.target.className = "goto-file";
    }
  };

  const call = useMemo(
    () =>
      debounce((e: any) => {
        findFileHighlighter(e);
      }, 100),
    []
  );

  // if (!content) {
  //   return;
  // }

  return useMemo(() => (
    <OverlayScrollbarsComponent
      css={scrollWrapperCSS({ isTop })}
      events={{ scroll: onScrollHandler }}
      defer
    >
      <div css={outerWrapperCSS({ wrap: codeBlockOptionAtom.wrap })}>
        <div css={topDummyCSS}>
          <div className="indicator" css={ideIndicatorCSS} />
        </div>

        <Highlight
          prism={Prism}
          theme={themes.github}
          code={content}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre onClick={findFileByToken} onMouseOver={call}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <div className="indicator" css={ideIndicatorCSS}>
                    {i + 1}
                  </div>
                  <div className="token-wrapper">
                    {line.map((token, key) => {
                      if (
                        i > 0 &&
                        line.length === 1 &&
                        line[0].content.trim() === "" &&
                        tokens[i - 1]
                      ) {
                        const text = tokens[i - 1][0].content;
                        let spaceCnt = 0;
                        for (var j = 0; j < text.length; j++) {
                          if (text[j] !== " ") {
                            break;
                          }
                          spaceCnt += 1;
                        }
                        line[0].content = " ".repeat(spaceCnt);
                      }
                      return (
                        <span
                          css={[key === 0 && spaceCSS({ text: token.content })]}
                          key={key}
                          {...getTokenProps({ token })}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        <div css={bottomDummyCSS}>
          <div className="indicator" css={ideIndicatorCSS} />
        </div>
      </div>
    </OverlayScrollbarsComponent>
  ), [content, file, selectedFileIndex, selectedFilesTab]);
}

const spaceCSS = ({ text }: { text: string }) => {
  let spaceCnt = 0;
  for (var i = 0; i < text.length; i++) {
    if (text[i] !== " ") {
      break;
    }
    spaceCnt += 1;
  }

  const lineCnt = Math.floor(spaceCnt / 2);

  return css`
    position: relative;
    &::before {
      content: "${"│ ".repeat(lineCnt)}";
      left: -3px;
      width: ${lineCnt * 15.5}px;
      height: 100%;
      position: absolute;
      color: rgba(0, 0, 0, 0.15);
    }
  `;
};

const scrollWrapperCSS = ({ isTop }: { isTop: boolean }) => {
  return css`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    transition-property: box-shadow;
    transition-duration: 0.5s;
    box-shadow: ${!isTop && `inset 0px 10px 10px -10px rgba(0, 0, 0, 0.1)`};
    /* z-index: 999; */
  `;
};

const outerWrapperCSS = ({ wrap }: { wrap: boolean }) => {
  return css`
    
    width: 100%;
    height: 100%;
    /* display: flex;
  flex-direction: column; */
    display: grid;
    /* grid-template-columns: auto auto; */
    grid-template-rows: auto auto minmax(0px, 100vh);
    font-size: 14px;
    position: relative;
    /* overflow: scroll; */

    /* overflow:hidden; */

    & .token-line {
      font-family: "Consolas";
      padding: 0px;
      display: flex;
    }

    & .token-wrapper {
      display: flex;
      flex-wrap: ${wrap && `wrap`};
      /* display: inline-block; */
    }

    & .token {
      word-wrap: ${wrap && `break-word`};
      white-space: ${wrap && `pre-wrap`};
      max-width: 100%;
    }

    & .goto-file {
      transition-property: background-color;
      transition-duration: 0.5s;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  `;
};

export const ideIndicatorCSS = css`
  font-family: "Consolas";
  color: rgba(0, 0, 0, 0.4);
  background-color: rgba(250, 250, 250, 1);
  text-align: right;
  padding-right: 6px;
  width: 64px;
  min-width: 64px;
  margin-right: 24px;
  display: inline-block;
  /* border-left: 1px solid rgba(0, 0, 0, 0.1); */
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  /* height: 100%; */
  user-select: none;
  position: sticky;
  left: 0;
  z-index: 999;
`;

const topDummyCSS = css`
  height: 16px;
  & .indicator {
    height: 100%;
  }
`;

const bottomDummyCSS = css`
  height: 100%;
  & .indicator {
    height: 100%;
  }
`;

export default SourceCodeIDECodeBlocksItem;
