/* eslint-disable prettier/prettier */

import { format } from 'date-fns'
import { LoteDataType, graficaDataType, graficaDataTypeCalidad, graficaDonaDataType } from '../type/types'

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
    nombrepredio = nombrepredio || '';
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
export const datosGraficasCalidad = (datos: LoteDataType[]): graficaDataTypeCalidad[] => {
  const prediosTotal = datos.map((lote) => lote.nombrePredio)
  const prediosSet = new Set(prediosTotal)
  const predios = [...prediosSet]
  const salida = predios.map((nombrepredio) => {
    nombrepredio = nombrepredio || '';
    const acidezPromedio = promedioCalidad(datos.filter((item) => item.nombrePredio === nombrepredio), "acidez")
    const brixPromedio = promedioCalidad(datos.filter((item) => item.nombrePredio === nombrepredio), "brix")
    const ratioPromedio = promedioCalidad(datos.filter((item) => item.nombrePredio === nombrepredio), "ratio")
    const pesoPromedio = promedioCalidad(datos.filter((item) => item.nombrePredio === nombrepredio), "peso")
    const zumoPromedio = promedioCalidad(datos.filter((item) => item.nombrePredio === nombrepredio), "zumo")

    return {
      nombrePredio: nombrepredio,
      acidez: acidezPromedio,
      brix: brixPromedio,
      ratio: ratioPromedio,
      peso: pesoPromedio,
      zumo: zumoPromedio
    }
  })
  return salida
}
export const datosGraficasHistogramaCalidad = (datos: LoteDataType[]): graficaDataTypeCalidad[] => {
  const fechaTotal = datos.map((lote) => format(new Date(lote.fechaIngreso), 'dd-MM-yyyy'))
  const fechasSet = new Set(fechaTotal)
  const fechas = [...fechasSet]
  const salida = fechas.map((fecha) => {
    const acidezPromedio = promedioCalidad(datos.filter((item) =>  format(new Date(item.fechaIngreso), 'dd-MM-yyyy') === fecha), "acidez")
    const brixPromedio = promedioCalidad(datos.filter((item) => format(new Date(item.fechaIngreso), 'dd-MM-yyyy') === fecha), "brix")
    const ratioPromedio = promedioCalidad(datos.filter((item) => format(new Date(item.fechaIngreso), 'dd-MM-yyyy') === fecha), "ratio")
    const pesoPromedio = promedioCalidad(datos.filter((item) => format(new Date(item.fechaIngreso), 'dd-MM-yyyy') === fecha), "peso")
    const zumoPromedio = promedioCalidad(datos.filter((item) => format(new Date(item.fechaIngreso), 'dd-MM-yyyy') === fecha), "zumo")

    return {
      nombrePredio: fecha,
      acidez: acidezPromedio,
      brix: brixPromedio,
      ratio: ratioPromedio,
      peso: pesoPromedio,
      zumo: zumoPromedio
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
export const promedio = (datos: LoteDataType[], llave): number => {
  const sumatoria = datos.reduce((acu, item) => acu += Number(item[llave]), 0);
  const promedio = sumatoria /  datos.length
  return promedio
}
export const promedioDescartes = (datos: LoteDataType[], llave): number => {
  const sumatoria = datos.reduce(
    (acu, kilos) =>
      (acu += Object.keys(kilos[llave]).reduce(
        (acu2, itemdescarte) => (acu2 += kilos[llave][itemdescarte]),
        0
      )),
    0
  )
  const promedio = sumatoria / datos.length
  return promedio
}
export const promedioExportacion = (datos: LoteDataType[]): number => {
  const sumatoria = datos.reduce(
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
  const promedio = sumatoria / datos.length
  return promedio
}
export const promedioCalidad = (datos: LoteDataType[], llave): number => {
  const sumatoria = datos.reduce((acu, item) => {
    if(Object.prototype.hasOwnProperty.call(item,'calidad') && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna')){
      return acu += Number(item.calidad.calidadInterna[llave])
    } else {
      return acu += 0
    }
  }, 0);
  const promedio = sumatoria /  datos.length
  return promedio
}
