import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"



// type paramsType = {

// }

type responseType = {
    status: number
    data: userInfoResponseType
}



// export const getUserInfoAPI = async () => {
//     try {
//     const response: responseType = await tokenInstance.get(`/user`)
//     return response.data
//     } 
//     catch (error: any) {
//         // throw error
//     }
// }

export const getUserInfoAPI = () => {
    return tokenInstance.get('/user')
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  };

