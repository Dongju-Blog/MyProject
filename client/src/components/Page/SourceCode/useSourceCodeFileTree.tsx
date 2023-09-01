import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import { getFileAPI } from "@/api/playground/getFileAPI";
import { fileIndexesType, fileTreeType, useSourceCodeContext } from "./SourceCodeContext";

type useSourceCodeFileTreePropsType = {
  url: string;
  rootName: string
};

// export type fileTreeType = {
//   [prop: string]: { file: { [prop: string]: Blob }; dir: string[] };
// }

// export type fileIndexesType = {
//   [prop: string]: string
// }

function useSourceCodeFileTree({ url, rootName }: useSourceCodeFileTreePropsType) {
  const [zip, setZip] = useState(new JSZip());
  const [file, setFile] = useState<Blob>();
  const [zipData, setZipData] = useState<any>();
  // const [fileTree, setFileTree] = useState<fileTreeType>();
  // const [fileIndexes, setFileIndexes] = useState<fileIndexesType>()

  const {fileTree, setFileTree, fileIndexes, setFileIndexes} = useSourceCodeContext()

  useEffect(() => {
    getFileAPI({
      url
    }).then((res) => {
      const blob = new Blob([res], { type: "application/zip" });
      setFile(() => blob);
      zip.loadAsync(blob).then((res) => {
        setZipData(() => res);
      });
      console.log("file!!!!", res)
    });
  }, []);

  useEffect(() => {
    console.log(file)
  }, [file])

  useEffect(() => {
    const root = `root/${rootName}/`

    // 최상위 폴더 root 생성.
    // root를 생성하지 않으면 원래 zip 파일에 존재하던 최상위 폴더 내의 파일, 폴더가 보이지 않음
    const fileTree: fileTreeType = {
      "root/": {
        file: {},
        dir: [root]
      },
      [root]: {
        file: {},
        dir: []
      }
    };

    const fileIndexes: fileIndexesType = {}
    
    zip.forEach(function (relativePath, entry) {
      // 가상으로 최상위 폴더 root를 생성했기 때문에 root를 붙여서 entry.name을 추가한다.
      if (entry.dir) {
        fileTree[root + entry.name] = {
          file: {},
          dir: [],
        };
      }

    });
    zip.forEach(function (relativePath, entry) {
      if (entry.dir) {
        const splitted = entry.name.split("/");
        const path = splitted.slice(0, splitted.length - 2).join("/") + "/";
        if (root + path in fileTree) {
          fileTree[root + path]["dir"].push(root + entry.name);
        }

        // 최상위 폴더의 path 상수는 "/"이다. 그렇게 되면 위 조건으로는 "root//"가 되버리기 때문에 아래의 조건을 추가해준다.
        if (path === "/") {
          fileTree[root]["dir"].push(root + entry.name);
        }

      } else {
        const path = entry.name.substring(0, entry.name.lastIndexOf("/") + 1);
        const name = entry.name.substring(entry.name.lastIndexOf("/") + 1, entry.name.length);
        
        if (root + path in fileTree) {
          entry.async("blob").then((res) => {
            fileTree[root + path]["file"][name] = res;
          });
          fileIndexes[name.split('.')[0]] = root + path + name
        }




      }
    });
    setFileIndexes(() => fileIndexes)
    setFileTree(() => fileTree);
  }, [zipData]);

  return {fileTree, fileIndexes};
}

export default useSourceCodeFileTree;
