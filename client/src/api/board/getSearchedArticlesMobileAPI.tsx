import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { getArticleResponseType, mobileArticlesResponseType } from "@/types/board"

type paramsType = {
  searchKeyword: string
  size: number
  lastId: number

}

type responseType = {
    status: number
    data: mobileArticlesResponseType
}

export const getSearchedArticlesMobileAPI = ({searchKeyword, size, lastId}: paramsType) => {

    return tokenInstance.get(`/board/mobile/search/${searchKeyword}?lastId=${lastId}&size=${size}`)
      .then((response: responseType) => {
        console.log(response)
        return response.data;
      })
      .catch((err) => {
        console.log(err)
        throw err;
      });
  };

