/* eslint-disable prettier/prettier */
import { contenedoresType } from '@renderer/types/contenedoresType'
import ObtenerListaIdsPredios from './ObtenerListaIdsPredios'



export default function (contenedor: contenedoresType, filtro: string): object {
  try {
    const outObj = {}
    const enfs = ObtenerListaIdsPredios(contenedor)
    enfs.forEach((_id) => {
      outObj[_id] = {}
      contenedor.pallets && contenedor.pallets.forEach((pallet, index) => {
        pallet.EF1.map((item) => {
          if (item.lote?._id === _id) {
            if (Object.prototype.hasOwnProperty.call(outObj[_id], index)) {
              outObj[_id][index].push(item)
            } else {
              outObj[_id][index] = []
              outObj[_id][index].push(item)
            }
          }
        })
      })
    })

    if (filtro !== '') {
      Object.keys(outObj).map((pallet) => {

        if (pallet!== filtro) {
          delete outObj[pallet]
        }
      })
    }
    // console.log("salida funcion", outObj)
    return outObj
  } catch (e) {
    return {}
  }
}
