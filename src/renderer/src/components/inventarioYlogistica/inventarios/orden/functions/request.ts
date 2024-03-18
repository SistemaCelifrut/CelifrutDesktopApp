/* eslint-disable prettier/prettier */
export const requestLotes = {
  data: {
    query: {
      $or: [
        { 'inventarioActual.inventario': { $gt: 0 } },
        {
          desverdizado: { $exists: true },
          'desverdizado.canastillas': { $gt: 0 },
          'desverdizado.fechaFinalizar': { $exists: true }
        }
      ]
    },
    select: {
      fechaIngreso: 1,
      tipoFruta: 1,
      'inventarioActual.inventario': 1,
      enf: 1,
      promedio: 1
    },
    populate: {
      path: 'predio',
      select: 'PREDIO ICA'
    },
    sort: { fechaIngreso: -1 }
  },
  collection: 'lotes',
  action: 'getLotes',
  query: 'proceso'
}

export const requestOrdenVaceo = {
  collection: 'variablesDesktop',
  action: 'obtener_datos_sistem',
  query: 'get_orden_de_vaceo'
}

export const requestAddItemOrdenVaceo = (data): object => {
  return {
    data: data,
    collection: 'variablesDesktop',
    action: 'modificar_sistema',
    query: 'add_orden_de_vaceo'
  }
}

export const requestVaciar = (lote): object => {
  const nuevo_lote = JSON.parse(JSON.stringify(lote))
  nuevo_lote['inventarioActual.inventario'] = 0
  nuevo_lote.kilosVaciados =
    Number(nuevo_lote.kilosVaciados) + Number(nuevo_lote.promedio) * Number(nuevo_lote.inventarioActual.inventario)
  return {
    data: {
      lote: nuevo_lote,
      vaciado: nuevo_lote.inventarioActual.inventario
    },
    collection: 'lotes',
    action: 'vaciarLote',
    query: 'proceso',
    record: 'vaciarLote'
  }
}
