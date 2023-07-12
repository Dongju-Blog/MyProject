import { defaultInstance } from "@/api/instance"
import { accountRecoveryBodyType } from "@/types/auth"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: accountRecoveryBodyType
}

type responseType = {
    status: number
    data: successReturnType
}



export const postUsernameRecoveryAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await defaultInstance.post(`/user/find_username`, body)
        return response.data
    } catch (error: any) {
        throw error
    }
}

