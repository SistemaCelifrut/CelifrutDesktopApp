/* eslint-disable prettier/prettier */
export type descarteType = {
    descarteLavado:descarteLavadoType
    descarteEncerado:descarteEncerado
    enf:string
    fecha:string
    predio: predioType
    tipoFruta: string
    _id: string
}

type descarteLavadoType = {
    descarteGeneral:number
    pareja:number
    balin:number
}

type descarteEncerado ={
    descarteGeneral:number
    pareja:number
    balin:number
    extra:number
    suelo:number
}

type predioType = {
    ICA:string
    PREDIO:string
    _id:string
}



export type inventarioDescarteType = {
    descarteLavado: descarteLavadoType
    descarteEncerado: descarteEncerado
}