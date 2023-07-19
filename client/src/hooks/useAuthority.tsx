import { postLoginAPI } from "@/api/auth/postLoginAPI";
import { getCookie, removeCookie, setCookie } from "@/api/cookie";
import { layoutTokenStatusType, loginBodyType } from "@/types/auth";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { storeUser } from "@/store/store";
import { getUserInfoAPI } from "@/api/auth/getUserInfoAPI";
import axios from "axios";
import useNotification from "@/components/Interface/StackNotification/useNotification";
import NotiTemplate from "@/components/Interface/StackNotification/NotiTemplate";

function useAuthority() {
  const [storeUserAtom, setStoreUserAtom] = useAtom(storeUser);
  const noti = useNotification();

  const loginHandler = (body: loginBodyType) => {
    if (body.username === "" || body.password === "") {
      noti({
        content: (
          <NotiTemplate
            type={"alert"}
            content={"회원 정보를 양식에 맞게 입력해 주세요."}
          />
        ),
      });
      return;
    }

    return postLoginAPI({ body })
      .then((res) => {
        // setCookie("Authorization", res.accessToken, { path: "/", maxAge: 2 * 60 * 60 })
        setStoreUserAtom((prev) => {
          return {
            ...prev,
            username: res.username,
            status: res.status,
            role: res.role,
          };
        });
        setCookie("RefreshToken", res.refreshToken, {
          path: "/",
          maxAge: 14 * 24 * 60 * 60,
        });
        axios.defaults.headers.authorization = res.accessToken;
        // router.push('/')
      })
      .catch((err) => {
        noti({
          content: (
            <NotiTemplate
              type={"alert"}
              content={`${err.response.data.message}`}
            />
          ),
        });
      });
  };

  const logoutHandler = async () => {
    await removeCookie("RefreshToken");
    axios.defaults.headers.authorization = await null;
    await setStoreUserAtom((prev) => {
      return {
        ...prev,
        username: null,
        status: "REQUIRE_LOGIN",
        role: "GUEST",
      };
    });
    return await true;
  };

  return { currentUser: storeUserAtom, loginHandler, logoutHandler };
}

function useAuthorityInit() {
  const router = useRouter();
  const [storeUserAtom, setStoreUserAtom] = useAtom(storeUser);
  const [isValidPage, setIsValidPage] = useState(false);

  useEffect(() => {
    if (storeUserAtom.role === null || storeUserAtom.role === null) {
      const user = localStorage.getItem("user")
      const parseUser = user && JSON.parse(user)

      if (parseUser) {
        setStoreUserAtom(() => parseUser)
      } else {
        getUserInfoHandler();
      }
    }
  }, []);

  const getUserInfoHandler = () => {
    getUserInfoAPI()
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res))
        setStoreUserAtom(() => {
          return {
            username: res.username,
            status: res.status,
            role: res.role,
          };
        });
      })
      .catch(() => {
        setStoreUserAtom((prev) => {
          return {
            ...prev,
            username: null,
            status: "REQUIRE_LOGIN",
            role: "GUEST",
          };
        });
      });
  };

  const _TARGET_URL: {
    [prop: string]: { [prop: string]: { url: string; message: string } };
  } = {
    ADMIN: {
      APPROVED: { url: "/", message: "" },
      // admin: { url: "/admin/confirm", message: "" },
    },
    GUEST: {
      REQUIRE_LOGIN: { url: "/login", message: "" },
    },
    USER: {
      APPROVED: { url: "/", message: "" },
    },
  };

  const _ALLOW_ONLY: { [prop: string]: layoutTokenStatusType } = {
    "/": {
      role: ["GUEST", "USER", "ADMIN"],
      status: ["APPROVED", "REQUIRE_LOGIN"],
    },
    "/user/change": { role: ["USER", "ADMIN"], status: ["APPROVED"] },
    "/login": { role: ["GUEST"], status: ["REQUIRE_LOGIN"] },
    "/signup": { role: ["GUEST"], status: ["REQUIRE_LOGIN"] },
    "/test": { role: ["USER"], status: ["APPROVED"] },
    "/admin/category": { role: ["ADMIN"], status: ["APPROVED"] },
    "/create": { role: ["ADMIN"], status: ["APPROVED"] },
  };

  useEffect(() => {
    const currentPage = _ALLOW_ONLY[router.pathname];

    if (currentPage) {
      if (storeUserAtom.role && storeUserAtom.status) {
        if (
          currentPage.role.includes(storeUserAtom.role) &&
          currentPage.status.includes(storeUserAtom.status)
        ) {
          setIsValidPage(() => true);
        } else {
          router.push(
            _TARGET_URL[storeUserAtom.role][storeUserAtom.status].url
          );
        }
      } else {
      }
    } else {
      setIsValidPage(() => true);
    }
  }, [storeUserAtom, router.pathname]);

  useEffect(() => {
    if (!isValidPage && storeUserAtom.role && storeUserAtom.status) {
      router.push(_TARGET_URL[storeUserAtom.role][storeUserAtom.status].url);
    }
  }, [isValidPage]);

  return { isValidPage, userInfo: storeUserAtom, getUserInfoHandler };
}

useAuthority.Init = useAuthorityInit;

export default useAuthority;
