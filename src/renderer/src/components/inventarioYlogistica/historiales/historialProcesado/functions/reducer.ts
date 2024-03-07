/* eslint-disable prettier/prettier */
import { historialLotesType } from '@renderer/types/lotesType'
import { format } from 'date-fns'
import { historialProcesoType } from '../../historialDirectoNacional/types/types'


export const documentoInit: historialLotesType = {
  _id: "",
  fecha: "",
  operacionRealizada: "",
  documento:{
    directoNacional:0,
    enf:"",
    fechaIngreso:"",
    inventarioActual:{
      inventario: 0
    },
    kilosVaciados: 0,
    observaciones: "",
    predio:{
      _id:"",
      ICA:"",
      PREDIO:""
    },
    promedio: 0,
    tipoFruta:"",
    _id:""

  }
}

export const INITIAL_STATE_HISTORIAL_PROCESO: historialProcesoType[] = []

export const reducerHistorial = (
  state: historialProcesoType[],
  action: {data:historialProcesoType[], type:string, filtro:string}
): historialProcesoType[] => {
  switch (action.type) {
    case 'initialData':
      state = action.data
      return state
    case 'filter':
      state = action.data.filter(
        (lote) =>
          lote.documento.predio.PREDIO.toLowerCase().indexOf(action.filtro) !== -1 ||
          lote.documento.enf.toLowerCase().indexOf(action.filtro) !== -1 ||
          format(new Date(lote.fecha), 'dd-MM-yyyy').toLowerCase().indexOf(action.filtro) !== -1 ||
          lote.documento.tipoFruta.toLowerCase().indexOf(action.filtro) !== -1
      )
      return state
    default:
      return state
  }
}
