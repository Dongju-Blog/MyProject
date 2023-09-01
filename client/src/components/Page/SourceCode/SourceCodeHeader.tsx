import React from "react";
import { css } from "@emotion/react";
import { UseQueryResult } from "@tanstack/react-query";
import { getSourceCodeResponseType } from "@/types/board";
import Button from "@/components/Interface/Button/Button";
import CheckBox from "@/components/Interface/CheckBox/CheckBox";
import useAuthority from "@/hooks/useAuthority";
import { useAtom } from "jotai";
import { codeBlockOption } from "@/store/store";
import { useRouter } from "next/router";
import useSourceCodeAPI from "./useSourceCodeAPI";

type SourceCodeHeaderPropsType = {
  sourceCodeId: number;
  sourceCodeQuery: UseQueryResult<getSourceCodeResponseType, unknown>;
};

function SourceCodeHeader({
  sourceCodeId,
  sourceCodeQuery,
}: SourceCodeHeaderPropsType) {
  const auth = useAuthority();
  const router = useRouter();
  const [codeBlockOptionAtom, setCodeBlockOptionAtom] =
    useAtom(codeBlockOption);
  const sourceCodeAPI = useSourceCodeAPI();

  const optionCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCodeBlockOptionAtom((prev) => {
        return { ...prev, wrap: true };
      });
    } else {
      setCodeBlockOptionAtom((prev) => {
        return { ...prev, wrap: false };
      });
    }
  };

  return (
    <div css={headerCSS}>
      <div css={headerLeftCSS}>
        {sourceCodeQuery.data && (
          <div css={iconWrapperCSS}>
            {sourceCodeQuery.data.updatedAt} /&nbsp;
          </div>
        )}
        {sourceCodeQuery.data && sourceCodeQuery.data.title}
      </div>
      <div css={headerRightCSS}>
        {auth.currentUser.role === "ADMIN" && (
          <React.Fragment>
            <Button
              onClick={sourceCodeAPI.deleteSourceCodeHandler.bind(
                null,
                sourceCodeId
              )}
              theme={"normalText"}
            >
              삭제
            </Button>
            <Button
              theme={"normalText"}
              onClick={() => {
                router.push(`/playground/${sourceCodeId}/update`);
              }}
            >
              수정
            </Button>
          </React.Fragment>
        )}
        <CheckBox
          theme={"default"}
          checked={codeBlockOptionAtom.wrap}
          onChange={optionCheckHandler}
        >
          <CheckBox.Left>
            <span
              css={css`
                margin-right: 8px;
                font-size: 14px;
              `}
            >
              강제 줄바꿈
            </span>
          </CheckBox.Left>
        </CheckBox>
      </div>
    </div>
  );
}

const wrapperCSS = css`
  display: flex;
  flex-direction: column;
`;

const headerCSS = css`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  height: 18px;
  /* box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.2); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
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
  /* background-color: rgba(0, 0, 0, 0.05); */
  /* border-radius: 20px; */
  /* padding: 2px 12px 2px 12px; */
  color: rgba(0, 0, 0, 0.5);
  /* margin-right: 4px; */
  font-size: 14px;
  /* font-weight: 500; */
`;

export default SourceCodeHeader;
