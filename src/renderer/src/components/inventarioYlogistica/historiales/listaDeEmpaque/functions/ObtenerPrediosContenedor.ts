/* eslint-disable prettier/prettier */

import { contenedoresType } from "@renderer/types/contenedoresType"

export default function (contenedor: contenedoresType): string[] {
  try {
    const arr: string[] = []
    contenedor.pallets && contenedor.pallets.map((pallet) => {
      pallet.EF1.map((enf) => {
        if(enf.lote?.enf)
            arr.push(enf.lote?.enf)
      })
    })

    const set = new Set(arr)
    return Array.from(set)
  } catch (e) {
    return []
  }
}
