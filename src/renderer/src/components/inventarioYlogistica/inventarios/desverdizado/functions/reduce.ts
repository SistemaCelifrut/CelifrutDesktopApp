/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import { prediosDesverdizadoType, stateUseReducerTypeDesverdizado } from '../type/type'

export const INITIAL_STATE: prediosDesverdizadoType[] = []


export const predios: prediosDesverdizadoType = {
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
      fechaIngreso:''
    },
    observaciones: '',
    tipoFruta: '',
    promedio: 0,
    directoNacional: 0, // Agrega esta línea
  };

export const reducer = (
  state: prediosDesverdizadoType[],
  action: stateUseReducerTypeDesverdizado
): prediosDesverdizadoType[]  => {
  switch (action.type) {
    case 'initialData':
      state = action.data
      return state
    case 'filter':
      state = action.data.filter(
        (lote) =>
          lote.predio.PREDIO.toLowerCase().indexOf(action.filtro) !== -1 ||
          format(new Date(lote.fechaIngreso), 'dd-MM-yyyy').toLowerCase().indexOf(action.filtro) !==
            -1
      )
      return state
    default:
      return state
  }
}
