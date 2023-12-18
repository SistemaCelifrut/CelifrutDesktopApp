import { ContenedoresObj } from '../types/types'

type calidadType = {
  1.5: number
  1: number
  2: number
}
type calibreType = {
  [key: number]: number
}

type PrincipalGeneralType = [number, calidadType, calibreType, calibreType]

export default function (contenedor: ContenedoresObj | ''): PrincipalGeneralType | 0 {
  try {
    if (!contenedor) return 0

    let total = 0
    let calidad = { 1: 0, 1.5: 0, 2: 0 }
    let calibre = {}
    let tipoCaja = {}

    Object.keys(contenedor.pallets).forEach((pallet) => {
      total += contenedor.pallets[pallet].cajasTotal

      contenedor.pallets[pallet].EF1.forEach((item) => {
        calidad[item.calidad] += item.cajas

        if (!calibre.hasOwnProperty(item.calibre)) {
          calibre[item.calibre] = 0
        }
        calibre[item.calibre] += item.cajas

        if (!tipoCaja.hasOwnProperty(item.tipoCaja)) {
            tipoCaja[item.tipoCaja] = 0
        }
        tipoCaja[item.tipoCaja] += item.cajas
      })
    })

    return [total, calidad, calibre, tipoCaja]
  } catch (e) {
    return [0, { 1.5: 0, 1: 0, 2: 0 }, {}, {}]
  }
}
