import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import { getFileAPI } from "@/api/playground/getFileAPI";

type useGetExtractedDirPropsType = {
  url: string;
};

export type fileTreeType = {
  [prop: string]: { file: { [prop: string]: Blob }; dir: string[] };
}

function useGetExtractedDir({ url }: useGetExtractedDirPropsType) {
  const [zip, setZip] = useState(new JSZip());
  const [file, setFile] = useState<Blob>();
  const [zipData, setZipData] = useState<any>();
  const [fileTree, setFileTree] = useState<fileTreeType>();

  useEffect(() => {
    getFileAPI({
      url
    }).then((res) => {
      const blob = new Blob([res], { type: "application/zip" });
      setFile(() => blob);
      zip.loadAsync(blob).then((res) => {
        setZipData(() => res);
      });
    });
  }, []);

  useEffect(() => {
    const fileTree: fileTreeType = {};
    zip.forEach(function (relativePath, entry) {
      // const path = entry.name.split("/")
      // for(let i = 0; i < path.length; i++){
      //   if (path[i] in fileTree === false) {

      //   }
      // }
      if (entry.dir) {
        fileTree[entry.name] = {
          file: {},
          dir: [],
        };
      }
      // console.log(entry.dir ? "dir : " : "file : ",entry.name);
    });
    zip.forEach(function (relativePath, entry) {
      if (entry.dir) {
        const splitted = entry.name.split("/");
        const path = splitted.slice(0, splitted.length - 2).join("/") + "/";
        if (path in fileTree) {
          fileTree[path]["dir"].push(entry.name);
        }
        // const splitted = entry.name.split("/")
        // splitted.pop()
        // for(let i = splitted.length - 1; i >= 0; i--){
        //   const joined = splitted.join('/') + '/'
        //   if (joined in fileTree && joined !== path) {
        //     fileTree[joined]['directory'].push(entry.name)
        //   }
        //   splitted.pop()
        // }
      } else {
        const path = entry.name.substring(0, entry.name.lastIndexOf("/") + 1);
        if (path in fileTree) {
          entry.async("blob").then((res) => {
            fileTree[path]["file"][
              entry.name.substring(
                entry.name.lastIndexOf("/") + 1,
                entry.name.length
              )
            ] = res;
          });
        }
      }
    });

    setFileTree(() => fileTree);
  }, [zipData]);

  return fileTree;
}

export default useGetExtractedDir;
