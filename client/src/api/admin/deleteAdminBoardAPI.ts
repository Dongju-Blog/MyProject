import { tokenInstance } from "@/api/instance"
import { putBoardBodyType } from "@/types/board"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    id: number
}

type responseType = {
    status: number
    data: successReturnType
}



export const deleteAdminBoardAPI = async ({id}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.delete(`/admin/board/${id}`)
        return response.data
    } catch (error: any) {
        throw error
    }
}

