import { defaultInstance, tokenInstance } from "@/api/instance"
import { changeUserInfoBodyType, signupProcType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: changeUserInfoBodyType
}

type responseType = {
    status: number
    data: signupProcType | successReturnType
}



export const postChangeUserInfoAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.post(`/user/change`, body)
        return response.data
    } catch (error: any) {
        throw error
    }
}

