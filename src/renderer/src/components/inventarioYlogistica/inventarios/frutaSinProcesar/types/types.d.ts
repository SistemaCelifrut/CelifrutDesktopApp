/* eslint-disable prettier/prettier */
export type serverResponseTypeFrutaSinProcesar = {
  status: number
  data: prediosType[] | historialProcesoType[]
}

export type prediosType = {
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
  fechaIngreso?: Date;
  fechaFinalizar?: Date;
  desverdizando?: boolean;
  canastillasSalida?: number;
  parametros?: ParametroType[];
  fechaProcesado?: Date;
}

type ParametroType = {
  fecha: string,
  temperatura: number,
  etileno: number,
  carbono: number,
  humedad: number
}

type proveedorType = {
  ICA: string
  PREDIO:string
}


export type stateUseReducerTypePredios = {
  type: string
  data: prediosType[]
  filtro: string
}
