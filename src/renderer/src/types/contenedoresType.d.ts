/* eslint-disable prettier/prettier */
import { clienteType } from "./clientesType"

export type contenedoresType = {
  _id: string
  numeroContenedor: number
  pallets:{
    [key:string]: palletType
   }
  infoContenedor: infoContendorType
  __v: number
}

type palletType = {
    EF1:EF1Type[]
    settings:{
        tipoCaja: string
        calidad: number
        calibre: number
    }
    cajasTotal: number
    listaLiberarPallet:{
        "rotulado": boolean,
        "paletizado": boolean,
        "enzunchado": boolean,
        "estadoCajas": boolean,
        "estiba": boolean
    }
}

type infoContendorType = {
    clienteInfo: clienteType
    fechaCreacion: string
    fechaInicio: string
    fechaEstimadaCargue: string
    tipoFruta: string
    tipoEmpaque: string
    tipoCaja: string[]
    calidad: string[]
    cerrado: boolean
    observaciones: string
    calibres: string
    _id: string

}
