/* eslint-disable prettier/prettier */
export type serverResponseTypeFrutaSinProcesar = {
  status: number
  data: prediosType[] | historialProcesoType[]
}

export type prediosType = {
  _id: string
  ICA: string
  nombre: string
  fecha: string
  inventario: number
  observaciones: string
  tipoFruta: string
  KilosActual: number
}

export type stateUseReducerTypePredios = {
  type: string
  data: prediosType[]
  filtro: string
}

export type stateUseReducerTypeHistorial = {
  type: string
  data: historialProcesoType[]
  filtro: string
}

export type historialProcesoType = {
  _id: string
  documento: documentoType
  fecha: string
  operacionRealizada: string
}

type documentoType = {
  directoNacional: number
  enf: string
  fechaIngreso: string
  inventarioActual:{
    inventario: number
  }
  kilosVaciados: number
  observaciones: string
  predio:{
    _id:string
    ICA:string
    PREDIO:string
  }
  promedio: number
  tipoFruta:string
  _id:string
}

