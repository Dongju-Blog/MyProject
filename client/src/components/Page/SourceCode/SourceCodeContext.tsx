import React, {useState, ReactNode, useContext} from 'react'
import { fileTreeType } from './useSourceCodeFileTree';


type contextType = {
  fileTree: fileTreeType;
  setFileTree: React.Dispatch<React.SetStateAction<fileTreeType>>
}

const SourceCodeContext = React.createContext<contextType | null>(null);

export const useSourceCodeContext = () => {
  const context = useContext(SourceCodeContext)
  if (context === null) {
    throw Error("useSourceCodeContext를 사용하기 위해서는 상위 컴포넌트에 SourceCodeContextProvider가 존재해야 합니다.");
  }
  return context
}

export const SourceCodeContextProvider = ({children}: {children: ReactNode}) => {
  const [fileTree, setFileTree] = useState<fileTreeType>({})
  return (
    <SourceCodeContext.Provider
      value={{
        fileTree,
        setFileTree
      }}
    >{children}</SourceCodeContext.Provider>
  )
}
