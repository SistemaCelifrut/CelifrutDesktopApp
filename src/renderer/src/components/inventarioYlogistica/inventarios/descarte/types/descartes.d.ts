/* eslint-disable prettier/prettier */
export type descarteLavadoType = {
  descarteGeneral: number
  pareja: number
  balin: number
}

export type descarteEnceradoType = {
  descarteGeneral: number
  pareja: number
  balin: number
  extra: number
}

type inventarioActualType = {
  inventario: number
  descarteEncerado:descarteEnceradoType
  descarteLavado: descarteLavadoType
}

export type descarteType = {
  _id: string
  enf: string
  predio: {
    PREDIO: string
    _id: string
  }
  tipoFruta: string
  inventarioActual: inventarioActualType
}

export type responDescarteType = {
  status: number
  message: string
  data: descarteType[]
}

export type stateUseReducerTypeDescarteInventario = {
  type: string
  data: descarteType[]
  filtro: string
}
