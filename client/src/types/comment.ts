import { pageablePageType, pageableSliceType } from "./common";

export type getCommentsItemType = {
  id: number;
  userId: number;
  username: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  childrenCommentsCount: number;
};

export type pageableSliceCommentsResponseType = pageableSliceType & {
  content: getCommentsItemType[];
};
