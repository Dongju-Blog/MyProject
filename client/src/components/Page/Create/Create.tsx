import React, { useState, useEffect, useRef } from "react";


import { css } from "@emotion/react";
import Input from "@/components/Interface/Input/Input";
import Dropdown from "@/components/Interface/Dropdown/Dropdown";

import dynamic from "next/dynamic";
import { filesType } from "@/types/board";
import CreateCategoryDropdown from "@/components/Page/Create/CreateCategoryDropdown";
import Button from "@/components/Interface/Button/Button";
import { postArticleAPI } from "@/api/board/postArticleAPI";
import mediaQuery from "@/util/responsive";
import markdownToTxt from 'markdown-to-txt';
import Wrapper from "@/components/Interface/Wrapper/Wrapper";
import Skeleton from "@/components/Interface/Loading/Skeleton";

const MDEditor = dynamic(
  () => import("@/components/Page/Create/CreateMarkdown"),
  { ssr: false }
);

const MDViewer = dynamic(
  () => import("@/components/Page/Article/ArticleViewer"),
  { ssr: false }
);

type CreatePropsType = {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  files: filesType
  setFiles: React.Dispatch<React.SetStateAction<filesType>>
  isSecret: boolean
  setIsSecret: React.Dispatch<React.SetStateAction<boolean>>
  isRepresentative: boolean
  setIsRepresentative: React.Dispatch<React.SetStateAction<boolean>>
  category: number
  setCategory: React.Dispatch<React.SetStateAction<number>>
  submitHandler: any;
}

function Create({title, setTitle, content, setContent, category, setCategory, files, setFiles, isSecret, setIsSecret, isRepresentative, setIsRepresentative, submitHandler}: CreatePropsType) {
  
  const [isLoading, setIsLoading] = useState(true)


  const viewerRef = useRef<HTMLDivElement>(null)



  return (
    <Wrapper className="container"  data-color-mode="light">
      <div css={containerCSS}>

      
      <div css={inputWrapperCSS}>

        <CreateCategoryDropdown {...{ category, setCategory }} />
        <Input
          theme={"none"}
          customCss={inputCSS}
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={(e) => {setTitle(() => e.target.value)}}
        />
        <div css={buttonWrapperCSS}>
          <div css={goBackButtonCSS}>
            <Button theme={"text"}>〈</Button>
          </div>
          <Button theme={"grey"} onClick={submitHandler} customCss={buttonCSS}>
            Submit
          </Button>
        </div>
        
      </div>
      
      <MDEditor key={JSON.stringify(category)} {...{ content, setContent, files, setFiles, isLoading, setIsLoading }} />
      {isLoading && <Skeleton css={css`flex: 1; width: 100%; height: 100%;`} />}
      </div>
    </Wrapper>
  );
}

const containerCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
  @media ${mediaQuery.mobile} {
    padding-top: 24px;
    
  }
  @media ${mediaQuery.desktop} {
    /* padding-top: 24px; */
  }
`;

const editorCSS = css`
  width: 100%;
`;

const inputWrapperCSS = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
    padding-right: 16px;
  
  

  @media ${mediaQuery.mobile} {
    flex-direction: column-reverse;
    align-items: flex-end;
    
    
  }
  @media ${mediaQuery.desktop} {
    gap: 8px;
    margin-bottom: 8px;

  }

`;

const inputCSS = css`
  flex: 1;
  height: 36px;

  
  & input {
    font-size: 16px;

    @media ${mediaQuery.mobile} {
      padding-left: 8px;
    }
  }

  @media ${mediaQuery.desktop} {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media ${mediaQuery.mobile} {
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  }
  
`;

const buttonWrapperCSS = css`
  
  display: flex;
  justify-content: space-between;
  @media ${mediaQuery.mobile} {
    margin-bottom: 16px;
    width: 100%;

  }
  @media ${mediaQuery.desktop} {
    width: 8vw;
    min-width: 100px;
  }
`

const buttonCSS = css`
  margin-left: 14px;
  margin-right: 8px;
  @media ${mediaQuery.desktop} {
    width: 100%;

  }
  @media ${mediaQuery.mobile} {
    min-width: 100px;

  }
`

const goBackButtonCSS = css`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 8px;
  
  & button {
    font-size: 24px;
  }
  @media ${mediaQuery.desktop} {
    display: none;
  }
`
export default Create