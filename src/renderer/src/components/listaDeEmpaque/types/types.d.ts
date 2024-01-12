/* eslint-disable prettier/prettier */

export type serverInfoContenedoresType = {
  data:ContenedoresObj[]
  status:number
  type:string
}

export interface ContenedoresObj {
  pallets: palletType[]
  infoContenedor: infoContenedorType
  __v: number
  _id: number
}

interface infoContenedorType {
  cerrado: boolean
  desverdizado: boolean
  fechaCreacion: string
  nombreCliente: string
  observaciones: string
  tipoEmpaque: 'Caja' | 'Saco'
  tipoFruta: string
  pesoCaja: pesoCajaType
}

type pesoCajaType = {
  'B-30': number
  'B-37': number
  'B-40': number
  'G-4_5': number
  'G-30': number
  'G-37': number
  'G-40': number
  Rojo: number
}

interface palletType {
  cajasTotal: number
  listaLiberarPallet: listaLiberarPalletType
  settings: settingsType
  EF1: EF1Type[]
}

interface EF1Type {
  cajas: number
  calibre: number
  calidad: number
  fecha: string
  id: string
  nombre: string
  tipoCaja: string
  _id: string
}

interface listaLiberarPalletType {
  enzunchado: boolean
  estadoCajas: boolean
  estiba: boolean
  paletizado: boolean
  rotulado: boolean
}
interface settingsType {
  calibre:number
  calidad:number
  tipoCaja:string
}

export type rendimientoType = {
  _id:string,
  rendimiento: number
} 

export type serverResponse<T> = { status: number; data: T }
