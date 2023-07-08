import React from 'react'
import { useRouter } from 'next/router'

function useNavbarUtil() {
  const router = useRouter()

  const Example1 = () => {
    router.push('/#1')
  }

  const Example2 = () => {
    router.push('/#2')
  }

  const Example3 = () => {
    router.push('/#3')
  }

  const returnObject = {
    Example1,
    Example2,
    Example3
  }

  return returnObject
}

export default useNavbarUtil