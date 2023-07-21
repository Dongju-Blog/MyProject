import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { visibleUserInfoResponseType } from "@/types/auth"
import axios from "axios"



// type paramsType = {

// }

type responseType = {
    status: number
    data: visibleUserInfoResponseType
}





export const getVisibleUserInfoAPI = () => {
    return tokenInstance.get('/user/change')
      .then((response: responseType) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  };

