import React, {useState, useEffect} from 'react'
import { category, storeUser } from "@/store/store";
import { useAtom } from "jotai";
import { activeBoardItemType, getActiveBoardResponseType } from '@/types/board';
import { getActiveBoardAPI } from '@/api/board/getActiveBoardAPI';
import { getCookie } from '@/api/cookie';
import axios from 'axios';

function useGetCategory() {
  const [categoryAtom, setCategoryAtom] = useAtom(category);


  return categoryAtom
}

function CategoryInit() {
  const [categoryAtom, setCategoryAtom] = useAtom(category);
  const [storeUserAtom, setStoreUserAtom] = useAtom(storeUser);
  const getCategoryHandler = () => {
    getActiveBoardAPI().then((res) => {
      const category = {
        role: storeUserAtom.role,
        categories: res,
      };
      window.sessionStorage.setItem("category", JSON.stringify(category));
      setCategoryAtom(res);
    });
  };

  useEffect(() => {
    if (storeUserAtom.role !== null) {
      const category = window.sessionStorage.getItem("category");
      const parseCategory = category && JSON.parse(category);
      if (parseCategory) {
        if (parseCategory.role !== storeUserAtom.role) {
          getCategoryHandler();
        } else {
          setCategoryAtom(parseCategory.categories);
        }
      } else {
        getCategoryHandler();
      }
    }
    // alert(axios.defaults.headers.authorization)
  }, [storeUserAtom.role]);
}

useGetCategory.Init = CategoryInit

export default useGetCategory