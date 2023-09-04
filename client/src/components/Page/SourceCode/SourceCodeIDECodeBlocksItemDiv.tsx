import {
  LineInputProps,
  LineOutputProps,
  Token,
  TokenInputProps,
  TokenOutputProps,
} from "prism-react-renderer";
import React from "react";
import { css } from "@emotion/react";

type SourceCodeIDECodeBlocksItemDivPropsType = {
  tokens: Token[][];
  getLineProps: (input: LineInputProps) => LineOutputProps;
  getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  curIdx: number;
  renderRange: number;
  setRenderRange: React.Dispatch<React.SetStateAction<number>>;
};

function SourceCodeIDECodeBlocksItemDiv({
  tokens,
  getLineProps,
  getTokenProps,
  curIdx,
  renderRange,
  setRenderRange,
}: SourceCodeIDECodeBlocksItemDivPropsType) {

  const renderLines = ({ line, i }: { line: Token[]; i: number }) => {
    return line.map((token, key) => {
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
    });
  };

  const renderTokens = tokens.map((line, i) => {
    return (
      <div key={curIdx * 100 + i} {...getLineProps({ line })}>
        <div className="indicator" css={ideIndicatorCSS}>
          {curIdx * 100 + i + 1}
        </div>
        <div className="token-wrapper">{renderLines({ line, i })}</div>
      </div>
    );
  });

  

  return (
    <div
      id={`${curIdx}`}
      css={css`
        content-visibility: auto;
        min-height: ${tokens.length * 16}px;
      `}
    >
      {renderTokens}
    </div>
  );
}

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

export default SourceCodeIDECodeBlocksItemDiv;
