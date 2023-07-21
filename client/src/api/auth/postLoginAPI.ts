import { defaultInstance } from "@/api/instance"
import { loginBodyType, loginResponseType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: loginBodyType
}

type responseType = {
    status: number
    data: loginResponseType
}



export const postLoginAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.post(`/user/login`, body)
        return response.data
    } catch (error: any) {
        console.log(error)
        throw error
    }
}

