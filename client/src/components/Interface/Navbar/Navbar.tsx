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
      label: 'HOME',
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
        },
        {
          id: 3,
          label: 'Example 4',
          function: util.Example4
        }
      ]
    },
    {
      id: 1,
      label: 'BOARD',
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
        },
        {
          id: 3,
          label: 'Example 4',
          function: util.Example4
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