import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import Input from "@/components/Interface/Input/Input";
import Textarea from "@/components/Interface/Textarea/Textarea";
import Button from "@/components/Interface/Button/Button";
import imageCompression from "browser-image-compression";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSourceCodeAPI } from "@/api/sourceCode/postSourceCodeAPI";
import { postSourceCodeBodyType } from "@/types/board";
import { putSourceCodeAPI } from "@/api/sourceCode/putSourceCodeAPI";
import { useRouter } from "next/dist/client/router";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";
import mediaQuery from "@/util/responsive";
import useResponsive from "@/hooks/useResponsive";
import Alert from "@/components/Interface/Loading/Alert";
import useSourceCodeAPI from "../SourceCode/useSourceCodeAPI";

export type sourceCodeUpdateData = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rootName: string;
};

type SourceCodeCreatePropsType = {
  updateData?: sourceCodeUpdateData;
};

function SourceCodeCreate({ updateData }: SourceCodeCreatePropsType) {
  const [title, setTitle] = useState<string>(
    updateData ? updateData.title : ""
  );
  const [description, setDescription] = useState<string>(
    updateData ? updateData.description : ""
  );
  const [image, setImage] = useState<Blob>();
  const [file, setFile] = useState<Blob>();
  const [rootName, setRootName] = useState<string>(
    updateData ? updateData.rootName : ""
  );
  const [imageUrl, setImageUrl] = useState<string>(
    updateData ? updateData.imageUrl : ""
  );

  const router = useRouter();
  const noti = useNotification();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const isMobile = useResponsive(mediaQuery.tablet);
  const sourceCodeAPI = useSourceCodeAPI();

  const inputImageOnChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const options = {
        maxSizeMB: 1, // 이미지 최대 용량
        maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
        useWebWorker: true,
        // fileType: 'image/png',
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const modifiedFile = new File([compressedFile], file.name, {
          type: file.type,
        });
        const url = URL.createObjectURL(modifiedFile);

        setImage(() => modifiedFile);
        setImageUrl(() => url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const inputFileOnChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(() => file);

      const rootName = file.name.split(".")[0];
      setRootName(() => rootName);
    }
  };

  const inputFileOnClickHandler = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const inputImageOnClickHandler = () => {
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  };

  const submitHandler = async () => {
    const formData: FormData = new FormData();
    if (file) {
      await formData.append("file", file);
    }
    if (image) {
      await formData.append("image", image);
    }

    await formData.append(
      "json",
      new Blob(
        [
          JSON.stringify({
            title,
            description,
            rootName,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (updateData && updateData.id) {
      sourceCodeAPI.putSourceCodeHandler({ updateData, formData });
    } else {
      sourceCodeAPI.postSourceCodeHandler({ formData });
    }
  };

  // const queryClient = useQueryClient();

  // const postSourceCodeMutation = useMutation(
  //   ({ body }: { body: postSourceCodeBodyType }) => postSourceCodeAPI({ body })
  // );

  // const putSourceCodeMutation = useMutation(
  //   ({ id, body }: { id: number; body: postSourceCodeBodyType }) =>
  //     putSourceCodeAPI({ id, body })
  // );

  // const postMutateHandler = async ({ formData }: { formData: FormData }) => {
  //   await postSourceCodeMutation.mutate(
  //     { body: formData },
  //     {
  //       onSuccess: (res) => {
  //         // queryClient.invalidateQueries(["admin", "boards"]);
  //         noti({
  //           content: (
  //             <NotiTemplate
  //               type={"ok"}
  //               content={"소스 코드를 등록하였습니다."}
  //             />
  //           ),
  //           duration: 3000,
  //         });
  //         router.replace("/playground" + res.url);
  //       },
  //       onError: (err: any) => {
  //         if (err?.response?.data?.message) {
  //           noti({
  //             content: (
  //               <NotiTemplate
  //                 type={"alert"}
  //                 content={err.response.data.message}
  //               />
  //             ),
  //             duration: 3000,
  //           });
  //         } else if (err?.response?.data) {
  //           noti({
  //             content: (
  //               <NotiTemplate
  //                 type={"alert"}
  //                 content={err.response.data[Object.keys(err.response.data)[0]]}
  //               />
  //             ),
  //             duration: 3000,
  //           });
  //         } else {
  //           noti({
  //             content: (
  //               <NotiTemplate
  //                 type={"alert"}
  //                 content="알 수 없는 오류가 발생하였습니다."
  //               />
  //             ),
  //             duration: 3000,
  //           });
  //         }
  //       },
  //     }
  //   );
  // };

  // const putMutateHandler = async ({ formData }: { formData: FormData }) => {
  //   if (!updateData) {
  //     return;
  //   }
  //   await putSourceCodeMutation.mutate(
  //     { id: updateData.id, body: formData },
  //     {
  //       onSuccess: (res) => {
  //         queryClient.invalidateQueries([`sourceCode`, `${updateData.id}`]);
  //         noti({
  //           content: (
  //             <NotiTemplate
  //               type={"ok"}
  //               content={"소스 코드를 수정하였습니다."}
  //             />
  //           ),
  //           duration: 3000,
  //         });
  //         router.replace("/playground" + res.url);
  //       },
  //       onError: (err: any) => {
  //         if (err?.response?.data?.message) {
  //           noti({
  //             content: (
  //               <NotiTemplate
  //                 type={"alert"}
  //                 content={err.response.data.message}
  //               />
  //             ),
  //             duration: 3000,
  //           });
  //         } else if (err?.response?.data) {
  //           noti({
  //             content: (
  //               <NotiTemplate
  //                 type={"alert"}
  //                 content={err.response.data[Object.keys(err.response.data)[0]]}
  //               />
  //             ),
  //             duration: 3000,
  //           });
  //         } else {
  //           noti({
  //             content: (
  //               <NotiTemplate
  //                 type={"alert"}
  //                 content="알 수 없는 오류가 발생하였습니다."
  //               />
  //             ),
  //             duration: 3000,
  //           });
  //         }
  //       },
  //     }
  //   );
  // };

  if (isMobile) {
    return <Alert label={"모바일에서는 지원되지 않습니다."} />;
  }

  return (
    <div css={wrapperCSS}>
      <div css={windowWrapperCSS}>
        <div css={sourceCodeDesktopItemWrapperCSS}>
          <div css={imageWrapperCSS} onClick={inputImageOnClickHandler}>
            {imageUrl ? (
              <img
                src={imageUrl}
                css={css`
                  height: 100%;
                  width: 100%;
                  object-fit: cover;
                `}
              />
            ) : (
              <img
                src={"/assets/Thumbnail.png"}
                css={css`
                  filter: invert(80%);
                  width: 70%;
                  height: auto;
                `}
              />
            )}
            <input
              ref={inputImageRef}
              type="file"
              accept="image/*"
              onChange={inputImageOnChangeHandler}
              css={css`
                display: none;
              `}
            />
          </div>

          <div css={textWrapperCSS}>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(() => e.target.value);
              }}
              placeholder={"Input the title, please."}
              theme={"default"}
              css={css`
                height: 38px;
              `}
            ></Input>
            <Input
              placeholder={"Upload zip file only."}
              value={rootName}
              theme={"default"}
              css={css`
                height: 38px;
              `}
              disabled={true}
            >
              <Input.Right>
                <input
                  ref={inputFileRef}
                  formEncType="multipart/form-data"
                  onChange={inputFileOnChangeHandler}
                  type="file"
                  accept=".zip"
                  css={css`
                    display: none;
                  `}
                />
                <Button onClick={inputFileOnClickHandler} theme={"default"}>
                  Explore
                </Button>
              </Input.Right>
            </Input>

            <Textarea
              value={description}
              onChange={(e) => {
                setDescription(() => e.target.value);
              }}
              placeholder={"Input the description, please."}
              theme={"default"}
              customCss={css`
                flex: 1;
              `}
            />
            <div css={buttonWrapperCSS}>
              <Button
                onClick={() => {
                  router.push("/playground");
                }}
                theme={"grey"}
                css={css`
                  width: 96px;
                `}
              >
                Cancel
              </Button>
              <Button
                onClick={submitHandler}
                theme={"default"}
                css={css`
                  width: 96px;
                `}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const wrapperCSS = css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const windowWrapperCSS = css`
  @media ${mediaQuery.tablet} {
    width: 90%;
  }
  @media ${mediaQuery.overTablet} {
    margin-top: 96px;
    width: 60%;

    max-width: 1080px;
  }
`;

export const sourceCodeDesktopItemWrapperCSS = css`
  width: 100%;
  height: 400px;
  min-height: 230px;
  max-height: 300px;

  border-radius: 4px;
  display: flex;
  overflow: hidden;

  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 40px 1px rgba(0, 0, 0, 0.1);
`;

const textWrapperCSS = css`
  padding: 24px;
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const inputFieldCSS = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const buttonWrapperCSS = css`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;
const imageWrapperCSS = css`
  flex: 3;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(250, 250, 250, 1);
  min-width: 170px;
  cursor: pointer;
  /* border-radius: 20px; */
`;

const titleWrapperCSS = css`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
  word-break: keep-all;
`;

const createdAtWrapperCSS = css`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;
export default SourceCodeCreate;
