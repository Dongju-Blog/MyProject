import { formDataTokenInstance, tokenInstance } from "@/api/instance"
import { postArticleBodyType, postArticleResponseType } from "@/types/board"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: postArticleBodyType
}

type responseType = {
    status: number
    data: postArticleResponseType
}



export const postArticleAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await formDataTokenInstance.post(`/board`, body)
        console.log(response)
        return response.data
    } catch (error: any) {
        throw error
    }
}

