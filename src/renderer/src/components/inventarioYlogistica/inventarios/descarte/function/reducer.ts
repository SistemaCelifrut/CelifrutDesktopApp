/* eslint-disable prettier/prettier */
import { lotesType } from '@renderer/types/lotesType'


export const INITIAL_STATE: lotesType[] = []

export const reducer = (state: lotesType[], action: {data:lotesType[], type: string, filtro: string}): lotesType[] => {
  switch (action.type) {
    case 'initialData':
      state = action.data
      return state
    case 'filter':
      state = action.data.filter(
        (lote) =>
          (lote.predio?.PREDIO && lote.predio?.PREDIO.toLowerCase().indexOf(action.filtro.toLowerCase()) !== -1 ||
          lote.tipoFruta && lote.tipoFruta.toLowerCase().indexOf(action.filtro.toLowerCase())) !== -1
      )
      return state
    default:
      return state
  }
}
