/* eslint-disable prettier/prettier */
export type lotesInventarioType = {
  _id: string
  enf: string
  predio: {
    PREDIO: string
  }
  tipoFruta: 'Limon' | 'Naranja'
}

export type calidadInternalote = {
  _id: string
  enf: string
  predio?:{
    _id: string
    ICA: string
    PREDIO: string
  }
  calidad?:calidadHistorialType
}

export type calidadInternaType = {
  pesoInicial: string
  zumo: string
  semillas: string
  brix1: string
  brix2: string
  brix3: string
  acidez1: string
  acidez2: string
  acidez3: string
}

export type stateUseReducerTypeCalidadInterna = {
  type: string
  data: string
}

export type dataHistorialCalidadInterna = {
  _id: string
  nombrePredio: string
  tipoFruta: string
  calidad: calidadHistorialType
}

type calidadHistorialType = {
  calidadInterna: {
    acidez:number
    brix:number
    peso:number
    ratio:number
    zumo:number
    fecha: string
    semillas:boolean
  }
}

export type filtroType ={
  tipoFruta: string
  fechaIngreso: fechaIngresoType
  cantidad: string
}

type fechaIngresoType = {
  $gte: null | Date
  $lt: null | Date
}
