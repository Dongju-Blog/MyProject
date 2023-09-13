import React, { useState, useEffect } from "react";
import DesktopNavbar from "./Desktop/DesktopNavbar";
import useNavbarUtil from "./useNavbarUtil";
import useResponsive from "@/hooks/useResponsive";
import mediaQuery from "@/util/responsive";
import MobileNavbar from "./Mobile/MobileNavbar";
import { getActiveBoardResponseType } from "@/types/board";
import { getActiveBoardAPI } from "@/api/board/getActiveBoardAPI";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { throttle } from "lodash";
import useGetCategory from "@/hooks/useGetCategory";
import Portal from "../Portal/Portal";

export type categoryType = {
  id: number;
  label: string;
  menu: categoryMenuType;
};

export type categoryMenuType = {
  id: number;
  label: string;
  function: Function;
}[];

function Navbar() {
  const util = useNavbarUtil();
  const isMobile = useResponsive(mediaQuery.tablet);
  const router = useRouter();
  const category = useGetCategory();

  const categoryOnClickHandler = ({ name }: { name: string }) => {
    router.push(`/board/${name}`);
  };

  const manufacturedCategories = category.map((el) => {
    return {
      id: el.id,
      label: el.name,
      function: categoryOnClickHandler.bind(null, { name: el.name }),
    };
  });

  const categoryList: categoryType[] = [
    {
      id: 0,
      label: "HOME",
      menu: [
        {
          id: 0,
          label: "Introduce",
          function: util.NAVIGATE_TO_INTRODUCE,
        },
        {
          id: 1,
          label: "Presentation",
          function: util.NAVIGATE_TO_PRESENTATION,
        },
        {
          id: 2,
          label: "Portfolio",
          function: util.NAVIGATE_TO_PORTFOLIO,
        },
        {
          id: 3,
          label: "Contact",
          function: util.NAVIGATE_TO_CONTACT,
        },
      ],
    },
    {
      id: 1,
      label: "BOARD",
      menu: manufacturedCategories ? manufacturedCategories : [],
    },
    {
      id: 2,
      label: "CODE",
      menu: [
        {
          id: 0,
          label: "Source Code",
          function: util.NAVIGATE_TO_PLAYGROUND,
        },
      ],
    },
  ];

  const [isTop, setIsTop] = useState(true);

  const onScrollHandler = throttle((e: any) => {
    if (e.target && e.target.scrollTop > 0) {
      setIsTop(() => false);
    } else {
      setIsTop(() => true);
    }
  }, 500);

  useEffect(() => {
    document.body.addEventListener("scroll", onScrollHandler);
    return () => {
      document.body.removeEventListener("scroll", onScrollHandler); //clean up
    };
  }, []);

  return (
    <React.Fragment>
      {isMobile ? (
        <MobileNavbar categoryList={categoryList} isTop={isTop} />
      ) : (
        <DesktopNavbar categoryList={categoryList} isTop={isTop} />
      )}
    </React.Fragment>
  );
}

export default Navbar;
