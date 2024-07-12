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
    inventario: Number(lote.inventario),
    kilosVaciados: lote.inventario * lote.promedio,
    _id: lote._id,
    action: 'vaciarLote',
    __v:lote.__v,
  }
}
