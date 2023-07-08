import React, { ReactNode } from 'react'
import Navbar from '../Interface/Navbar/Navbar'


type LayoutPropsType = {
  children: ReactNode
}

function Layout({children}: LayoutPropsType) {



  return (
    <React.Fragment>
      <Navbar/>
      {children}
    </React.Fragment>
  )
}

export default Layout