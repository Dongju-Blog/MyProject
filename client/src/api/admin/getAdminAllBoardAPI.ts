import { defaultInstance, tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"
import axios from "axios"
import { getAllBoardResponseType } from "@/types/board"


type responseType = {
    status: number
    data: getAllBoardResponseType
}

// export const getAdminAllBoardAPI = () => {
//     return tokenInstance.get('/admin/board')
//       .then((response: responseType) => {
//         console.log(response)
//         return response.data;
//       })
//       .catch((err) => {
//         console.log(err)
//         throw err;
//       });
//   };

  export const getAdminAllBoardAPI = async () => {
    try {
        const response: responseType = await tokenInstance.get(`/admin/board`)
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error)
        throw error
    }
}

