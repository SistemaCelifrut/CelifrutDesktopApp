/* eslint-disable prettier/prettier */
import { clienteType } from "./clientesType"

export type contenedoresType = {
  _id?: string
  numeroContenedor: number
  pallets: palletType[]
  infoContenedor?: infoContendorType
  formularioInspeccionMula?: formularioInspeccionMulaType
  __v?: number
}

export type palletType = {
    EF1:EF1Type[]
    settings:{
        tipoCaja?: string
        calidad?: number
        calibre?: number
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
    clienteInfo?: clienteType
    fechaCreacion?: string
    fechaInicio?: string
    fechaEstimadaCargue?: string
    tipoFruta?: string
    tipoEmpaque?: string
    tipoCaja?: string[]
    calidad?: string[]
    cerrado?: boolean
    observaciones?: string
    calibres?: string
    desverdizado?:boolean
    _id?: string

}

export type formularioInspeccionMulaType = {
    placa?: string;
  trailer?: string;
  conductor?: string;
  cedula?: string;
  celular?: string;
  color?: string;
  modelo?: string;
  marca?: string;
  prof?: string;
  puerto?: string;
  naviera?: string;
  agenciaAduanas?: string;
  empresaTransporte?: string;
  cumpleRequisitos?: boolean;
  responsable?: string;
  criterios?: Map<string, criteriosType>; 
}


type criteriosType = {
    nombre?: string;
    cumplimiento?: boolean;
    observaciones?: string;
  }

  export type EF1Type = {
    lote?: string,
    cajas?: number
    tipoCaja?: string
    calibre?:number
    calidad?:number
    fecha?: string
  }