import { ContenedoresObj } from '../types/types'

type outObjtype = {
  [key: number]: enfType
}

type enfType = {
  [key: string]: []
}

export default function (contenedores: ContenedoresObj, filtro: string): outObjtype {
  try {
    let outObj: outObjtype = {}
    Object.keys(contenedores.pallets).map((pallet) => {
      outObj[pallet] = []
      contenedores.pallets[pallet].EF1.forEach((item) => {
        outObj[pallet].push(item)
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

