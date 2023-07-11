import { defaultInstance } from "@/api/instance"
import { signupProcType } from "@/types/auth"
import { successReturnType } from "@/types/common"



type paramsType = {
    body: signupProcType
}

type responseType = {
    status: number
    data: successReturnType
}

export const postSignupAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.post(`/user/signup`, body)
        return response.data
    } catch (error: any) {
        throw error
    }
}

