import CheckBox from "@/components/Interface/CheckBox/CheckBox";
import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import SourceCodeIDE from "./SourceCodeIDE";
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { codeBlockOption } from "@/store/store";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSourceCodeResponseType } from "@/types/board";
import { getSourceCodeAPI } from "@/api/sourceCode/getSourceCodeAPI";
import Loading from "@/components/Interface/Loading/Loading";
import Button from "@/components/Interface/Button/Button";
import { deleteSourceCodeAPI } from "@/api/sourceCode/deleteSourceCodeAPI";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import Alert from "@/components/Interface/Loading/Alert";
import useAuthority from "@/hooks/useAuthority";

type SourceCodePropsType = {
  sourceCodeId: number
}

function SourceCode({sourceCodeId}: SourceCodePropsType) {
  const [codeBlockOptionAtom, setCodeBlockOptionAtom] = useAtom(codeBlockOption);
  const router = useRouter()
  const noti = useNotification()
  const isMobile = useResponsive(mediaQuery.tablet)
  const auth = useAuthority();


  const sourceCodeQuery = useQuery<getSourceCodeResponseType>(
    [`sourceCode`, `${sourceCodeId}`],
    () => getSourceCodeAPI({ id: sourceCodeId }),
    {
      refetchOnWindowFocus: false,
      staleTime: 300000,
      cacheTime: 300000,
    }
  );

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

  const queryClient = useQueryClient();

  const deleteSourceCodeMutation = useMutation(
    ({ id }: { id: number }) =>
    deleteSourceCodeAPI({ id })
  );

  const deleteOnClickHandler = () => {
    if (confirm("이 작업은 되돌릴 수 없습니다. 그래도 삭제하시겠습니까?")) {
      deleteSourceCodeMutation.mutate({id: sourceCodeId},
        {
          onSuccess: () => {
            queryClient.invalidateQueries([`sourceCode`, `${sourceCodeId}`]);
            noti({
              content: (
                <NotiTemplate
                  type={"alert"}
                  content={"소스 코드를 삭제하였습니다."}
                />
              ),
              duration: 3000,
            });
            router.push('/playground')
          },
          onError: (err: any) => {
            if (err?.response?.data?.message) {
              noti({
                content: (
                  <NotiTemplate
                    type={"alert"}
                    content={err.response.data.message}
                  />
                ),
                duration: 3000,
              });
            } else if (err?.response?.data) {
              noti({
                content: (
                  <NotiTemplate
                    type={"alert"}
                    content={err.response.data[Object.keys(err.response.data)[0]]}
                  />
                ),
                duration: 3000,
              });
            } else {
              noti({
                content: (
                  <NotiTemplate
                    type={"alert"}
                    content="알 수 없는 오류가 발생하였습니다."
                  />
                ),
                duration: 3000,
              });
            }
          }
        }
        
      )
    }
  }

  if (isMobile) {
    return <Alert label={"모바일에서는 지원되지 않습니다."}/>
  }

  if (sourceCodeQuery && sourceCodeQuery.isError) {
    return <Alert label={"소스 코드를 불러오지 못했습니다!"}/>
  }

  return (
    <React.Fragment>
      <div css={headerCSS}>
   
        <div css={headerLeftCSS}>
          {sourceCodeQuery.data &&<div css={iconWrapperCSS}>{sourceCodeQuery.data.updatedAt} /&nbsp;</div>}
          {sourceCodeQuery.data && sourceCodeQuery.data.title}
        </div>
        <div css={headerRightCSS}>
          {auth.currentUser.role === "ADMIN" && 
          <React.Fragment>
            <Button onClick={deleteOnClickHandler} theme={'normalText'}>
              삭제
            </Button>
            <Button theme={'normalText'} onClick={() => {router.push(`/playground/${sourceCodeId}/update`)}}>
              수정
            </Button>
          </React.Fragment>
          }
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
      {sourceCodeQuery.data ?
      <SourceCodeIDE
        url={
          sourceCodeQuery.data.fileUrl
        }
        rootName={sourceCodeQuery.data.rootName}
        
      /> : <Loading label={"데이터를 받아오는 중입니다."}/>}
    </React.Fragment>
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

export default SourceCode;
