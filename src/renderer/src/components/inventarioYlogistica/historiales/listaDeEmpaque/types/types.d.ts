/* eslint-disable prettier/prettier */

export type serverInfoContenedoresType = {
  data:ContenedoresObj[]
  status:number
  type:string
}

export interface ContenedoresObj {
  numeroContenedor: number
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
