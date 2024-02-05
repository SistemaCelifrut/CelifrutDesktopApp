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
