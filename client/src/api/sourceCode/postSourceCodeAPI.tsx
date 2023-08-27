import { formDataTokenInstance, tokenInstance } from "@/api/instance"
import { postSourceCodeBodyType, postSourceCodeResponseType } from "@/types/board"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: postSourceCodeBodyType
}

type responseType = {
    status: number
    data: postSourceCodeResponseType
}



export const postSourceCodeAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await formDataTokenInstance.post(`/sourceCode`, body)
        console.log(response)
        return response.data
    } catch (error: any) {
        console.log(error)
        throw error
    }
}

