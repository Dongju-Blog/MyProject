import React, { useMemo } from "react";
import { useSourceCodeContext } from "./SourceCodeContext";
import SourceCodeExplorerListItemIcon from "./SourceCodeExplorer/SourceCodeExplorerListItemIcon";
import { css } from "@emotion/react";
import { ideIndicatorCSS } from "./SourceCodeIDECodeBlocksItem";
import { useRouter } from "next/router";

function SourceCodeIDETab() {
  const {
    fileTree,
    selectedFilesTab,
    setSelectedFilesTab,
    selectedFileIndex,
    setSelectedFileIndex,
  } = useSourceCodeContext();

  const router = useRouter();

  const closeTabHandler = (pathIncludeName: string) => {
    setSelectedFilesTab((prev) => {
      const newSet = new Set(prev);
      newSet.delete(pathIncludeName);
      const newSetArray = Array.from(newSet);
      if (newSetArray.length === 0) {
        setSelectedFileIndex(() => -1);
        const params = router.query;
        delete params["init"];
        router.push({ query: { ...params } }, undefined, {
          shallow: true,
        });
      } else {
        setSelectedFileIndex(() => 0);
        router.push(
          { query: { ...router.query, init: newSetArray[0] } },
          undefined,
          {
            shallow: true,
          }
        );
      }
      return newSet;
    });
  };

  const onClickTabHandler = (idx: number, pathIncludeName: string) => {
    // setSelectedFileIndex(() => idx);
    router.push(
      { query: { ...router.query, init: pathIncludeName } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const renderTab = useMemo(
    () =>
      Array.from(selectedFilesTab).map((pathIncludeName, idx) => {
        const splitIndex = pathIncludeName.lastIndexOf("/") + 1;
        const filename = pathIncludeName.substring(
          splitIndex,
          pathIncludeName.length
        );

        if (fileTree) {
          return (
            <div
              key={`tab-${pathIncludeName}`}
              css={tabItemWrapperCSS({ selectedFileIndex, currentIndex: idx })}
              onClick={() => {
                onClickTabHandler(idx, pathIncludeName);
              }}
            >
              <div css={tabItemNameWrapperCSS}>
                <SourceCodeExplorerListItemIcon
                  name={filename}
                  css={css`
                    min-width: 18px;
                    min-height: 18px;
                    width: 18px;
                    height: 18px;
                  `}
                />
                <span className="tab-name">{filename}</span>
              </div>

              <div
                css={closeTabWrapperCSS}
                onClick={(e) => {
                  e.stopPropagation();
                  closeTabHandler(pathIncludeName);
                }}
              >
                ✕
              </div>
            </div>
          );
        }
      }),
    [selectedFilesTab, selectedFileIndex]
  );

  return (
    <div css={tabWrapperCSS}>
      <div css={[ideIndicatorCSS, indicatorSpaceCSS]} />
      {renderTab}
      <div css={tabLineCSS} />
    </div>
  );
}

const tabWrapperCSS = css`
  display: flex;
  width: 100%;
  overflow: scroll;
  max-height: 35px;
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`;

const tabItemWrapperCSS = ({
  selectedFileIndex,
  currentIndex,
}: {
  selectedFileIndex: number;
  currentIndex: number;
}) => {
  return css`
    display: flex;
    justify-content: space-between;
    padding: 8px;
    font-size: 14px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    transition-property: background-color border;
    transition-duration: 0.5s;
    min-width: 160px;
    width: 160px;
    user-select: none;

    cursor: pointer;

    border-bottom: ${selectedFileIndex === currentIndex
      ? `1px solid rgba(0, 0, 0, 0)`
      : `1px solid rgba(0, 0, 0, 0.1)`};
    background-color: ${selectedFileIndex === currentIndex
      ? `rgba(0, 0, 0, 0.05)`
      : `rgba(0, 0, 0, 0)`};

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `;
};

const tabItemNameWrapperCSS = css`
  display: flex;
  gap: 8px;
  overflow: hidden;
  & .tab-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const closeTabWrapperCSS = css`
  transition-property: background-color;
  transition-duration: 0.5s;
  border-radius: 100%;
  min-width: 18px;
  min-height: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const indicatorSpaceCSS = css`
  margin-right: 0px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white; */
`;

const tabLineCSS = css`
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export default SourceCodeIDETab;
