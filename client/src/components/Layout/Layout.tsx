import React, { ReactNode } from 'react'
import Navbar from '../Interface/Navbar/Navbar'
import { useRouter } from 'next/router'


type LayoutPropsType = {
  children: ReactNode
}

function Layout({children}: LayoutPropsType) {
  const router = useRouter()
  const navBarExclude = ['/signup']

  return (
    <React.Fragment>
      {!navBarExclude.includes(router.pathname) && <Navbar/>}
      {children}
    </React.Fragment>
  )
}

export default Layout