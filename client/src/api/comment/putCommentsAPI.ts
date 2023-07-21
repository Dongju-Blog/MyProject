import { formDataTokenInstance, tokenInstance } from "@/api/instance";
import { putCommentBodyType } from "@/types/comment";
import { successReturnType, errorReturnType } from "@/types/common";

type paramsType = {
  id: number;
  body: putCommentBodyType;
};

type responseType = {
  status: number;
  data: successReturnType;
};

export const putCommentsAPI = async ({ id, body }: paramsType) => {
  try {
    const response: responseType = await tokenInstance.put(
      `/comment/${id}`,
      body
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
