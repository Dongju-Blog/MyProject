import { deleteSourceCodeAPI } from "@/api/sourceCode/deleteSourceCodeAPI";
import { getSourceCodeAPI } from "@/api/sourceCode/getSourceCodeAPI";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import {
  getSourceCodeResponseType,
  postSourceCodeBodyType,
} from "@/types/board";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/router";
import { postSourceCodeAPI } from "@/api/sourceCode/postSourceCodeAPI";
import { putSourceCodeAPI } from "@/api/sourceCode/putSourceCodeAPI";
import { sourceCodeUpdateData } from "../SourceCodeBoard/SourceCodeCreate";

function useSourceCodeAPI() {
  const noti = useNotification();
  const router = useRouter();

  const sourceCodeQueryHandler = (sourceCodeId: number) => {
    const sourceCodeQuery = useQuery<getSourceCodeResponseType>(
      [`sourceCode`, `${sourceCodeId}`],
      () => getSourceCodeAPI({ id: sourceCodeId ? sourceCodeId : -1 }),
      {
        refetchOnWindowFocus: false,
        staleTime: 300000,
        cacheTime: 300000,
      }
    );
    return sourceCodeQuery;
  };

  const queryClient = useQueryClient();

  const postSourceCodeMutation = useMutation(
    ({ body }: { body: postSourceCodeBodyType }) => postSourceCodeAPI({ body })
  );

  const putSourceCodeMutation = useMutation(
    ({ id, body }: { id: number; body: postSourceCodeBodyType }) =>
      putSourceCodeAPI({ id, body })
  );

  const deleteSourceCodeMutation = useMutation(({ id }: { id: number }) =>
    deleteSourceCodeAPI({ id })
  );

  const postSourceCodeHandler = async ({
    formData,
  }: {
    formData: FormData;
  }) => {
    await postSourceCodeMutation.mutate(
      { body: formData },
      {
        onSuccess: (res) => {
          // queryClient.invalidateQueries(["admin", "boards"]);
          noti({
            content: (
              <NotiTemplate
                type={"ok"}
                content={"소스 코드를 등록하였습니다."}
              />
            ),
            duration: 3000,
          });
          router.replace("/playground" + res.url);
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
        },
      }
    );
  };

  const putSourceCodeHandler = async ({
    updateData,
    formData,
  }: {
    updateData: sourceCodeUpdateData;
    formData: FormData;
  }) => {
    if (!updateData) {
      return;
    }
    await putSourceCodeMutation.mutate(
      { id: updateData.id, body: formData },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries([`sourceCode`, `${updateData.id}`]);
          noti({
            content: (
              <NotiTemplate
                type={"ok"}
                content={"소스 코드를 수정하였습니다."}
              />
            ),
            duration: 3000,
          });
          router.replace("/playground" + res.url);
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
        },
      }
    );
  };

  const deleteSourceCodeHandler = (sourceCodeId: number) => {
    if (confirm("이 작업은 되돌릴 수 없습니다. 그래도 삭제하시겠습니까?")) {
      deleteSourceCodeMutation.mutate(
        { id: sourceCodeId },
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
            router.push("/playground");
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
                    content={
                      err.response.data[Object.keys(err.response.data)[0]]
                    }
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
          },
        }
      );
    }
  };

  return {
    sourceCodeQueryHandler,
    postSourceCodeHandler,
    putSourceCodeHandler,
    deleteSourceCodeHandler,
  };
}

export default useSourceCodeAPI;
