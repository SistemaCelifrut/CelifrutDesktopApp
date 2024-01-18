/* eslint-disable prettier/prettier */

import { LoteDataType, graficaDataType, graficaDonaDataType } from '../type/types'

export const filtrosColumnasObj = {
  canastillas: false,
  kilos: false,
  placa: false,
  kilosVaciados: false,
  promedio: false,
  rendimiento: false,
  descarteLavado: false,
  descarteEncerado: false,
  directoNacional: false,
  frutaNacional: false,
  desverdizado: false,
  exportacion: false,
  observaciones: false,
  deshidratacion: false
}
export const datosGraficas = (datos: LoteDataType[]): graficaDataType[] => {
  const prediosTotal = datos.map((lote) => lote.nombrePredio)
  const prediosSet = new Set(prediosTotal)
  const predios = [...prediosSet]
  const salida = predios.map((nombrepredio) => {
    const kilosProm =
      datos
        .filter((item) => item.nombrePredio === nombrepredio)
        .reduce((acu, kilos) => (acu += kilos.kilos), 0) /
      datos.filter((item) => item.nombrePredio === nombrepredio).length
    const kilosVaciadosProm =
      datos
        .filter((item) => item.nombrePredio === nombrepredio)
        .reduce((acu, kilos) => (acu += kilos.kilosVaciados), 0) /
      datos.filter((item) => item.nombrePredio === nombrepredio).length
    const descarteLavadoProm =
      datos
        .filter((item) => item.nombrePredio === nombrepredio)
        .reduce(
          (acu, kilos) =>
            (acu += Object.keys(kilos.descarteLavado).reduce(
              (acu2, itemdescarte) => (acu2 += kilos.descarteLavado[itemdescarte]),
              0
            )),
          0
        ) / datos.filter((item) => item.nombrePredio === nombrepredio).length
    const descarteEnceradoProm =
      datos
        .filter((item) => item.nombrePredio === nombrepredio)
        .reduce(
          (acu, kilos) =>
            (acu += Object.keys(kilos.descarteEncerado).reduce(
              (acu2, itemdescarte) => (acu2 += kilos.descarteEncerado[itemdescarte]),
              0
            )),
          0
        ) / datos.filter((item) => item.nombrePredio === nombrepredio).length
    const exportacionProm =
      datos
        .filter((item) => item.nombrePredio === nombrepredio)
        .reduce(
          (acu1, lote) =>
            (acu1 += Object.prototype.hasOwnProperty.call(lote, 'exportacion')
              ? Object.keys(lote.exportacion).reduce(
                  (acu2, contenedor) =>
                    (acu2 += Object.keys(lote.exportacion[contenedor]).reduce(
                      (acu3, calidad) => (acu3 += lote.exportacion[contenedor][calidad]),
                      0
                    )),
                  0
                )
              : 0),
          0
        ) / datos.filter((item) => item.nombrePredio === nombrepredio).length

    return {
      nombrePredio: nombrepredio,
      kilos: kilosProm,
      kilosVaciados: kilosVaciadosProm,
      descarteLavado: descarteLavadoProm,
      descarteEncerado: descarteEnceradoProm,
      exportacion: exportacionProm
    }
  })
  return salida
}
export const datosGraficaDona = (datos: LoteDataType[]): graficaDonaDataType => {
  const totalDescarteEncerado = datos.reduce(
    (acu, kilos) =>
      (acu += Object.keys(kilos.descarteEncerado).reduce(
        (acu2, itemdescarte) => (acu2 += kilos.descarteEncerado[itemdescarte]),
        0
      )),
    0
  )
  const totalDescarteLavado = datos.reduce(
    (acu, kilos) =>
      (acu += Object.keys(kilos.descarteLavado).reduce(
        (acu2, itemdescarte) => (acu2 += kilos.descarteLavado[itemdescarte]),
        0
      )),
    0
  )
  const totalExportacion = datos.reduce(
    (acu1, lote) =>
      (acu1 += Object.prototype.hasOwnProperty.call(lote, 'exportacion')
        ? Object.keys(lote.exportacion).reduce(
            (acu2, contenedor) =>
              (acu2 += Object.keys(lote.exportacion[contenedor]).reduce(
                (acu3, calidad) => (acu3 += lote.exportacion[contenedor][calidad]),
                0
              )),
            0
          )
        : 0),
    0
  )
  const totalDeshidratacion = datos.reduce((acu, kilos) => (acu += kilos.deshidratacion), 0)

  const totalFrutaNacional = datos.reduce((acu, kilos) => (acu += kilos.frutaNacional), 0)

  const totalDirectoNacional = datos.reduce((acu, kilos) => (acu += kilos.directoNacional), 0)

  const total = totalDescarteEncerado + totalDescarteLavado + totalExportacion + totalDeshidratacion + totalFrutaNacional + totalDirectoNacional

  const porcentajedescarteEncerado =  (totalDescarteEncerado  * 100 ) / total;
  const porcentajedescarteLavado =  (totalDescarteLavado  * 100 ) / total;
  const porcentajeDeshidratacion=  (totalDeshidratacion  * 100 ) / total;
  const porcentajeExportacion=  (totalExportacion  * 100 ) / total;
  const porcentajeFrutaNacional=  (totalFrutaNacional  * 100 ) / total;
  const porcentajeDirectoNacionall=  (totalDirectoNacional  * 100 ) / total;
  
  return {
    descarteEncerado: porcentajedescarteEncerado,
    descarteLavado: porcentajedescarteLavado,
    desHidratacion: porcentajeDeshidratacion,
    exportacion: porcentajeExportacion,
    frutaNacional: porcentajeFrutaNacional,
    directoNacional:porcentajeDirectoNacionall
  }
}
