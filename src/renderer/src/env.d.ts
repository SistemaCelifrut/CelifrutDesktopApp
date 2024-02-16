/* eslint-disable prettier/prettier */
/// <reference types="vite/client" />

export type themeType = 'Dark' | 'Ligth'

export interface userType {
  user: string
  password: string
  permisos: string[]
  rol: string
  cargo: string
}


export type serverResponse<T> = { status: number; data: T, message: string }
