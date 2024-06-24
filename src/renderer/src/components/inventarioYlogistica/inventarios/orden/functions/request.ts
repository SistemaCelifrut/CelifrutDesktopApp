/* eslint-disable prettier/prettier */
export const requestLotes = {
  action: 'getInventario'
}

export const requestOrdenVaceo = {
  action: 'getOrdenVaceo'
}

export const requestAddItemOrdenVaceo = (data): object => {
  return {
    data: data,
    action: 'addOrdenDeVaceo'
  }
}

export const requestVaciar = (lote): object => {
  return {
    data: {
      inventario: Number(lote.inventario),
      query: {
        _id:lote._id,
        $inc: {
          kilosVaciados: lote.inventario * lote.promedio
        },
      }
    },
    action: 'vaciarLote',
  }
}
