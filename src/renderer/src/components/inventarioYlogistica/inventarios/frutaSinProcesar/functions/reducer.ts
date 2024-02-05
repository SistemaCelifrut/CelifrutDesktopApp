/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import {
  prediosType,
  stateUseReducerTypePredios
} from '../types/types'

export const INITIAL_STATE: prediosType[] = []

export const reducer = (state: prediosType[], action: stateUseReducerTypePredios) => {
  switch (action.type) {
    case 'initialData':
      state = action.data
      return state
    case 'filter':
      state = action.data.filter(
        (lote) =>
          lote.nombre.toLowerCase().indexOf(action.filtro) !== -1 ||
          String(lote.ICA).toLowerCase().indexOf(action.filtro) !== -1 ||
          format(new Date(lote.fecha), 'dd-MM-yyyy').toLowerCase().indexOf(action.filtro) !== -1 ||
          lote.tipoFruta.toLowerCase().indexOf(action.filtro) !== -1
      )
      return state
    default:
      return state
  }
}

