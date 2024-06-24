/* eslint-disable prettier/prettier */
export type inventarioDescarteLavadoType = {
    descarteGeneral:number
    pareja:number
    balin:number
}

export type invetarioDescarteEnceradoType = {
    descarteGeneral: number
    pareja:number
    balin:number
    extra:number
    suelo:number
}

export type inventarioDescarteType = {
    descarteLavado: inventarioDescarteLavadoType
    descarteEncerado: invetarioDescarteEnceradoType
}