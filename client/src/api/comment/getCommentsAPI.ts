import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { pageableSliceCommentsResponseType } from "@/types/comment"

type paramsType = {
  page: number;
  articleId: number;
  parentCommentId: number | null;
}

type responseType = {
    status: number
    data: pageableSliceCommentsResponseType
}

export const getCommentsAPI = ({page, articleId, parentCommentId}: paramsType) => {

    return tokenInstance.get(`/comment?page=${page}&articleId=${articleId}${parentCommentId ? `&parentCommentId=${parentCommentId}` : ""}`)
      .then((response: responseType) => {
        console.log(response)
        return response.data;
      })
      .catch((err) => {
        console.log(err)
        throw err;
      });
  };

