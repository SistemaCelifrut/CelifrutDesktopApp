/* eslint-disable prettier/prettier */
export type serverResponse<T> = { status: number; data: T }

export type registrosType = {
  _id: string
  __v: number
  defecto: string
  fruta: string
  fecha: string
  operario: string
  unidades: string
}

export type promedioOperarioType = {
  operario: string
  porcentaje: number
}