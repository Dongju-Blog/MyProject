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

function SourceCodeIDETabHeader() {
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
        <div className="header-left" css={headerLeftCSS}>
          {selectedFileNameIncludePath ? (
            <React.Fragment>
              <span css={filePathWrapperCSS}>
                {selectedFileNameIncludePath}
                <span css={iconWrapperCSS}>
                  &nbsp;@ {sourceCodeQueryData.updatedAt}
                </span>
              </span>
            </React.Fragment>
          ) : (
            <div>
              <span css={filePathWrapperCSS}>
                <span css={iconWrapperCSS}>
                  {sourceCodeQueryData.updatedAt}&nbsp;/&nbsp;
                </span>
                {sourceCodeQueryData.title}
              </span>
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

const filePathWrapperCSS = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const headerCSS = ({ onTab }: { onTab: boolean }) => {
  return css`
    flex: 1;
    max-height: 32px;
    border-top: ${!onTab && `1px solid rgba(0, 0, 0, 0.1)`};
    border-bottom: ${onTab && `1px solid rgba(0, 0, 0, 0.1)`};
    z-index: 10;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 14px;
    background-color: ${onTab && `rgba(0, 0, 0, 0.05)`};
    white-space: nowrap;
  `;
};

const headerLeftCSS = css`
  display: grid;
  grid-template-columns: minmax(0px, 100%);
  max-width: 80%;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const headerRightCSS = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const iconWrapperCSS = css`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default SourceCodeIDETabHeader;
