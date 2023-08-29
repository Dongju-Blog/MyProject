// import React, { useEffect, useState } from "react";
// import SourceCodeIDEProcessCodeBlock from "./SourceCodeIDECodeBlocksItem";

// type SourceCodeIDECodeBlocksMapProcessPropsType = {
//   file: Blob;
//   type: string;
// };

// function SourceCodeIDECodeBlocksMapProcess({
//   type,
//   file,
// }: SourceCodeIDECodeBlocksMapProcessPropsType) {
//   const [content, setContent] = useState<string>("");

//   useEffect(() => {
//     const reader = new FileReader();
//     reader.readAsText(file);

//     reader.onload = () => {
//       setContent(() => String(reader.result));
//     };
//   }, [file]);

//   return <SourceCodeIDEProcessCodeBlock content={content} language={type} />;
// }

// export default SourceCodeIDECodeBlocksMapProcess;
