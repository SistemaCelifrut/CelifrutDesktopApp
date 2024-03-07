/* eslint-disable prettier/prettier */
import { lotesType } from '@renderer/types/lotesType';
import { format } from 'date-fns'

export const predios: lotesType = {
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



export const INITIAL_STATE: lotesType[] = []

export const reducer = (state: lotesType[], action: {data:lotesType[], type: string, filtro:string}): lotesType[] => {
  switch (action.type) {
    case 'initialData':
      state = action.data
      return state
    case 'filter':
      state = action.data.filter(
        (lote) =>
          lote.predio && lote.predio.PREDIO && lote.predio.PREDIO.toLowerCase().indexOf(action.filtro) !== -1 ||
          String(lote.predio?.PREDIO || '').toLowerCase().indexOf(action.filtro) !== -1 ||
          format(lote.fechaIngreso ? new Date(lote.fechaIngreso) : new Date(), 'dd-MM-yyyy').toLowerCase().indexOf(action.filtro) !== -1 ||
          lote.tipoFruta && lote.tipoFruta.toLowerCase().indexOf(action.filtro) !== -1
      )
      return state
    default:
      return state
  }
}

