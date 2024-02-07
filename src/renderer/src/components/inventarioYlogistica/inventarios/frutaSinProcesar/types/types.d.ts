/* eslint-disable prettier/prettier */
export type serverResponseTypeFrutaSinProcesar = {
  status: number
  data: prediosType[] | historialProcesoType[]
}

export type prediosType = {
  _id: string
  predio:proveedorType
  fechaIngreso: string
  inventarioActual: {
    inventario: number
  }
  observaciones: string
  tipoFruta: string
  KilosActual: number
}

type proveedorType = {
  ICA: string
  PREDIO:string
}


export type stateUseReducerTypePredios = {
  type: string
  data: prediosType[]
  filtro: string
}
