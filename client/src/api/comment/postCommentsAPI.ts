import { formDataTokenInstance, tokenInstance } from "@/api/instance"
import { postCommentBodyType } from "@/types/comment"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: postCommentBodyType
}

type responseType = {
    status: number
    data: successReturnType
}



export const postCommentAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.post(`/comment`, body)
        console.log(response)
        return response.data
    } catch (error: any) {
        throw error
    }
}

