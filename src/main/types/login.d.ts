/* eslint-disable prettier/prettier */
export type responseLoginType = {
  status: number
  data: userType
}

interface userType {
  user: string
  password: string
  permisos: string[]
  rol: string
  cargo: string
}
