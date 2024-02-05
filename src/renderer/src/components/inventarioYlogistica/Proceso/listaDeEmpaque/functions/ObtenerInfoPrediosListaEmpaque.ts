import { ContenedoresObj } from '../types/types'
import ObtenerPrediosContenedor from './ObtenerPrediosContenedor'


export default function (contenedor: ContenedoresObj, filtro: string) {
  try {
    let outObj = {}
    let enfs = ObtenerPrediosContenedor(contenedor)
    enfs.forEach((enf) => {
      outObj[enf] = {}
      Object.keys(contenedor.pallets).forEach((pallet) => {
        contenedor.pallets[pallet].EF1.map(item => {
            if(item.id === enf){
                if(outObj[enf].hasOwnProperty(pallet)){
                    outObj[enf][pallet].push(item)
                } else{
                    outObj[enf][pallet] = []
                    outObj[enf][pallet].push(item)
                }
            }
        })
      })
    })

    if (filtro !== '') {
      Object.keys(outObj).map((pallet) => {
        if (pallet !== filtro) {
          delete outObj[pallet]
        }
      })
    }
    return outObj
  } catch (e) {
    return {}
  }
}
