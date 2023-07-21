import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { getArticleResponseType } from "@/types/board"

type paramsType = {
  category: string
  id: number
}

type responseType = {
    status: number
    data: successReturnType
}

export const deleteArticleAPI = ({category, id}: paramsType) => {
    return tokenInstance.delete(`/board/${category}/${id}`)
      .then((response: responseType) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  };

