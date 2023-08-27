import SourceCodeCreate, { sourceCodeUpdateData } from '@/components/Page/SourceCode/SourceCodeCreate'
import { css } from "@emotion/react";
import React, {useEffect, useState} from 'react'
import { useRouter } from "next/router";
import { getSourceCodeAPI } from '@/api/sourceCode/getSourceCodeAPI';
import Loading from '@/components/Interface/Loading/Loading';

function index() {
  const router = useRouter()
  const {sourceCodeId} = router.query
  const [updateData, setUpdateData] = useState<sourceCodeUpdateData>()
  
  useEffect(() => {
    if (sourceCodeId) {
      getSourceCodeAPI({id: Number(sourceCodeId)})
      .then((res) => {
        const updateData: sourceCodeUpdateData = {
          id: res.id,
          title: res.title,
          description: res.description,
          rootName: res.rootName,
          imageUrl: res.imageUrl
        }
        setUpdateData(() => updateData)
      })
    }
    
  }, [sourceCodeId])


  return (
    <React.Fragment>
      {updateData ? <SourceCodeCreate updateData={updateData} /> : <Loading label={"소스 코드를 가져오는 중입니다."} />}
    </React.Fragment>
  )
}


export default index