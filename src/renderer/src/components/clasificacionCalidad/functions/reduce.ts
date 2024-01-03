/* eslint-disable prettier/prettier */
import { formularioType, stateReduceClasificacionCalidadType } from '../types/clasificacionTypes'

export const INITIAL_STATE_LIMON: formularioType[] = [
  { id: 'Oleocelosis', lavado: '', proceso: '', key: 'oleocelosis' },
  { id: 'Fruta Verde', lavado: '', proceso: '', key: 'frutaVerde' },
  { id: 'Daños Herbicida', lavado: '', proceso: '', key: 'herbicida' },
  { id: 'Fruta Sobre Madura', lavado: '', proceso: '', key: 'frutaMadura' },
  { id: 'Daños Mecanicos', lavado: '', proceso: '', key: 'dannosMecanicos' },
  { id: 'Escama y Piojo Blanco', lavado: '', proceso: '', key: 'escama' },
  { id: 'Daños Acaro', lavado: '', proceso: '', key: 'acaro' },
  { id: 'Mgrillo', lavado: '', proceso: '', key: 'grillo' },
  { id: 'Elsinoe-Roña', lavado: '', proceso: '', key: 'alsinoe' },
  { id: 'Melanosis', lavado: '', proceso: '', key: 'melanosis' },
  { id: 'Trips', lavado: '', proceso: '', key: 'trips' },
  { id: 'Division Celular', lavado: '', proceso: '', key: 'division' },
  { id: 'Piel Nodular', lavado: '', proceso: '', key: 'piel' },
  { id: 'Fumagina', lavado: '', proceso: '', key: 'fumagina' },
  { id: 'Wood Pocket', lavado: '', proceso: '', key: 'wood' },
  { id: 'Sombra', lavado: '', proceso: '', key: 'sombra' },
  { id: 'Mancha Fantasma', lavado: '', proceso: '', key: 'mancha' },
  { id: 'Deshidratada', lavado: '', proceso: '', key: 'deshidratada' }
]

export const INITIAL_STATE_NARANJA: formularioType[] = [
  { id: 'Oleocelosis', lavado: '', proceso: '', key: 'oleocelosis' },
  { id: 'Fruta Verde', lavado: '', proceso: '', key: 'frutaVerde' },
  { id: 'Daños Herbicida', lavado: '', proceso: '', key: 'herbicida' },
  { id: 'Fruta Sobre Madura', lavado: '', proceso: '', key: 'frutaMadura' },
  { id: 'Daños Mecanicos', lavado: '', proceso: '', key: 'dannosMecanicos' },
  { id: 'Escama y Piojo Blanco', lavado: '', proceso: '', key: 'escama' },
  { id: 'Daños Acaro', lavado: '', proceso: '', key: 'acaro' },
  { id: 'Mgrillo', lavado: '', proceso: '', key: 'grillo' },
  { id: 'Elsinoe-Roña', lavado: '', proceso: '', key: 'alsinoe' },
  { id: 'Melanosis', lavado: '', proceso: '', key: 'melanosis' },
  { id: 'Trips', lavado: '', proceso: '', key: 'trips' },
  { id: 'Division Celular', lavado: '', proceso: '', key: 'division' },
  { id: 'Piel Nodular', lavado: '', proceso: '', key: 'piel' },
  { id: 'Fumagina', lavado: '', proceso: '', key: 'fumagina' },
  { id: 'Antracnosis', lavado: '', proceso: '', key: 'antracnosis' },
  { id: 'Fruta Rajada', lavado: '', proceso: '', key: 'frutaRajada' },
  { id: 'Ombligona', lavado: '', proceso: '', key: 'ombligona' },
  { id: 'Nutrientes', lavado: '', proceso: '', key: 'nutrientes' },
  { id: 'Despezonada', lavado: '', proceso: '', key: 'despezonada' }
]



export const reducerLimon = (state: formularioType[], action: stateReduceClasificacionCalidadType): formularioType[] => {
  switch (action.type) {
    case 'initialData':
      state = INITIAL_STATE_LIMON.map(item => {return{...item,proceso:'',lavado:''}})
      return state
    case 'lavado':
     { const newStateLavado = [...state];
      const itemLavado = newStateLavado.findIndex((item) => item.id === action.cardData);
      if (itemLavado !== -1) {
        newStateLavado[itemLavado].lavado = action.data
      }
      return newStateLavado;}
    case 'proceso':
     { const newStateProceso = [...state];
      const itemProceso = newStateProceso.findIndex((item) => item.id === action.cardData)
      if (itemProceso !== -1) {
        newStateProceso[itemProceso].proceso = action.data
      }
      return newStateProceso;}
    default:
      return state
  }
}

export const reducerNaranja = (state: formularioType[], action: stateReduceClasificacionCalidadType): formularioType[] => {
  switch (action.type) {
    case 'initialData':
      state = INITIAL_STATE_NARANJA.map(item => {return{...item,proceso:'',lavado:''}})
      return state
    case 'lavado':
      {const newStateLavado = [...state];
      const itemLavado = newStateLavado.findIndex((item) => item.id === action.cardData)
      if (itemLavado !== -1) {
        newStateLavado[itemLavado].lavado = action.data
      }
      return newStateLavado;}
    case 'proceso':
      {const newStateProceso = [...state];
      const itemProceso = newStateProceso.findIndex((item) => item.id === action.cardData)
      if (itemProceso !== -1) {
        newStateProceso[itemProceso].proceso = action.data
      }
      return newStateProceso;}
    default:
      return state
  }
}