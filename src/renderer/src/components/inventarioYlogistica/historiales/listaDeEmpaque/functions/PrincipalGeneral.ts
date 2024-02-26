/* eslint-disable prettier/prettier */

import { contenedoresType } from '@renderer/types/contenedoresType'

type calidadType = {
  1.5: number
  1: number
  2: number
}
type calibreType = {
  [key: number]: number
}

type PrincipalGeneralType = [number, calidadType, calibreType, calibreType]

export default function (contenedor: contenedoresType | undefined): PrincipalGeneralType | 0 {
  try {
    if (!contenedor) return 0

    let total = 0
    const calidad = { 1: 0, 1.5: 0, 2: 0 }
    const calibre = {}
    const tipoCaja = {}

    contenedor.pallets.forEach((pallet) => {
      total += pallet.cajasTotal

      pallet.EF1.forEach((item) => {
        if (item.calidad !== undefined) {
          calidad[item.calidad] += item.cajas
        }

        if (item.calibre !== undefined) {
          if (!Object.prototype.hasOwnProperty.call(calibre, item.calibre)) {
            calibre[item.calibre] = 0
          }
          calibre[item.calibre] += item.cajas
        }
        if (item.tipoCaja !== undefined) {
          if (!Object.prototype.hasOwnProperty.call(tipoCaja, item.tipoCaja)) {
            tipoCaja[item.tipoCaja] = 0
          }
          tipoCaja[item.tipoCaja] += item.cajas
        }
      })
    })

    return [total, calidad, calibre, tipoCaja]
  } catch (e) {
    return [0, { 1.5: 0, 1: 0, 2: 0 }, {}, {}]
  }
}
