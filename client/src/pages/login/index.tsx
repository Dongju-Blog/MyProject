import React, { useState, useEffect} from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import AuthTemplate from "@/components/Interface/Auth/AuthTemplate";
import AuthLogin from "@/components/Page/Auth/AuthLogin";
import AuthRecovery from "@/components/Page/Auth/AuthRecovery";
import AuthRecoveryProc from "@/components/Page/Auth/AuthRecoveryProc";

function index() {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query)
  }, [router.asPath])


  return (
    <AuthTemplate imageSrc={"/assets/Wallpaper3_compressed.png"} mobileImageTop={'-5%'}>
      {!router.query?.func && <AuthLogin/>}
      {router.query?.func === 'recovery' && <AuthRecovery/>}
      {router.query?.func === 'recovery_proc' && <AuthRecoveryProc/>}
    </AuthTemplate>
  );
}


export default index;
