import React, { useState, useEffect, useRef } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { css } from "@emotion/react";
import Input from "@/components/Interface/Input/Input";
import Dropdown from "@/components/Interface/Dropdown/Dropdown";

import dynamic from "next/dynamic";
import { filesType } from "@/components/Page/Create/CreateMarkdown";
import CreateCategoryDropdown from "@/components/Page/Create/CreateCategoryDropdown";
import Button from "@/components/Interface/Button/Button";
const MDEditor = dynamic(
  () => import("@/components/Page/Create/CreateMarkdown"),
  { ssr: false }
);

// https://github.com/uiwjs/react-md-editor#support-nextjs

function index() {
  const [category, setCategory] = useState<number>(-1);
  const [value, setValue] = useState<string | undefined>();
  const [files, setFiles] = useState<filesType>({});

  const submit = async () => {
    const fileUrls = await Object.keys(files).filter((el) =>
      value?.includes(el)
    );
    let fileList: filesType = await files;
    await Object.keys(fileList).forEach((el, idx) => {
      if (!fileUrls.includes(el)) {
        delete fileList[el]
      }
    })

    console.log(fileList)

  };

  return (
    <div className="container" css={containerCSS} data-color-mode="light">
      <div css={inputWrapperCSS}>
        <CreateCategoryDropdown {...{ category, setCategory }} />
        <Input
          theme={"restraint"}
          customCss={inputCSS}
          placeholder="제목을 입력해 주세요."
        />
        <Button theme={"text"} onClick={submit}>
          Submit
        </Button>
      </div>
      <MDEditor {...{ value, setValue, files, setFiles }} />
    </div>
  );
}

const containerCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const editorCSS = css`
  width: 100%;
`;

const inputWrapperCSS = css`
  width: 100%;
  display: flex;
  /* gap: 16px; */
`;

const inputCSS = css`
  flex: 1;
  height: 24px;
`;

const dropdownCSS = css`
  width: 100px;
`;

export default index;
