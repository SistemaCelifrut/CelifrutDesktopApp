/* eslint-disable prettier/prettier */
export type serverResponse<T> = { status: number; data: T }


export type contenedoresType = {
    _id: number
    infoContenedor: infoContenedorType
}

type infoContenedorType = {
    cerrado: boolean
    desverdizado: boolean
    fechaCreacion: string
    nombreCliente: string
    observaciones: string
    tipoEmpaque: string
    tipoFruta: string
    pesoCaja: object
    fechaSalida: string
    fechaFinalizado: string
    urlInforme: string
}