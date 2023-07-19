import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { getAllBoardResponseType } from "@/types/board"


type responseType = {
    status: number
    data: getAllBoardResponseType
}

export const getAdminAllBoardAPI = () => {
    return tokenInstance.get('/admin/board')
      .then((response: responseType) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  };

