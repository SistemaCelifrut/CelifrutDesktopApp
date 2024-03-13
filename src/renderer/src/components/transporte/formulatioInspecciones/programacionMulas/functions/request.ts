/* eslint-disable prettier/prettier */
import { contenedoresType } from '@renderer/types/contenedoresType'

export const request = {
  data: {
    query: { formularioInspeccionMula: { $exists: false } },
    select: {},
    sort: { 'infoContenedor.fechaCreacion': -1 },
    limit: 50,
    populate: {
      path: 'infoContenedor.clienteInfo',
      select: 'CLIENTE'
    }
  },
  collection: 'contenedores',
  action: 'getContenedores',
  query: 'proceso'
}

export const initialData = {
  placa: '',
  trailer: '',
  conductor: '',
  cedula: '',
  celular: '',
  color: '',
  modelo: '',
  marca: '',
  prof: '',
  cliente: '',
  puerto: '',
  naviera: '',
  agenciaAduanas: ''
}

export const labels = [
  'Placa',
  'Trailer',
  'Conductor',
  'Cedula',
  'Celular',
  'Color',
  'Modelo',
  'Marca',
  'Prof',
  'Cliente',
  'Puerto',
  'Naviera',
  'Agencia de aduanas'
]

export const crear_request = (
  state,
  contenedorSelect
): {
  query: string
  collection: string
  action: string
  data: { contenedor: contenedoresType }
} => {
  return {
    query: 'proceso',
    collection: 'contenedores',
    action: 'putContenedor',
    data: {
      contenedor: {
        _id: contenedorSelect,
        formularioInspeccionMula: {
          placa: state.placa,
          trailer: state.trailer,
          conductor: state.conductor,
          cedula: state.cedula,
          celular: state.celular,
          color: state.color,
          modelo: state.modelo,
          marca: state.marca,
          prof: state.prof,
          puerto: state.puerto,
          naviera: state.naviera,
          agenciaAduanas: state.agenciaAduanas
        }
      }
    }
  }
}
