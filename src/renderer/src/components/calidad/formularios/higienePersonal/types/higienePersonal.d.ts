export type higienePersonalType = {
    _id: string
    responsable: 'string'
    elementosHigiene: elementosHigieneType
    colaborador: string
    fecha: string
    __v: number
}

type elementosHigieneType = {
    pantalon:boolean
    unasCortas: boolean
    tapaoidos: boolean
    estadoSalud: boolean
    barba: boolean
    accesorio: boolean
    camisa: boolean
    maquillaje: boolean
    tapabocas: boolean
    cofia: boolean
    botas: boolean
}

export type serverResponseHigienePersonalType = {
    status: number
    data:higienePersonalType[]
}