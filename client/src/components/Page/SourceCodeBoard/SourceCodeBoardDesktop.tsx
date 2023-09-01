import React from "react";
import { useQuery } from "@tanstack/react-query";
import { pageablePageSourceCodesResponseType } from "@/types/board";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import SourceCodeBoardDesktopList from "./SourceCodeBoardDesktopList";
import useAuthority from "@/hooks/useAuthority";
import SourceCodeBoardHeader from "./SourceCodeBoardHeader";
import { getSourceCodesAPI } from "@/api/sourceCode/getSourceCodesAPI";

type SourceCodeBoardPropsType = {
  boardName: string;
  currentPage: number;
};

function SourceCodeBoardDesktop({
  boardName,
  currentPage,
}: SourceCodeBoardPropsType) {
  const auth = useAuthority();
  const router = useRouter();

  const sourceCodesQuery = useQuery<pageablePageSourceCodesResponseType>(
    ["sourceCodeBoard", `${currentPage}`],
    () => getSourceCodesAPI({ page: currentPage - 1 }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 300000,
      cacheTime: 300000,
      retry: 1,
    }
  );

  return (
    <div css={boardWrapperCSS}>
      <div>
        <SourceCodeBoardHeader label={boardName} fontSize={36} />
      </div>

      <SourceCodeBoardDesktopList
        sourceCodesQuery={sourceCodesQuery}
        pageUrl={`/board/${boardName}`}
        currentPage={currentPage}
      />
    </div>
  );
}

const boardWrapperCSS = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 36px;
`;

const buttonCSS = css`
  width: 100px;
`;
export default SourceCodeBoardDesktop;
