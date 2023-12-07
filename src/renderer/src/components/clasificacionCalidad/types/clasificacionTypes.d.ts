export type lotesInventarioType = {
    id:string
    nombre:string
    tipoFruta:'Limon' | 'Naranja'
}

export type formularioType = {
    id:string,
    lavado: string,
    proceso: string,
    key: string
}

export type stateReduceClasificacionCalidadType = {
    type:string
    data:string
    cardData:string
}

export type serverResponse = {
    status:number
} 