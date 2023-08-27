import CheckBox from "@/components/Interface/CheckBox/CheckBox";
import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import SourceCode from "@/components/Page/SourceCode/SourceCode";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { codeBlockOption } from "@/store/store";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getSourceCodeResponseType } from "@/types/board";
import { getSourceCodeAPI } from "@/api/sourceCode/getSourceCodeAPI";

function index() {
  const router = useRouter();
  const { sourceCodeId } = router.query;

  

  

  return (
    <Wrapper css={wrapperCSS}>
      
      {sourceCodeId && <SourceCode sourceCodeId={Number(sourceCodeId)}/>}
    </Wrapper>
  );
}

const wrapperCSS = css`
  display: flex;
  flex-direction: column;
`;

const headerCSS = css`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  height: 48px;
  box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 20px;
`;

const headerLeftCSS = css`
  display: flex;
  align-items: center;
`;

const headerRightCSS = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const iconWrapperCSS = css`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 6px 12px 6px 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  font-size: 16px;
  font-weight: 700;
`;

export default index;
