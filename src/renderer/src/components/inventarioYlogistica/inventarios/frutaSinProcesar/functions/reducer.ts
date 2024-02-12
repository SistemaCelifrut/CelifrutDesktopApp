/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import {
  prediosType,
  stateUseReducerTypePredios
} from '../types/types'

export const predios: prediosType = {
  _id: '',
  enf: '',
  predio: { ICA: '', PREDIO: '' },
  fechaIngreso: '',
  kilosVaciados: 0,
  inventarioActual: {
    inventario: 0
  },
  desverdizado: {
    canastillas: 0,
    canastillasIngreso: 0,
    kilos: 0,
    kilosIngreso: 0,
    cuartoDesverdizado: '',
  },
  observaciones: '',
  tipoFruta: '',
  promedio: 0,
  directoNacional: 0, // Agrega esta línea
};



export const INITIAL_STATE: prediosType[] = []

export const reducer = (state: prediosType[], action: stateUseReducerTypePredios): prediosType[] => {
  switch (action.type) {
    case 'initialData':
      state = action.data
      return state
    case 'filter':
      state = action.data.filter(
        (lote) =>
          lote.predio.PREDIO.toLowerCase().indexOf(action.filtro) !== -1 ||
          String(lote.predio.PREDIO).toLowerCase().indexOf(action.filtro) !== -1 ||
          format(new Date(lote.fechaIngreso), 'dd-MM-yyyy').toLowerCase().indexOf(action.filtro) !== -1 ||
          lote.tipoFruta.toLowerCase().indexOf(action.filtro) !== -1
      )
      return state
    default:
      return state
  }
}

