/* eslint-disable prettier/prettier */

import { contenedoresType } from "@renderer/types/contenedoresType"

type outObjtype = {
  [key: number]: enfType
}

type enfType = {
  [key: string]: []
}

export default function (contenedores: contenedoresType | undefined, filtro: string): outObjtype {
  try {
  if(contenedores){
    const  outObj: outObjtype = {}
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
  } else {
    return {}
  }
  } catch (e) {
    return {}
  }
}

