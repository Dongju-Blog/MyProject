import { formDataTokenInstance, tokenInstance } from "@/api/instance"
import { postArticleBodyType, postArticleResponseType } from "@/types/board"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    id: number
    body: postArticleBodyType
}

type responseType = {
    status: number
    data: postArticleResponseType
}



export const putArticleAPI = async ({id, body}: paramsType) => {
    try {
        const response: responseType = await formDataTokenInstance.put(`/board/${id}`, body)
        console.log(response)
        return response.data
    } catch (error: any) {
        throw error
    }
}

