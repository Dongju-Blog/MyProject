import React from "react";
import { useRouter } from "next/router";

function useNavbarUtil() {
  const router = useRouter();

  const NAVIGATE_TO_INTRODUCE = () => {
    router.push("/#1");
  };

  const NAVIGATE_TO_PORTFOLIO = () => {
    router.push("/#3");
  };

  const NAVIGATE_TO_CONTACT = () => {
    router.push("/#4");
  };

  const NAVIGATE_TO_PRESENTATION = () => {
    router.push("/#2");
  };

  const NAVIGATE_TO_PLAYGROUND = () => {
    router.push("/playground");
  };

  const returnObject = {
    NAVIGATE_TO_INTRODUCE,
    NAVIGATE_TO_PORTFOLIO,
    NAVIGATE_TO_CONTACT,
    NAVIGATE_TO_PRESENTATION,
    NAVIGATE_TO_PLAYGROUND,
  };

  return returnObject;
}

export default useNavbarUtil;
