import { tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"
import { userInfoResponseType } from "@/types/auth"


type paramsType = {
  id: number
}

type responseType = {
    status: number
    data: successReturnType
}

export const deleteSourceCodeAPI = ({id}: paramsType) => {
    return tokenInstance.delete(`/sourceCode/${id}`)
      .then((response: responseType) => {
        return response.data;
      })
      .catch((err) => {
        throw err;
      });
  };

