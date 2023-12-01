

import { format } from "date-fns";
import { prediosDesverdizadoType, stateUseReducerTypeDesverdizado } from "../type/type";


export const INITIAL_STATE: prediosDesverdizadoType[] = []


export const reducer = (state: prediosDesverdizadoType[], action:stateUseReducerTypeDesverdizado) => {
    switch(action.type){
        case 'initialData':
            state = action.data
            return state
        case 'filter':
            state = action.data.filter(lote => (lote.nombrePredio.toLowerCase().indexOf(action.filtro)) !== -1 ||
            format(new Date(lote.fechaIngreso), 'dd-MM-yyyy').toLowerCase().indexOf(action.filtro) !== -1 )
            return state
        default:
            return state
    }
}

