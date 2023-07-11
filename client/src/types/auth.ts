import { successReturnType } from "./common"

export type signupBodyType = {
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

export type loginBodyType = {
  username: string
  password: string
}

export type loginResponseType = {
  accessToken: string
  refreshToken: string
}

