import { successReturnType } from "./common"

export type signupType = {
  name: string
  username: string
  password: string
  checkedPassword: string
  email: string
}

export type signupProcType = {
  name?: string
  username?: string
  password?: string
  checkedPassword?: string
  email?: string
}

export type signupValidType = {
  name: boolean
  username: boolean
  password: boolean
  checkedPassword: boolean
  email: boolean
}


