import Button from "@/components/Interface/Button/Button";
import Textarea from "@/components/Interface/Textarea/Textarea";
import { SerializedStyles, css } from "@emotion/react";
import React from "react";

type ArticleCommentsTextareaPropsType = {
  inputState: string;
  setInputState: (value: React.SetStateAction<string>) => void;
  submitHandler: any;
  customCss?: SerializedStyles | SerializedStyles[];
  cancelHandler?: any;
};
function ArticleCommentsTextarea({
  inputState,
  setInputState,
  submitHandler,
  customCss,
  cancelHandler
}: ArticleCommentsTextareaPropsType) {
  return (
    <Textarea
      value={inputState}
      onChange={(e) => {
        setInputState(() => e.target.value);
      }}
      theme={"default"}
      css={
        Array.isArray(customCss)
          ? [textareaCSS, ...customCss]
          : [textareaCSS, customCss]
      }
      placeholder="댓글을 입력해 주세요!"
    >
      <Textarea.Bottom>
        <div css={textareaButtonWrapperCSS}>
          
          {cancelHandler && <Button theme={"text"} css={buttonCSS} onClick={cancelHandler}>
            Cancel
          </Button>}
          <Button theme={"text"} css={buttonCSS} onClick={submitHandler}>
            Submit
          </Button>
        </div>
      </Textarea.Bottom>
    </Textarea>
  );
}

const textareaButtonWrapperCSS = css`
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: flex-end;
  /* background-color: rgba(0, 0, 0, 0.03); */
  background-color: #f3f6ff85;
`;

const buttonCSS = css`
  width: 80px;
  /* width: 10vw; */
  font-weight: 500;
`;

const textareaCSS = css`
  min-height: 80px;
  
`;

export default ArticleCommentsTextarea;
