import { formDataTokenInstance, tokenInstance } from "@/api/instance"
import { postSourceCodeBodyType, postArticleResponseType } from "@/types/board"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    id: number
    body: postSourceCodeBodyType
}

type responseType = {
    status: number
    data: postArticleResponseType
}



export const putSourceCodeAPI = async ({id, body}: paramsType) => {
    try {
        const response: responseType = await formDataTokenInstance.put(`/sourceCode/${id}`, body)
        console.log(response)
        return response.data
    } catch (error: any) {
        throw error
    }
}

