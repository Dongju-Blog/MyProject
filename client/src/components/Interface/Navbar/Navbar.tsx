import React, {useState, useEffect} from 'react'
import DesktopNavbar from './Desktop/DesktopNavbar'
import useNavbarUtil from './useNavbarUtil'
import useResponsive from '@/hooks/useResponsive';
import mediaQuery from '@/util/responsive';
import MobileNavbar from './Mobile/MobileNavbar';
import { getActiveBoardResponseType } from '@/types/board';
import { getActiveBoardAPI } from '@/api/board/getActiveBoardAPI';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { throttle } from 'lodash';
import useGetCategory from '@/hooks/useGetCategory';

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
  const isMobile = useResponsive(mediaQuery.tablet)
  const router = useRouter()
  const category = useGetCategory()



  const categoryOnClickHandler = ({name}: {name: string}) => {
    router.push(`/board/${name}`)
  }

  const manufacturedCategories = category.map((el) => {
    return {
      id: el.id,
      label: el.name,
      function: categoryOnClickHandler.bind(null, {name: el.name})
    }
  })

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
      menu: manufacturedCategories ? manufacturedCategories : []
    }
  ]

  const [isTop, setIsTop] = useState(true)

  const onScrollHandler = throttle((e: any) => {
    if (e.target && e.target.scrollTop > 0) {
      setIsTop(() => false)
    } else {
      setIsTop(() => true)
    }
  }, 500)

  useEffect(() => {

    document.body.addEventListener('scroll', onScrollHandler);
    return () => {
      document.body.removeEventListener('scroll', onScrollHandler); //clean up
    };
    
  }, []);



  return (
    <React.Fragment>
      {isMobile ? <MobileNavbar categoryList={categoryList} isTop={isTop} /> : <DesktopNavbar categoryList={categoryList} isTop={isTop} />}
    </React.Fragment>
  )
}

export default Navbar