import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { getSourceCodeResponseType } from "@/types/board"

type paramsType = {
  id: number
}

type responseType = {
    status: number
    data: getSourceCodeResponseType
}

export const getSourceCodeAPI = ({id}: paramsType) => {
    return tokenInstance.get(`/sourceCode/${id}`)
      .then((response: responseType) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  };

