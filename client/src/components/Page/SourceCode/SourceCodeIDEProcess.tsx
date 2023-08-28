import React, {useEffect, useState} from 'react'
import SourceCodeIDEProcessCodeBlock from './SourceCodeIDEProcessCodeBlock'

type SourceCodeIDEProcessPropsType = {
  file: Blob
  type: string
}

function SourceCodeIDEProcess({type, file}: SourceCodeIDEProcessPropsType) {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    const reader = new FileReader()
    reader.readAsText(file)

    reader.onload = () => {
      setContent(() => String(reader.result))
    }

  }, [file])

  return <SourceCodeIDEProcessCodeBlock content={content} language={type} />
}

export default SourceCodeIDEProcess