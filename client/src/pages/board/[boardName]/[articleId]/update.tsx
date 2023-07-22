import React, { useState, useEffect, useRef } from "react";

import { css } from "@emotion/react";
import Input from "@/components/Interface/Input/Input";
import Dropdown from "@/components/Interface/Dropdown/Dropdown";

import dynamic from "next/dynamic";
import { filesType, postArticleBodyType } from "@/types/board";
import CreateCategoryDropdown from "@/components/Page/Create/CreateCategoryDropdown";
import Button from "@/components/Interface/Button/Button";
import { postArticleAPI } from "@/api/board/postArticleAPI";
import mediaQuery from "@/util/responsive";
import markdownToTxt from "markdown-to-txt";
import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import Create from "@/components/Page/Create/Create";
import { useRouter } from "next/router";
import { getArticleAPI } from "@/api/board/getArticleAPI";
import { putArticleAPI } from "@/api/board/putArticleAPI";
import { update } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import CreateMarkdown from "@/components/Page/Create/CreateMarkdown";

// https://github.com/uiwjs/react-md-editor#support-nextjs

function index() {
  const router = useRouter()
  const [id, setId] = useState(-1);
  const [category, setCategory] = useState<number>(-1);
  const [content, setContent] = useState<string>(" ");
  const [files, setFiles] = useState<filesType>({});
  const [title, setTitle] = useState<string>("");
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const [isRepresentative, setIsRepresentative] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {boardName, articleId} = router.query
  
  useEffect(() => {
    if (boardName && articleId) {
      getArticleAPI({category: decodeURI(String(boardName)), id: Number(articleId)})
      .then((res) => {
        setCategory(() => res.boardId)
        setContent(() => res.content)
        setTitle(() => res.title)
        setIsSecret(() => res.isSecret)
        setIsRepresentative(() => res.isRepresentative)
        setId(() => res.id)
      })
    }
    
  }, [articleId])

  const putArticleMutation = useMutation(
    ({ id, body }: { id: number, body: postArticleBodyType }) =>
    putArticleAPI({ id, body })
  );

  const submitHandler = async () => {
    const fileUrls = await Object.keys(files).filter((el) =>
      content?.includes(el)
    );

    const formData: FormData = new FormData();

    fileUrls.forEach((el) => {
      formData.append("files", files[el]);
    });

    const preview = markdownToTxt(content)
      .substring(0, 400)
      .replace(/\n/g, " ");

    formData.append(
      "json",
      new Blob(
        [
          JSON.stringify({
            title,
            content,
            preview,
            isSecret,
            isRepresentative,
            boardId: category,
            fileUrls,
          }),
        ],
        { type: "application/json" }
      )
    );

    putArticleMutation.mutate({ id, body: formData }, {
      onSuccess: (res) => {
        queryClient.invalidateQueries([`Article`, `${articleId}`]).then(() => {
          router.replace('/board' + res.url)
        });
        
      }
    })

  };

  if (id) {
    return (
      <Create
        submitHandler={submitHandler}
        {...{
          category,
          setCategory,
          title,
          setTitle,
          content,
          setContent,
          files,
          setFiles,
          isSecret,
          setIsSecret,
          isRepresentative,
          setIsRepresentative,
        }}
      />
    );
  }
  
}

export default index;
