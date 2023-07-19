import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { getActiveBoardResponseType } from "@/types/board"


type responseType = {
    status: number
    data: getActiveBoardResponseType
}

export const getActiveBoardAPI = () => {
    return tokenInstance.get('/board')
      .then((response: responseType) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err)
        throw err;
      });
  };

