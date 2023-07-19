import React, { ReactNode, useEffect } from "react";
import Navbar from "../Interface/Navbar/Navbar";
import { useRouter } from "next/router";
import useAuthority from "../../hooks/useAuthority";
import RefreshingToken from "./RefreshingToken";

type LayoutPropsType = {
  children: ReactNode;
};

function Layout({ children }: LayoutPropsType) {
  const router = useRouter();

  const auth = useAuthority.Init();

  useEffect(() => {
    console.log(auth.isValidPage)
  

  }, [auth.isValidPage])
  
  if (auth.isValidPage) {
    return (
      <React.Fragment>
        <Navbar />
        {children}
      </React.Fragment>
    );
  } else {
    return <React.Fragment><RefreshingToken/></React.Fragment>;
  }
}

export default Layout;
