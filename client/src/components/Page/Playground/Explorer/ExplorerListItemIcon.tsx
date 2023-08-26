import React from "react";
import { getIcon, getAllIcons } from "material-file-icons";
import { css, SerializedStyles } from "@emotion/react";

type ExplorerListItemIcon = {
  name: string;
  css: SerializedStyles
} & React.HTMLAttributes<HTMLDivElement>;

function ExplorerListItemIcon({ name, ...props }: ExplorerListItemIcon) {
  return (
    <React.Fragment>
      <div
        {...props}
        dangerouslySetInnerHTML={{ __html: getIcon(name).svg }}
      />
    </React.Fragment>
  );
}

const iconCSS = css`
  width: 18px;
  height: 18px;
`;
export default ExplorerListItemIcon;
