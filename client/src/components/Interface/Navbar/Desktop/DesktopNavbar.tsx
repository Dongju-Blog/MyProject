import React, { useState, ReactNode, useEffect } from "react";
import { css } from "@emotion/react";
import { categoryType } from "../Navbar";
import DesktopNavbarCategory from "./DesktopNavbarCategory";
import Button from "../../Button/Button";
import { useRouter } from "next/router";
import useAuthority from "@/hooks/useAuthority";
import { desktopNavBarExclude } from "@/constants/config";
import Input from "../../Input/Input";
import { SEARCH_ICON } from "@/components/Assets/CommonIcons";

type DesktopNavbarPropsType = {
  categoryList: categoryType[];
  isTop: boolean;
};

function DesktopNavbar({ categoryList, isTop }: DesktopNavbarPropsType) {
  const router = useRouter();
  const auth = useAuthority();
  const [searchInputState, setSearchInputState] = useState("")

  const renderCategory = categoryList.map((category) => {
    return <DesktopNavbarCategory category={category} />;
  });

  const forUser = (
    <React.Fragment>
      {auth.currentUser.role === "ADMIN" && (
        <Button
          theme={"default"}
          onClick={() => {
            router.push("/admin/category");
          }}
        >
          Settings
        </Button>
      )}
      <div
        css={css`
          font-weight: 500;
          color: rgba(0, 0, 0, 0.6);
        `}
      >
        Welcome,{" "}
        <span
          css={usernameWrapperCSS}
          onClick={() => {
            router.push("/user/change");
          }}
        >
          {auth.currentUser.username}
        </span>
      </div>
      <Button
        theme={"text"}
        onClick={() => {
          auth.logoutHandler();
        }}
      >
        Logout
      </Button>
    </React.Fragment>
  );

  const forGuest = (
    <React.Fragment>
      <Button
        theme={"text"}
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </Button>
      <Button
        theme={"default"}
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign Up
      </Button>
    </React.Fragment>
  );

  const searchHandler = () => {
    router.push(`/search?keyword=${searchInputState}`)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };


  if (!desktopNavBarExclude.includes(router.pathname)) {
    return (
      <div css={navbarWrapperCSS({ isTop })}>
        <div css={categoryWrapperCSS}>
          {renderCategory}
          <div>
            <Input theme={"navBar"} placeholder={"Enter a search keyword."} css={inputCSS} value={searchInputState} onChange={(e) => setSearchInputState(() => e.target.value)} onKeyDown={handleKeyDown} >
              <Input.Right>
                <div css={searchIconWrapperCSS} onClick={searchHandler}>{SEARCH_ICON}</div>
              </Input.Right>
            </Input>
          </div>
        </div>
        <div css={rightSectionCSS}>
          {auth.currentUser.username ? forUser : forGuest}
        </div>
      </div>
    );
  }
}

const navbarWrapperCSS = ({ isTop }: { isTop: boolean }) => {
  return css`
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--desktop-navbar-height);
    transition: background-color 1s, box-shadow 1s;
    background-color: ${!isTop && `rgba(255, 255, 255, 0.6)`};
    backdrop-filter: ${!isTop && `blur(10px)`};
    box-shadow: ${!isTop && `0px 0px 30px 1px rgba(0, 0, 0, 0.2)`};
    z-index: 20;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
};

const categoryWrapperCSS = css`
  display: flex;
  gap: 16px;
`;

const rightSectionCSS = css`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const usernameWrapperCSS = css`
  cursor: pointer;
  user-select: none;
  transition: color 1s;
  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

const inputCSS = css`
  height: 28px;
`;

const searchIconWrapperCSS = css`
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 6px;
  padding-top: 2px;
  cursor: pointer;
  

  &:hover {
    & path {
      stroke: rgba(0, 0, 0, 1);
    }
  }

  & path {
    transition: stroke 1s;
    stroke: rgba(0, 0, 0, 0.4);
  }
`;

export default DesktopNavbar;
