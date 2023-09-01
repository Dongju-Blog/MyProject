import SourceCodeIDE from "./SourceCodeIDE";
import React from "react";
import Loading from "@/components/Interface/Loading/Loading";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import Alert from "@/components/Interface/Loading/Alert";
import useSourceCodeAPI from "./useSourceCodeAPI";
import SourceCodeHeader from "./SourceCodeHeader";
import { SourceCodeContextProvider } from "./SourceCodeContext";

type SourceCodePropsType = {
  sourceCodeId: number;
};

function SourceCode({ sourceCodeId }: SourceCodePropsType) {
  const isMobile = useResponsive(mediaQuery.tablet);
  const sourceCodeAPI = useSourceCodeAPI();

  const sourceCodeQuery = sourceCodeAPI.sourceCodeQueryHandler(sourceCodeId);

  if (isMobile) {
    return <Alert label={"모바일에서는 지원되지 않습니다."} />;
  }

  if (sourceCodeQuery && sourceCodeQuery.isError) {
    return <Alert label={"소스 코드를 불러오지 못했습니다!"} />;
  }

  return (
    <React.Fragment>
      <SourceCodeContextProvider>
        {sourceCodeQuery.data && (
          <SourceCodeHeader
            sourceCodeId={sourceCodeId}
            sourceCodeQuery={sourceCodeQuery}
          />
        )}
        {sourceCodeQuery.data ? (
          <SourceCodeIDE
            url={sourceCodeQuery.data.fileUrl}
            rootName={sourceCodeQuery.data.rootName}
          />
        ) : (
          <Loading label={"데이터를 받아오는 중입니다."} />
        )}
      </SourceCodeContextProvider>
    </React.Fragment>
  );
}

export default SourceCode;
