/* eslint-disable prettier/prettier */
import { EF1Type, contenedoresType, palletType } from "@renderer/types/contenedoresType";

type requestGuardarType = {
  data: contenedoresType
  collection:string
  action: string
  query: string
  record :string
}

export const crearObjetoContenedor = (formState, calidad, tipoCaja): requestGuardarType => {
    const subDocumentos = [] as palletType[]
    const data = {
      cliente: formState.cliente,
      numeroContenedor: Number(formState.numeroContenedor),
      pallets: Number(formState.pallets),
      tipoFruta: formState.tipoFruta,
      desverdizado: formState.desverdizado,
      observaciones: formState.observaciones,
      tipoEmpaque: formState.tipoEmpaque,
      fechaInicioProceso: formState.fechaInicioProceso,
      fechaEstimadaCargue: formState.fechaEstimadaCargue,
      calidad: calidad,
      tipoCaja: tipoCaja,
      calibres: formState.calibres
    }

    for (let i = 1; i<=data.pallets; i++){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const subDocumento: any = {
            EF1: [] as EF1Type[],
            listaLiberarPallet: {
              rotulado: false,
              paletizado: false,
              enzunchado: false,
              estadoCajas: false,
              estiba: false,
            },
            settings: {
              tipoCaja: "",
              calidad: 0,
              calibre: 0,
            },
          };
  
          subDocumentos.push(subDocumento);
    }

    const new_contenedor: contenedoresType = {

        numeroContenedor: data.numeroContenedor,
        infoContenedor:{
            clienteInfo: data.cliente,
            tipoEmpaque: data.tipoEmpaque,
            tipoFruta: data.tipoFruta,
            fechaCreacion: new Date().toUTCString(),
            fechaEstimadaCargue: data.fechaEstimadaCargue,
            fechaInicio: data.fechaInicioProceso,
            desverdizado: data.desverdizado,
            observaciones: data.observaciones,
            cerrado: false,
            tipoCaja: data.tipoCaja,
            calidad: data.calidad,
            calibres: data.calibres
     
        },
        pallets: subDocumentos,
    }

    const request = {
      data: new_contenedor,
      collection: 'contenedores',
      action: 'crearContenedor',
      query: 'proceso',
      record: 'crearContenedor'
    }
    return request;
}


export const formInit = {
  numeroContenedor: '',
  cliente: '',
  tipoFruta: '',
  tipoEmpaque: '',
  pallets: '',
  desverdizado: false,
  observaciones: '',
  fechaInicioProceso: '',
  fechaEstimadaCargue: '',
  calibres: ''
}

export const requestClientes = {
  data: {
    query: {}
  },
  collection: 'clientes',
  action: 'getClientes',
  query: 'proceso'
}