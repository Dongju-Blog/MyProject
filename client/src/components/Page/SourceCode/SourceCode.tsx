import SourceCodeIDE from "./SourceCodeIDE";
import React, {useEffect} from "react";
import Loading from "@/components/Interface/Loading/Loading";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import Alert from "@/components/Interface/Loading/Alert";
import useSourceCodeAPI from "./useSourceCodeAPI";
import SourceCodeHeader from "./SourceCodeHeader";
import { SourceCodeContextProvider, useSourceCodeContext } from "./SourceCodeContext";

type SourceCodePropsType = {
  sourceCodeId: number;
};

function SourceCode({ sourceCodeId }: SourceCodePropsType) {
  const isMobile = useResponsive(mediaQuery.tablet);
  const {
    sourceCodeQueryData,
    setSourceCodeQueryData
  } = useSourceCodeContext();

  const sourceCodeAPI = useSourceCodeAPI();
  const sourceCodeQuery = sourceCodeAPI.sourceCodeQueryHandler(sourceCodeId);

  useEffect(() => {
    if (sourceCodeQuery.data) {
      setSourceCodeQueryData(() => sourceCodeQuery.data)
    }
  }, [sourceCodeQuery.data])

  if (isMobile) {
    return <Alert label={"모바일에서는 지원되지 않습니다."} />;
  }

  if (sourceCodeQuery && sourceCodeQuery.isError) {
    return <Alert label={"소스 코드를 불러오지 못했습니다!"} />;
  }

  return (
    <React.Fragment>
      
        {/* {sourceCodeQuery.data && (
          <SourceCodeHeader
            sourceCodeId={sourceCodeId}
            sourceCodeQuery={sourceCodeQuery}
          />
        )} */}
        {sourceCodeQueryData ? (
          <SourceCodeIDE
            url={sourceCodeQueryData.fileUrl}
            rootName={sourceCodeQueryData.rootName}
          />
        ) : (
          <Loading label={"데이터를 받아오는 중입니다."} />
        )}
      
    </React.Fragment>
  );
}

export default SourceCode;
