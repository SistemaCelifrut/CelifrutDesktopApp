/* eslint-disable prettier/prettier */

export const request = {
  data: {
    query: { "formularioInspeccionMula.criterios": { $exists: false }, },
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
  'Puerto',
  'Naviera',
  'Agencia de aduanas'
]

export const crear_request = (
  state,
  contenedorSelect
):object => {
  return {
    query: 'proceso',
    collection: 'contenedores',
    action: 'putContenedor',
    data: {
      contenedor: {
        _id: contenedorSelect,
        "formularioInspeccionMula.placa": state.placa,
        "formularioInspeccionMula.trailer": state.trailer,
        "formularioInspeccionMula.conductor": state.conductor,
        "formularioInspeccionMula.cedula": state.cedula,
        "formularioInspeccionMula.celular": state.celular,
        "formularioInspeccionMula.color": state.color,
        "formularioInspeccionMula.modelo": state.modelo,
        "formularioInspeccionMula.marca": state.marca,
        "formularioInspeccionMula.prof": state.prof,
        "formularioInspeccionMula.puerto": state.puerto,
        "formularioInspeccionMula.naviera": state.naviera,
        "formularioInspeccionMula.agenciaAduanas": state.agenciaAduanas

      }
    }
  }
}
