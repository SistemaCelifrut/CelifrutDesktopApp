export type descarteLavadoType = {
    descarteGeneral:number
    pareja:number
    balin:number
}

export type descarteEnceradoType = {
    descarteGeneral:number
    pareja:number
    balin:number
    extra: number
}

export type descarteType = {
    enf: string
    nombre: string
    tipoFruta: string
    descarteLavado: descarteLavadoType
    descarteEncerado: descarteEnceradoType
}

export type responDescarteType = {
    status:number
    data:descarteType[]
}

export type stateUseReducerTypeDescarteInventario = {
    type: string,
    data: descarteType[]
    filtro:string
  }