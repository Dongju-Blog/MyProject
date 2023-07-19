import { tokenInstance } from "@/api/instance"
import { putBoardBodyType } from "@/types/board"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: putBoardBodyType
    id: number
}

type responseType = {
    status: number
    data: successReturnType
}



export const putAdminBoardAPI = async ({body, id}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.put(`/admin/board/${id}`, body)
        return response.data
    } catch (error: any) {
        throw error
    }
}

