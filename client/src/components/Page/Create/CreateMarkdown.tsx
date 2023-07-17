import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi,
} from "@uiw/react-md-editor";
import { debounce } from "lodash";
import imageCompression from "browser-image-compression";

type CreateMarkdownPropsType = {
  files: filesType;
  setFiles: React.Dispatch<React.SetStateAction<filesType>>;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type filesType = {
  [prop: string]: File;
};

function CreateMarkdown({
  value,
  setValue,
  files,
  setFiles,
}: CreateMarkdownPropsType) {
  const [fileNameCache, setFileNameCache] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const inputFileChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0 && fileNameCache) {
      const file = e.target.files[0];
      const options = {
        maxSizeMB: 1, // 이미지 최대 용량
        maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const url = URL.createObjectURL(compressedFile);
        setFiles((prev) => {
          return { ...prev, [`${url}`]: compressedFile };
        });
        setValue((prev) => {
          let renew;
          if (prev) {
            renew = prev.replace(`image-${fileNameCache}`, url);
          }
          return renew;
        });

        setFileNameCache(() => null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const imageUpload: ICommand = {
    name: "Upload Image",
    keyCommand: "imageUpload",
    buttonProps: { "aria-label": "Insert title3" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 20 20">
        <path
          fill="currentColor"
          d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
        ></path>
      </svg>
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
      if (inputFileRef.current) {
        inputFileRef.current.click();
        const randomString = Math.random().toString(36).substring(2, 12);
        setFileNameCache(() => randomString);
        let modifyText = `![](image-${randomString})\n`;
        api.replaceSelection(modifyText);
      }
    },
  };

  return (
    <div
      css={css`
        height: 80%;
        width: 100%;
      `}
    >
      <input
        onChange={inputFileChangeHandler}
        type={"file"}
        ref={inputFileRef}
        css={css`
          display: none;
        `}
      />

      <MDEditor
        value={value}
        onChange={setValue}
        extraCommands={[imageUpload]}
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      {JSON.stringify(files)}
    </div>
  );
}

export default CreateMarkdown;
