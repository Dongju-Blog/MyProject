import { defaultInstance, tokenInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"



type responseType = {
    status: number
    data: successReturnType
}



export const postLogoutAPI = async () => {
    try {
        const response: responseType = await tokenInstance.post(`/user/logout`)
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error)
        throw error
    }
}

