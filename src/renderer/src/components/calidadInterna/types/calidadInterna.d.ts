export type lotesInventarioType = {
    id:string
    nombre:string
    tipoFruta:'Limon' | 'Naranja'
}

export type calidadInternaType = {
    pesoInicial: string
    zumo: string
    semillas: string
    brix1: string
    brix2: string
    brix3: string
    acidez1:string
    acidez2:string
    acidez3:string
}

export type stateUseReducerTypeCalidadInterna = {
    type: string,
    data: string
}