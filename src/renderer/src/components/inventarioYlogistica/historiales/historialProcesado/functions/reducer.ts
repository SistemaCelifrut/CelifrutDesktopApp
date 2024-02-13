/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import {
  historialProcesoType,
  stateUseReducerTypeHistorial,
} from '../types/types'

export const documentoInit: historialProcesoType = {
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
  action: stateUseReducerTypeHistorial
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
