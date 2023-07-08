import React from 'react'
import DesktopNavbar from './Desktop/DesktopNavbar'
import useNavbarUtil from './useNavbarUtil'

export type categoryType = {
  id: number;
  label: string;
  menu: categoryMenuType
}

export type categoryMenuType = {
  id: number
  label: string
  function: Function
}[]




function Navbar() {
  const util = useNavbarUtil()

  const categoryList: categoryType[] = [
    {
      id: 0,
      label: 'Home',
      menu: [
        {
          id: 0,
          label: 'Example 1',
          function: util.Example1
        },
        {
          id: 1,
          label: 'Example 2',
          function: util.Example2
        },
        {
          id: 2,
          label: 'Example 3',
          function: util.Example3
        }
      ]
    }
  ]



  return (
    <React.Fragment>
      <DesktopNavbar categoryList={categoryList} />
    </React.Fragment>
  )
}

export default Navbar