/* eslint-disable prettier/prettier */

import { lotesType } from "@renderer/types/lotesType"

export const sumatoriaDescartes = (data: lotesType[]): number => {
  if (!data) return 0

  const sumatoria = data.reduce(
    (acu1, lote) =>
      (acu1 +=
        (lote.inventarioActual && lote.descarteEncerado ? Object.values(lote.descarteEncerado).reduce((acuEncerado, item) => (acuEncerado += item),0)  : 0)
          + 
        (lote.inventarioActual && lote.descarteLavado ? Object.values(lote.descarteLavado).reduce((acuLavado, item) => (acuLavado += item), 0) : 0)),
    0
  )

  return sumatoria
}

export const sumatoriaDescarteEspecifico = (
  data: lotesType[],
  descarte: string,
  tipoDescarte: string
):number => {
  if (!data) return 0

  const sumatoria = data.reduce((acu, lote) => (acu += lote.inventarioActual ? lote.inventarioActual[descarte][tipoDescarte] : 0), 0)

  return sumatoria
}

export const sumatoriaDescarteSeleccionado = (enfObj: object): number => {
  if (Object.keys(enfObj).length === 0) return 0

  const sumatoria = Object.keys(enfObj).reduce((acu, item) => (acu += enfObj[item]), 0)
  console.log('funcion sumar', sumatoria)
  return sumatoria
}

