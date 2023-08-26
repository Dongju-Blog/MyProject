import { defaultInstance, tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { pageableSliceCommentsResponseType } from "@/types/comment"

type paramsType = {
  url: string
}

type responseType = {
    status: number
    data: any
}

export const getFileAPI = ({url}: paramsType) => {

    return defaultInstance.get(`${url}`, { responseType: 'arraybuffer' })
      .then((response: responseType) => {
        return response.data
      })
      .catch((err) => {
        throw err;
      });
  };

