/* eslint-disable prettier/prettier */
export type responsePrediosDesverdizadoType = {
    status: number
    data: prediosDesverdizadoType[]
}


export type prediosDesverdizadoType = {
    _id: string
    enf: string
    predio:proveedorType
    fechaIngreso: string
    kilosVaciados: number
    inventarioActual: {
      inventario: number
    }
    observaciones: string
    tipoFruta: string
    promedio: number
    directoNacional: number
    desverdizado?: desverdizadoType,
    infoSalidaDirectoNacional?:{
      placa: string,
      nombreConductor: string,
      telefono: string,
      cedula: string,
      remision: string
    }
  }
  
  type desverdizadoType = {
    canastillasIngreso?: number;
    canastillas?: number;
    kilos?: number;
    kilosIngreso?: number;
    cuartoDesverdizado?: string;
    fechaIngreso?: string;
    fechaFinalizar?: string;
    desverdizando?: boolean;
    canastillasSalida?: number;
    parametros?: ParametroType[];
    fechaProcesado?: string;
  }
  
  type ParametroType = {
    fecha: string,
    temperatura: number,
    etileno: number,
    carbono: number,
    humedad: number
  }
export type stateUseReducerTypeDesverdizado = {
    type: string,
    data: prediosDesverdizadoType[]
    filtro:string
  }

