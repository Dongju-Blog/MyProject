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

export type userInfoResponseType = {
  username: string | null
  status: tokenStatusItem | null
  role: tokenRoleItem | null
}

export type loginResponseType = {
  accessToken: string
  refreshToken: string
} & userInfoResponseType



export type storeUserType = userInfoResponseType

export type layoutTokenStatusType = {
	status: tokenStatusItem[]
	role: tokenRoleItem[]
}

export type tokenRoleItem = 'USER' | 'GUEST' | 'ADMIN'
export type tokenStatusItem = 'REQUIRE_LOGIN' | 'APPROVED'
