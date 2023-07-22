import { pageablePageType, pageableSliceType } from "./common"

export type getAllBoardResponseType = boardItemType[]

export type boardItemType = {
  viewOrder: number
  isSecret: boolean
  name: string
  id: number
}

export type getActiveBoardResponseType = activeBoardItemType[]

export type activeBoardItemType = {
  name: string
  id: number
}

export type boardsOrdersBodyType = {
  ids: number[]
}

export type postBoardBodyType = {
  name: string
}

export type putBoardBodyType = {
  name: string
  isSecret: boolean
}

export type filesType = {
  [prop: string]: File;
};

export type postArticleBodyType = FormData

// export type postArticleBodyType = {
//   title: string;
//   content: string;
//   isSecret: boolean;
//   isRepresentative: boolean;
//   boardId: string;
//   files: filesType;
// }

export type getArticleResponseType = {
  title: string;
  content: string;
  isSecret: boolean;
  isRepresentative: boolean;
  id: number;
  boardId: number;
  createdAt: string
  updatedAt: string
}

export type getArticlesItemType = {
  title: string
  id: number
  preview: string
  thumbnail: string
  createdAt: string
  updatedAt: string
  boardName: string
}

export type postArticleResponseType = {
  url: string
}

export type pageablePageArticlesResponseType = pageablePageType & {content: getArticlesItemType[]}

export type mobileArticlesResponseType = {
  content: getArticlesItemType[]
  last: boolean;
  nextLastId: number;
}
