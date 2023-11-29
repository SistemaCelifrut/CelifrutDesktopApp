export type serverResponseTypeFrutaSinProcesar = {
    status:number
    data: prediosType[] | historialProcesoType[]
}

export type prediosType = {
    _id:string
    ICA:string
    nombre:string
    fecha: string
    inventario:number
    observaciones: string
    tipoFruta: string
    KilosActual: number
}

export type stateUseReducerTypePredios = {
  type: string,
  data: prediosType[]
  filtro:string
}

export type stateUseReducerTypeHistorial = {
  type: string,
  data: historialProcesoType[]
  filtro:string
}


  export type historialProcesoType = {
    _id:string
    enf: string
    nombre: string
    canastillas: number
    kilos: number
    tipoFruta: string
    fecha: string
    rendimiento?:number
  }