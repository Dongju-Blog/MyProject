import axios from "axios";
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

//-----------------------------------------------------------------------------------------------------------

// 액세스 토큰이 만료된 경우 새로운 액세스 토큰을 받아 다시 요청을 보내는 함수 (공통)
const getNewAccessToken = async (error: any) => {
  // 가로챈 에러의 코드가 '1'이 아닌 경우, 액세스 토큰 만료로 인한 에러가 아닌 것으로 판단하고 즉시 에러 Throw
  if (error?.response?.data?.code !== "1" && error?.response?.request?.status !== 500 ) {
    throw error;
  }

  // 아래부터 RefreshToken 요청

  // 쿠키로부터 리프레시 토큰을 가져온다.
  const refreshToken = await getCookie("RefreshToken");

  // 리프레시 토큰의 값이 존재한다면
  if (refreshToken) {
    // 기존의 API를 복제
    const clonedRequest = await { ...error.config };

    // Authorization 헤더에 기존의 액세스 토큰 대신 리프레시 토큰을 설정
    clonedRequest.headers["Authorization"] = await `Refresh ${refreshToken}`;

    // 헤더에 리프레시 토큰이 담긴 채로 요청을 날림.
    const refreshResponse = await axios(clonedRequest)
      .then((res) => {
        return res.headers.authorization;
      })
      .catch((err) => {
        throw err;
      });

    // 새로 받은 액세스 토큰을 Axios의 Default Header로 설정
    axios.defaults.headers.authorization = await refreshResponse;

    // 기존에 복제한 API의 Authorization 헤더에 다시 액세스 토큰을 설정
    clonedRequest.headers["Authorization"] = await `Bearer ${refreshResponse}`;

    // 헤더에 새로운 액세스 토큰이 담긴 채로 요청을 날림.
    const accessResponse = await axios(clonedRequest)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });

    // 성공적으로 데이터를 받았다면 이를 반환
    if (accessResponse?.data) {
      return accessResponse;
    }
  }
};

//-----------------------------------------------------------------------------------------------------------

// 토큰이 요구되는 API에 토큰을 담아서 날림
tokenInstance.interceptors.request.use(
  (config) => {
    const accessToken = axios.defaults.headers.authorization;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {}
);

// 액세스 토큰이 만료된 경우를 처리
tokenInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const response = await getNewAccessToken(error);
    return response;
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

// 액세스 토큰이 만료된 경우를 처리
formDataTokenInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const response = await getNewAccessToken(error);
    return response;
  }
);
