import React, { useRef, useState, useEffect, useMemo, useReducer } from "react";
import { css } from "@emotion/react";
import imageCompression from "browser-image-compression";
import { filesType } from "@/types/board";
import { Editor } from "@toast-ui/react-editor";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
// import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

import "@toast-ui/editor/dist/i18n/ko-kr";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

import prism from "prismjs";
import "prismjs/themes/prism.css";

// @ts-ignore
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import Skeleton from "@/components/Interface/Loading/Skeleton";
// @ts-ignore
// import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";

// const ffmpeg = createFFmpeg({
//   mainName: "main",
//   log: true,
//   corePath: "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
// });

// https://mdxeditor.dev/editor/docs/getting-started

type CreateMarkdownPropsType = {
  title: string
  files: filesType;
  setFiles: React.Dispatch<React.SetStateAction<filesType>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateMarkdown({
  title,
  content,
  setContent,
  files,
  setFiles,
  isLoading,
  setIsLoading,
}: CreateMarkdownPropsType) {
  const editorRef = useRef<Editor>(null);


  useEffect(() => {
    if (editorRef.current) {
      setIsLoading(() => false);
    }
  }, [editorRef]);

  return (
    <div
      css={css`
        flex: 1;
        width: 100%;
      `}
    >
      <Editor
        ref={editorRef}
        language="ko-KR"
        initialValue={content} // content는 글 수정시 사용
        onChange={() => {
          const value = editorRef.current
            ? editorRef.current.getInstance().getMarkdown()
            : content;
          setContent(() => value);
        }}
        placeholder="내용을 입력해주세요."
        previewStyle={"vertical"} // 미리보기 스타일 지정
        height="100%" // 에디터 창 높이
        initialEditType="markdown" // 초기 입력모드 설정(디폴트 markdown)
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: prism }]]}
        toolbarItems={[
          // 툴바 옵션 설정
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const file = blob as File;
            if (file.type === "video/mp4") {
              if (editorRef.current) {
                const url = URL.createObjectURL(file);
                editorRef.current.getInstance()
                  .insertText(`<video autoPlay loop muted playsInline width="100%" height="100%">
                  <source src="${url}" type="video/mp4" />
                </video>`);

                setFiles((prev) => {
                        return { ...prev, [`${url}`]: file };
                });
                return;
              }
            }

            if (title.includes('/noCompress')) {
              const url = URL.createObjectURL(file);
              setFiles((prev) => {
                return { ...prev, [`${url}`]: file };
              });
              callback(url, "image");
              return
            }

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

              setFiles((prev) => {
                return { ...prev, [`${url}`]: modifiedFile };
              });

              callback(url, "image");
            } catch (error) {
              console.log(error);
            }
          },
        }}
      ></Editor>
    </div>
  );
}

export default CreateMarkdown;
