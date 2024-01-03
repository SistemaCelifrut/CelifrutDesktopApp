/* eslint-disable prettier/prettier */
export type sendLogInType = {
  user: string
  password: string
}

export type responseLoginType = {
  status: number
  data: userType
}

interface userType {
  user: string
  password:string
  permisos: string[]
  rol:string
  cargo:string
}


export type serverResponse<T> = { status: number; data: T }
