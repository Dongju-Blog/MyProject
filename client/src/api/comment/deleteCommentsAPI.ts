import { formDataTokenInstance, tokenInstance } from "@/api/instance";
import { putCommentBodyType } from "@/types/comment";
import { successReturnType, errorReturnType } from "@/types/common";

type paramsType = {
  id: number;
};

type responseType = {
  status: number;
  data: successReturnType;
};

export const deleteCommentsAPI = async ({ id }: paramsType) => {
  try {
    const response: responseType = await tokenInstance.delete(
      `/comment/${id}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
