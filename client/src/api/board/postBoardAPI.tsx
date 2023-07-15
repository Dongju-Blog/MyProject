import { tokenInstance } from "@/api/instance"
import { postBoardBodyType } from "@/types/board"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: postBoardBodyType
}

type responseType = {
    status: number
    data: successReturnType
}



export const postBoardAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.post(`/board`, body)
        return response.data
    } catch (error: any) {
        throw error
    }
}

