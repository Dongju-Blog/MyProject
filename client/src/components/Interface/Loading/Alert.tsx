import React from "react";
import { css } from "@emotion/react";
import UseAnimations from "react-useanimations";
import alertTriangle from "react-useanimations/lib/alertTriangle";

type AlertPropsType = {
  label: string;
};

function Alert({ label }: AlertPropsType) {
  return (
    <div css={alertWrapperCSS}>
      <UseAnimations animation={alertTriangle} size={128} />
      <span>{label}</span>
    </div>
  );
}

const alertWrapperCSS = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export default Alert;
