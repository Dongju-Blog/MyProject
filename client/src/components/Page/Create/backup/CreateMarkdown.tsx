// import React, { useRef, useState, useEffect, useMemo, useReducer } from "react";
// import dynamic from "next/dynamic";
// import { css } from "@emotion/react";
// // import MDEditor, {
// //   commands,
// //   ICommand,
// //   TextState,
// //   TextAreaTextApi,
// // } from "@uiw/react-md-editor";
// import { debounce, throttle } from "lodash";
// import imageCompression from "browser-image-compression";
// import { filesType } from "@/types/board";

// type CreateMarkdownPropsType = {
//   files: filesType;
//   setFiles: React.Dispatch<React.SetStateAction<filesType>>;
//   value: string | undefined;
//   setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
// };




// function CreateMarkdown({
//   value,
//   setValue,
//   files,
//   setFiles,
// }: CreateMarkdownPropsType) {
//   const [fileNameCache, setFileNameCache] = useState<Array<string>>([]);
//   const inputFileRef = useRef<HTMLInputElement>(null);

//   const inputFileChangeHandler = async (
//     e: React.ChangeEvent<HTMLInputElement>, idx: number
//   ) => {
//     console.log(idx)
//     if (e.target.files && e.target.files.length > 0 && fileNameCache) {
//       const file = e.target.files[e.target.files.length - 1];
//       const options = {
        
//         maxSizeMB: 1, // 이미지 최대 용량
//         maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
//         useWebWorker: true,
//         fileType: 'image/png',
//       };
//       try {
//         const compressedFile = await imageCompression(file, options);
//         const modifiedFile = new File([compressedFile], `${fileNameCache[idx]}.png`, { type: file.type });
//         const url = URL.createObjectURL(modifiedFile);
        
//         setValue((prev) => {
//           let renew;
//           if (prev) {
//             renew = prev.replace(`image-${fileNameCache[idx]}`, url);
//           }
//           return renew;
//         });
//         setFiles((prev) => {
//           return { ...prev, [`${url}`]: modifiedFile };
//         });
        
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

 

//   const imageUpload: ICommand = {
//     name: "Upload Image",
//     keyCommand: "imageUpload",
//     buttonProps: { "aria-label": "Insert title3" },
//     icon: (
//       <svg width="12" height="12" viewBox="0 0 20 20">
//         <path
//           fill="currentColor"
//           d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
//         ></path>
//       </svg>
//     ),
//     execute: (state: TextState, api: TextAreaTextApi) => {
//       if (inputFileRef.current) {
//         inputFileRef.current.click();
//         const randomString = Math.random().toString(36).substring(2, 12);
//         setFileNameCache((prev) => [...prev, randomString]);
//         let modifyText = `![](image-${randomString})\n`;
//         api.replaceSelection(modifyText);
//       }
//     },
//   };

//   const editor = useMemo(debounce(() => {
//     return (
//       <MDEditor
//         value={value}
//         onChange={setValue}
//         extraCommands={[imageUpload]}
//         // preview={"edit"}
//       />
//     )
//   }, 1000, {trailing: false, leading: true}), [value])

//   return (
//     <div
//       css={css`
//         height: 80%;
//         width: 100%;
//       `}
//     >
//       <input
//         onChange={(e) => inputFileChangeHandler(e, fileNameCache.length - 1)}
//         type={"file"}
//         ref={inputFileRef}
//         multiple={true}
//         css={css`
//           display: none;
//         `}
//       />

//       {/* <MDEditor
//         value={value}
//         onChange={setValue}
//         extraCommands={[imageUpload]}
//       /> */}
//       {editor}


//     </div>
//   );
// }

// export default React.memo(CreateMarkdown);
