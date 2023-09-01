import React from "react";
import { getIcon, getAllIcons } from "material-file-icons";
import { css, SerializedStyles } from "@emotion/react";

type SourceCodeExplorerListItemIcon = {
  name: string;
  css: SerializedStyles;
} & React.HTMLAttributes<HTMLDivElement>;

function SourceCodeExplorerListItemIcon({
  name,
  ...props
}: SourceCodeExplorerListItemIcon) {
  return (
    <React.Fragment>
      <div {...props} dangerouslySetInnerHTML={{ __html: getIcon(name).svg }} />
    </React.Fragment>
  );
}

const iconCSS = css`
  width: 18px;
  height: 18px;
`;
export default SourceCodeExplorerListItemIcon;
