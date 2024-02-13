/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type contenedorType = {
    numeroContenedor: number,
    pallets:{
     [key:string]: any
    }
    infoContenedor:infoContenedorType
    infoContenedorType?: object
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

type EF1Type = {
    id: string;
    nombre: string;
    cajas: number;
    tipoCaja: string;
    calibre: number;
    calidad: number;
    fecha: {
      $date: string;
    };
    _id: {
      $oid: string;
    };
}

type infoContenedorType = {
    infoCliente: string
    fechaCreacion: string
    tipoFruta: string
    tipoEmpaque: string
    cerrado: boolean
    observaciones: string
    desverdizado: boolean
    pesoCaja:{
      "G-37": number
      "B-37": number
      "G-4_5": number      
      "G-30": number
      "B-30": number
      "B-40": number     
      "G-40": number     
      "Rojo": number  
      verde: number,
      granel: number,
    }
    fechaFinalizado?: string
    urlInforme?: string
    fechaSalida?: string
}

export type datosType = {
    cliente: string,
    numeroContenedor: number,
    pallets: number,
    tipoFruta: string,
    desverdizado: boolean,
    observaciones: string,
    tipoEmpaque: string
  }