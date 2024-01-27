/* eslint-disable prettier/prettier */
export type proveedoresType = {
  _id: string
  PREDIO: string
  ICA: string
  "CODIGO INTERNO": string
  GGN: string
  "FECHA VENCIMIENTO GGN": string
  N: string
  L: string
  M: string
  PROVEEDORES: string
  DEPARTAMENTO: string
}

export type serverResponse<T> = { status: number; data: T }


export type filtroTypes = {
  predio: string[]
  fechaInicio: string
  fechaFin: string
}