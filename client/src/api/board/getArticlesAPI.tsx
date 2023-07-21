import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { getArticleResponseType, pageablePageArticlesResponseType } from "@/types/board"

type paramsType = {
  category: string
  page: number
}

type responseType = {
    status: number
    data: pageablePageArticlesResponseType
}

export const getArticlesAPI = ({category, page}: paramsType) => {

    return tokenInstance.get(`/board/${category}?page=${page}`)
      .then((response: responseType) => {
        console.log(response)
        return response.data;
      })
      .catch((err) => {
        console.log(err)
        throw err;
      });
  };

