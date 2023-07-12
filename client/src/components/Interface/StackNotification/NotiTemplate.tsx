import React from "react";
import { css } from "@emotion/react";
import UseAnimations from "react-useanimations";
import alertTriangle from "react-useanimations/lib/alertTriangle";
import arrowUp from "react-useanimations/lib/arrowUp";
import Button from "../Button/Button";

function NotiTemplate({
  type,
  content,
  buttons,
}: {
  type: string;
  content: string;
  buttons?: { label: string; function: Function }[];
}) {
  const renderButtons = (
    <div
      css={css`
        flex: 1;
        display: flex;
        gap: 8px;
        padding-top: 16px;
      `}
    >
      {buttons?.map((el, idx) => {
        return (
          <Button
            theme={"default"}
            onClick={() => {
              el.function();
            }}
            customCss={css`
              flex: 1;
            `}
          >
            {el.label}
          </Button>
        );
      })}
    </div>
  );

  const data: { [prop: string]: any } = {
    alert: (
      <div
        css={css`
          display: flex;
          align-items: center;
          width: 100%;
        `}
      >
        <UseAnimations animation={alertTriangle} size={82} />
        <div
          css={css`
            flex: 1;
            margin-right: 16px;
            display: flex;
            flex-direction: column;
          `}
        >
          {content}
          {buttons && renderButtons}
        </div>
      </div>
    ),
    ok: (
      <div
        css={css`
          display: flex;
          align-items: center;
          width: 100%;
          margin-left: 16px;
        `}
      >
        <UseAnimations
          animation={arrowUp}
          reverse={true}
          size={48}
          css={css`
            margin: 0px 16px 0px 0px;
          `}
        />
        <div
          css={css`
            flex: 1;
            margin-right: 16px;
            display: flex;
            flex-direction: column;
          `}
        >
          {content}
          {buttons && renderButtons}
        </div>
      </div>
    ),
  };
  return data[type];
}

export default NotiTemplate;
