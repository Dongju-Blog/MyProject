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
import { useSourceCodeContext } from "./SourceCodeContext";
import SourceCodeExplorerListItemIcon from "./SourceCodeExplorer/SourceCodeExplorerListItemIcon";

function SourceCodeHeader() {
  const { sourceCodeQueryData, selectedFileNameIncludePath } =
    useSourceCodeContext();

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

  if (sourceCodeQueryData) {
    return (
      <div
        css={headerCSS({ onTab: selectedFileNameIncludePath ? true : false })}
      >
        <div css={headerLeftCSS}>
          {selectedFileNameIncludePath ? (
            <div css={filePathWrapperCSS}>
              {selectedFileNameIncludePath}
              <span css={iconWrapperCSS}>
                @ {sourceCodeQueryData.updatedAt}
              </span>
            </div>
          ) : (
            <div>
              <span css={iconWrapperCSS}>
                {sourceCodeQueryData.updatedAt}&nbsp;/&nbsp;
              </span>
              {sourceCodeQueryData.title}
            </div>
          )}
        </div>
        <div css={headerRightCSS}>
          {auth.currentUser.role === "ADMIN" && (
            <React.Fragment>
              <Button
                onClick={sourceCodeAPI.deleteSourceCodeHandler.bind(
                  null,
                  sourceCodeQueryData.id
                )}
                theme={"normalText"}
              >
                삭제
              </Button>
              <Button
                theme={"normalText"}
                onClick={() => {
                  router.push(`/playground/${sourceCodeQueryData.id}/update`);
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
}

const wrapperCSS = css`
  display: flex;
  flex-direction: column;
`;

const filePathWrapperCSS = css`
  display: flex;
  gap: 8px;
`;

const headerCSS = ({ onTab }: { onTab: boolean }) => {
  return css`
    /* border-top: 1px solid rgba(0, 0, 0, 0.1); */
    height: 35px;
    /* box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.2); */
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    background-color: ${onTab && `rgba(0, 0, 0, 0.05)`};
  `;
};

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
