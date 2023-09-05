import React, { useRef, useState, useMemo, useEffect } from "react";

import { css } from "@emotion/react";
import { useAtom } from "jotai";
import { codeBlockOption } from "@/store/store";
import { debounce, throttle } from "lodash";
import { useSourceCodeContext } from "./SourceCodeContext";
import { useRouter } from "next/router";
import Prism from "prismjs";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
// import "prismjs/components/prism-java";
// import "prismjs/components/prism-docker";
// import "prismjs/components/prism-gradle";
// import "prismjs/components/prism-yaml";
// import "prismjs/components/prism-properties";
// import "prismjs/components/prism-git";
// import "prismjs/components/prism-batch";
// import "prismjs/components/prism-json";
// import "prismjs/components/prism-markdown";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-jsx";
// import "prismjs/components/prism-typescript";
// import "prismjs/components/prism-tsx";
// import "prismjs/components/prism-ignore.js";
// import "prismjs/components/prism-kotlin";
// import "prismjs/components/prism-cshtml";
// import "prismjs/components/prism-rust";

require("prismjs/components/prism-java")
require("prismjs/components/prism-docker")
require("prismjs/components/prism-gradle")
require("prismjs/components/prism-yaml")
require("prismjs/components/prism-properties")
require("prismjs/components/prism-git")
require("prismjs/components/prism-batch")
require("prismjs/components/prism-json")
require("prismjs/components/prism-markdown")
require("prismjs/components/prism-javascript")
require("prismjs/components/prism-jsx")
require("prismjs/components/prism-typescript")
require("prismjs/components/prism-tsx")
require("prismjs/components/prism-ignore.js")
require("prismjs/components/prism-kotlin")
require("prismjs/components/prism-cshtml")
require("prismjs/components/prism-rust")

import {
  Highlight,
  LineInputProps,
  LineOutputProps,
  Token,
  TokenInputProps,
  TokenOutputProps,
  themes,
} from "prism-react-renderer";
import SourceCodeIDECodeBlocksItemDiv from "./SourceCodeIDECodeBlocksItemDiv";

type SourceCodeIDECodeBlocksItemPropsType = {
  content: string;
  language: string;
};

function SourceCodeIDECodeBlocksItem({
  content,
  language,
}: SourceCodeIDECodeBlocksItemPropsType) {
  const [codeBlockOptionAtom, useCodeBlockOptionAtom] =
    useAtom(codeBlockOption);
  const router = useRouter();
  const [renderRange, setRenderRange] = useState(0);

  const { fileIndexes } = useSourceCodeContext();

  const findFileByToken = (e: any) => {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let target = e.target.innerText.trim();
    target.replace(reg, "");
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

  type dividedTokenType = {
    tokens: Token[][];
  };

  const dividedTokensArr = ({ tokens }: dividedTokenType) => {
    const tokensQuantity = tokens.length / 100;
    const dividedTokensArr: Token[][][] = [];
    for (var i = 0; i < tokensQuantity; i++) {
      dividedTokensArr.push(tokens.slice(i * 100, i * 100 + 100));
    }

    return dividedTokensArr as Token[][][];
  };

  type renderTokenType = {
    dividedTokensArr: Token[][][];
    getLineProps: (input: LineInputProps) => LineOutputProps;
    getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  };

  const renderDividedToken = ({
    dividedTokensArr,
    getLineProps,
    getTokenProps,
  }: renderTokenType) => {
    return useMemo(
      () =>
        dividedTokensArr.map((el, idx) => {
          return (
            <SourceCodeIDECodeBlocksItemDiv
              tokens={el}
              getLineProps={getLineProps}
              getTokenProps={getTokenProps}
              curIdx={idx}
              renderRange={renderRange}
              setRenderRange={setRenderRange}
            />
          );
        }),
      [renderRange]
    );
  };

  return useMemo(
    () => (
      <OverlayScrollbarsComponent css={scrollWrapperCSS} defer>
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
                {renderDividedToken({
                  dividedTokensArr: dividedTokensArr({ tokens }),
                  getLineProps,
                  getTokenProps,
                })}
              </pre>
            )}
          </Highlight>

          <div css={bottomDummyCSS}>
            <div className="indicator" css={ideIndicatorCSS} />
          </div>
        </div>
      </OverlayScrollbarsComponent>
    ),
    [content, codeBlockOptionAtom.wrap]
  );
}

const scrollWrapperCSS = css`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  transition-property: box-shadow;
  transition-duration: 0.5s;
`;

const outerWrapperCSS = ({ wrap }: { wrap: boolean }) => {
  return css`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto auto minmax(0px, 100vh);
    font-size: 14px;
    position: relative;

    & .token-line {
      font-family: "Consolas";
      padding: 0px;
      display: flex;
    }

    & .token-wrapper {
      display: flex;
      flex-wrap: ${wrap && `wrap`};
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
  border-right: 1px solid rgba(0, 0, 0, 0.1);
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
