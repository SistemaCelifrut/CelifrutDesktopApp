/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
export type proveedoresType = {
  _id: string
  PREDIO: string
  ICA: string
  'CODIGO INTERNO': string
  GGN: string
  'FECHA VENCIMIENTO GGN': string
  N: string
  L: string
  M: string
  PROVEEDORES: string
  DEPARTAMENTO: string
  urlArchivos: ArrayBuffer[]
  activo:boolean
  precio:precioType
}

export type precioType = {
  Limon:limonPrecioType
  Naranja:naranjaPrecioType
}

type limonPrecioType = {
  "1": number;
  "15": number;
  "2": number;
  combinado: number;
  descarte: number;
}

type naranjaPrecioType = {
  "1": number;
  "15": number;
  "2": number;
  zumex: number;
  descarte: number;
}