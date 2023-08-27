import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { pageablePageSourceCodesResponseType } from "@/types/board"

type paramsType = {
  page: number
}

type responseType = {
    status: number
    data: pageablePageSourceCodesResponseType
}

export const getSourceCodesAPI = ({page}: paramsType) => {

    return tokenInstance.get(`/sourceCode?page=${page}`)
      .then((response: responseType) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  };

