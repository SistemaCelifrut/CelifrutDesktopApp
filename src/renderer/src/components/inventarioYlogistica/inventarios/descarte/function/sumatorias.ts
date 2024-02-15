/* eslint-disable prettier/prettier */
import { descarteType } from '../types/descartes'
import { historialDescarteType } from '../types/historialDescartes'

export const sumatoriaDescartes = (data: descarteType[]): number => {
  if (!data) return 0

  const sumatoria = data.reduce(
    (acu1, lote) =>
      (acu1 +=
        (Object.prototype.hasOwnProperty.call(lote, 'descarteEncerado') ? Object.values(lote.inventarioActual.descarteEncerado).reduce((acuEncerado, item) => (acuEncerado += item),0)  : 0)
          + 
        (Object.prototype.hasOwnProperty.call(lote, 'descarteLavado') ? Object.values(lote.inventarioActual.descarteLavado).reduce((acuLavado, item) => (acuLavado += item), 0) : 0)),
    0
  )

  return sumatoria
}

export const sumatoriaDescarteEspecifico = (
  data: descarteType[],
  descarte: string,
  tipoDescarte: string
):number => {
  if (!data) return 0

  const sumatoria = data.reduce((acu, lote) => (acu += lote.inventarioActual[descarte][tipoDescarte]), 0)

  return sumatoria
}

export const sumatoriaDescarteSeleccionado = (enfObj: object): number => {
  if (Object.keys(enfObj).length === 0) return 0

  const sumatoria = Object.keys(enfObj).reduce((acu, item) => (acu += enfObj[item]), 0)
  console.log('funcion sumar', sumatoria)
  return sumatoria
}

export const sumatoriaHistorialDescartes = (lote: historialDescarteType): number => {
  const sumatoria = Object.keys(lote.predios).reduce((acu, enf) => {
    if (enf !== 'fecha') {
      const descarteLavado = lote.predios[enf].descarteLavado
        ? Object.values<number>(lote.predios[enf].descarteLavado).reduce(
            (acuD: number, descarte: number ) => (acuD += descarte),
            0
          )
        : 0
      const descarteEncerado = lote.predios[enf].descarteEncerado
        ? Object.values<number>(lote.predios[enf].descarteEncerado).reduce(
            (acuD: number, descarte: number) => (acuD += descarte),
            0
          )
        : 0

      acu += descarteEncerado + descarteLavado
      return acu
    } else {
      return (acu += 0)
    }
  }, 0)
  return sumatoria
}
