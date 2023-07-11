import { defaultInstance } from "@/api/instance"
import { signupProcType } from "@/types/auth"




type paramsType = {
    body: signupProcType
}

type responseType = {
    status: number
    data: signupProcType
}

export const postSignupProcAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.post(`/user/signup_proc`, body)
        return response.data
    } catch (error: any) {
        throw error
    }
}

