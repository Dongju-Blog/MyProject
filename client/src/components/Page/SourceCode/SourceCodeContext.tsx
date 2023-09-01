import React, {useState, ReactNode, useContext, useMemo} from 'react'





const SourceCodeContext = React.createContext<contextType | null>(null);

export const useSourceCodeContext = () => {
  const context = useContext(SourceCodeContext)
  if (context === null) {
    throw Error("useSourceCodeContext를 사용하기 위해서는 상위 컴포넌트에 SourceCodeContextProvider가 존재해야 합니다.");
  }
  return context
}




export type fileTreeType = {
  [prop: string]: { file: string[]; dir: string[] };
}

export type fileIndexesType = {
  [prop: string]: string
}

export type fileContentsType = {
  [prop: string]: Blob
}

export type selectFileHandlerType = ({
  pathIncludeName,
}: {
  pathIncludeName: string;
}) => void;

type contextType = {
  fileTree: fileTreeType;
  setFileTree: React.Dispatch<React.SetStateAction<fileTreeType>>
  fileIndexes: fileIndexesType
  setFileIndexes: React.Dispatch<React.SetStateAction<fileIndexesType>>
  fileContents: fileContentsType
  setFileContents: React.Dispatch<React.SetStateAction<fileContentsType>>
  selectedFilesTab: Set<string>
  setSelectedFilesTab: React.Dispatch<React.SetStateAction<Set<string>>>
  selectedFileNameIncludePath: string
  setSelectedFileNameIncludePath: React.Dispatch<React.SetStateAction<string>>
  selectedFileIndex: number
  setSelectedFileIndex: React.Dispatch<React.SetStateAction<number>>
  selectFileHandler: selectFileHandlerType
}

// export const SourceCodeContextProvider: React.Provider<contextType> = SourceCodeContext.Provider as any;

export const SourceCodeContextProvider = ({children}: {children: ReactNode}) => {
  const [fileTree, setFileTree] = useState<fileTreeType>({})
  const [fileIndexes, setFileIndexes] = useState<fileIndexesType>({})
  const [fileContents, setFileContents] = useState<fileContentsType>({})
  const [selectedFilesTab, setSelectedFilesTab] = useState<Set<string>>(new Set());
  const [selectedFileNameIncludePath, setSelectedFileNameIncludePath] = useState<string>("");
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(-1);

  const selectFileHandler: selectFileHandlerType = ({
    pathIncludeName,
  }: {
    pathIncludeName: string;
  }) => {
    let temp = new Set();
    setSelectedFilesTab((prev) => {
      const newSet = new Set(prev);
      newSet.add(pathIncludeName);
      temp = newSet;
      return newSet;
    });
    setSelectedFileIndex(() => Array.from(temp).indexOf(pathIncludeName));
  };

  return (
    <SourceCodeContext.Provider
      value={{
        fileTree,
        setFileTree,
        fileIndexes,
        setFileIndexes,
        fileContents,
        setFileContents,
        selectedFilesTab,
        setSelectedFilesTab,
        selectedFileNameIncludePath,
        setSelectedFileNameIncludePath,
        selectedFileIndex,
        setSelectedFileIndex,
        selectFileHandler


      }}
    >{children}</SourceCodeContext.Provider>
  )
}

