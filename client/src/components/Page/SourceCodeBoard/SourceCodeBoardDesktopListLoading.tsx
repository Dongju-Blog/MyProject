import React from "react";
import { css } from "@emotion/react";
import { sourceCodeDesktopItemWrapperCSS } from "./SourceCodeBoardDesktopListItem";
import Skeleton from "@/components/Interface/Loading/Skeleton";

function SourceCodeBoardDesktopListLoading() {
  const array = Array.from({ length: 10 });

  const renderLoading = array.map((el, idx) => {
    return (
      <Skeleton
        key={`board-desktop-list-loading-${idx}`}
        css={sourceCodeDesktopItemWrapperCSS}
      />
    );
  });
  return <React.Fragment>{renderLoading}</React.Fragment>;
}

export default SourceCodeBoardDesktopListLoading;
