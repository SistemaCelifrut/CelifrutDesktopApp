/* eslint-disable prettier/prettier */
type descarteLavadoType = {
  descarteGeneral?: number
  pareja?: number
  balin?: number
}

type descarteEnceradoType = {
  descarteGeneral?: number
  pareja?: number
  balin?: number
  extra?: number
}

type predioType = {
  cliente?: string
  descarteLavado?: descarteLavadoType
  descarteEncerado?: descarteEnceradoType
}

type prediosType = {
  fecha: string
  [key: string]: predioType
}

export type historialDescarteType = {
  accion: string
  fecha: string
  tipoFruta: string
  predios: predioType
}

export type serverResponseHistorialDescarte = {
  status: number
  data: historialDescarteType[]
}

export type stateUseReducerTypeHistorialDescarteInventario = {
  type: string
  data: historialDescarteType[]
  filtro: string
}
