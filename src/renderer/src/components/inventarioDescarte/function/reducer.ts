


import { descarteType, stateUseReducerTypeDescarteInventario } from "../types/descartes";
import { historialDescarteType, stateUseReducerTypeHistorialDescarteInventario } from "../types/historialDescartes";


export const INITIAL_STATE: descarteType[] = []
export const INITIAL_STATE_HISTORIAL_DESCARTE: historialDescarteType[] = []


export const reducer = (state: descarteType[], action:stateUseReducerTypeDescarteInventario) => {
    switch(action.type){
        case 'initialData':
            state = action.data
            return state
        case 'filter':
            state = action.data.filter(lote => (lote.nombre.toLowerCase().indexOf(action.filtro.toLowerCase()) !== -1 ||
                                                lote.tipoFruta.toLowerCase().indexOf(action.filtro.toLowerCase())) !== -1)
            return state
        default:
            return state
    }
}

export const reducerHistorial = (state: historialDescarteType[], action:stateUseReducerTypeHistorialDescarteInventario) => {
    switch(action.type){
        case 'initialData':
            state = action.data
            return state
        default:
            return state
    }
}
