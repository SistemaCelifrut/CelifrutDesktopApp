/* eslint-disable prettier/prettier */

import { contenedoresType } from "@renderer/types/contenedoresType"

export default function (contenedor: contenedoresType): [string[], string[]] {
  try {
    const arr: string[] = []
    const arr_id: string[] = []
    contenedor.pallets && contenedor.pallets.map((pallet) => {
      pallet.EF1.map((enf) => {
        if(enf.lote?._id && enf.lote.enf){
          arr.push(enf.lote?.enf)
          arr_id.push(enf.lote?._id)
        }
            
      })
    })

    const set = new Set(arr)
    const set_id = new Set(arr_id)
    
    return [Array.from(set), Array.from(set_id)]
  } catch (e) {
    return [[],[]]
  }
}
