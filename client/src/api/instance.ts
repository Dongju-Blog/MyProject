import axios, { Axios } from "axios";
import { getCookie, removeCookie } from "./cookie";
import { storeUser } from "@/store/store";
import { atom } from "jotai";

/**
 * 인증이 필요 없는 기본 요청
 */
export const defaultInstance = axios.create({
  baseURL: "/api",
  withCredentials: false,
});

/**
 * 인증이 필요한 기본 요청
 */
export const tokenInstance = axios.create({
  baseURL: "/api",
});

/**
 * 인증이 필요 없는 formData 요청
 */
export const formDataInstance = axios.create({
  baseURL: "/api",
  withCredentials: false,
});

/**
 * 인증이 필요한 formData 요청
 */
export const formDataTokenInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const getNewAccessToken = async (response: any) => {
  // 헤더에 접근
  const accessToken = response.headers.authorization;

  // accessToken 상수에 액세스 토큰이 담겨 있다면
  if (accessToken) {
    // Axios의 default 헤더에 새로운 액세스 토큰 저장
    axios.defaults.headers.authorization = await accessToken;
    // 기존 API 복제
    const clonedRequest = await response.config;

    // 복제된 API는 기존의 액세스 토큰이 그대로 들어있으므로 Authorization 헤더에 새로운 액세스 토큰 설정
    clonedRequest.headers["Authorization"] = await `Bearer ${accessToken}`;

    // 헤더에 새로운 액세스 토큰이 담긴 채로 요청을 날림.
    return await axios(clonedRequest)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  } else {
    return null;
  }
};

//-----------------------------------------------------------------------------------------------------------

// 토큰이 요구되는 API에 토큰을 담아서 날림
tokenInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await axios.defaults.headers.authorization;

    if (accessToken) {
      config.headers["Authorization"] = await `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {}
);

tokenInstance.interceptors.response.use(
  async (response) => {
    const refreshResponse = await getNewAccessToken(response);
    if (refreshResponse !== null) {
      return refreshResponse;
    }
    return response;
  },
  (error) => {
    window.localStorage.removeItem("user");
  }
);

// ----------------------------------------------------------------------------------------

// 토큰이 요구되는 API에 토큰을 담아서 날림
formDataTokenInstance.interceptors.request.use(
  (config) => {
    const accessToken = axios.defaults.headers.authorization;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {} //{Promise.reject(error)}
);

formDataTokenInstance.interceptors.response.use(async (response) => {
  const refreshResponse = await getNewAccessToken(response);
  if (refreshResponse !== null) {
    return refreshResponse;
  }
  return response;
});
