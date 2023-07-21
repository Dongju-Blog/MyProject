import { tokenInstance } from "@/api/instance"
import { boardsOrdersBodyType } from "@/types/board"
import { successReturnType, errorReturnType } from "@/types/common"



type paramsType = {
    body: boardsOrdersBodyType
}

type responseType = {
    status: number
    data: successReturnType
}



export const putAdminBoardsOrdersAPI = async ({body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.put(`/admin/board`, body)
        return response.data
    } catch (error: any) {
        throw error
    }
}

