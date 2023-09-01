import React, { useMemo } from "react";
import { fileTreeType, useSourceCodeContext } from "../SourceCodeContext";
import SourceCodeExplorerListItem from "./SourceCodeExplorerListItem";
import { selectFileHandlerType } from "../SourceCodeContext";
import { css } from "@emotion/react";
import { useRouter } from "next/router";


type SourceCodeExplorerListPropsType = {
  depth: number;
  dir: string;
};
function SourceCodeExplorerList({
  depth,
  dir,
}: SourceCodeExplorerListPropsType) {
  const {
    fileTree,
    selectedFileNameIncludePath,
  } = useSourceCodeContext();


  const router = useRouter();
  const { init } = router.query;

  const renderDir =
    fileTree[dir] &&
    useMemo(() => fileTree[dir]["dir"].map((el) => {
      const splitted = el.split("/");
      const name = splitted[splitted.length - 2];
      return (
        <SourceCodeExplorerListItem
          name={name}
          dir={el}
          isDir={true}
          depth={depth}
        />
      );
    }), [fileTree, selectedFileNameIncludePath]);

  const renderFile =
    fileTree[dir] &&
    useMemo(() => fileTree[dir]["file"].map((el) => {
      return (
        <SourceCodeExplorerListItem
          name={el}
          dir={dir}
          isDir={false}
          depth={depth}
        />
      );
    }), [fileTree, selectedFileNameIncludePath]);

  return (
    <div css={wrapperCSS}>
      <div className={"separator"} css={lineCSS({ depth })} />
      {renderDir}
      {renderFile}
    </div>
  );
}

const wrapperCSS = css`
  position: relative;
  display: grid;
  &:hover {
    .separator {
      opacity: 100%;
    }
  }
`;

const lineCSS = ({ depth }: { depth: number }) => {
  return css`
    position: absolute;
    width: 1px;
    height: 100%;
    transform: translateX(${depth * 8 - 4}px);
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 99;
    display: ${depth === 1 && "none"};
    opacity: 0;
    transition-property: opacity;
    transition-duration: 1s;
  `;
};

export default SourceCodeExplorerList;
