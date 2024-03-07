/* eslint-disable prettier/prettier */

import { format } from 'date-fns'
import { graficaDataType, graficaDataTypeCalidad, graficaDonaDataType } from '../type/types'
import { lotesType } from '@renderer/types/lotesType'

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
export const datosGraficas = (datos: lotesType[]): graficaDataType[] => {
  const prediosTotal = datos.map((lote) => lote.predio?.PREDIO)
  const prediosSet = new Set(prediosTotal)
  const predios = [...prediosSet]
  const salida = predios.map((nombrepredio) => {
    nombrepredio = nombrepredio || '';
    const kilosProm =
      datos
        .filter((item) => item.predio?.PREDIO === nombrepredio)
        .reduce((acu, kilos) => (acu += kilos.kilos ? kilos.kilos : 0), 0) /
      datos.filter((item) => item.predio?.PREDIO === nombrepredio).length
    const kilosVaciadosProm =
      datos
        .filter((item) => item.predio?.PREDIO === nombrepredio)
        .reduce((acu, kilos) => (acu += kilos.kilosVaciados ? kilos.kilosVaciados : 0), 0) /
      datos.filter((item) => item.predio?.PREDIO === nombrepredio).length
    const descarteLavadoProm =
      datos
        .filter((item) => item.predio?.PREDIO === nombrepredio)
        .reduce(
          (acu, kilos) =>
            (acu += Object.keys(kilos.descarteLavado ? kilos.descarteLavado : []).reduce(
              (acu2, itemdescarte) => (acu2 += kilos.descarteLavado && kilos.descarteLavado[itemdescarte]),
              0
            )),
          0
        ) / datos.filter((item) => item.predio?.PREDIO === nombrepredio).length
    const descarteEnceradoProm =
      datos
        .filter((item) => item.predio?.PREDIO === nombrepredio)
        .reduce(
          (acu, kilos) =>
            (acu += Object.keys(kilos.descarteEncerado ? kilos.descarteEncerado : 0).reduce(
              (acu2, itemdescarte) => (acu2 += kilos.descarteEncerado && kilos.descarteEncerado[itemdescarte]),
              0
            )),
          0
        ) / datos.filter((item) => item.predio?.PREDIO === nombrepredio).length
    const exportacionProm = datos.filter((item) => item.predio?.PREDIO === nombrepredio)
        .reduce(
          (acu, lote) =>  acu += (lote.calidad1 && lote.calidad15 && lote.calidad2) ? 
          lote.calidad1 + lote.calidad15 + lote.calidad2 : 0, 0
        ) / datos.filter((item) => item.predio?.PREDIO === nombrepredio).length

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
export const datosGraficasCalidad = (datos: lotesType[]): graficaDataTypeCalidad[] => {
  const prediosTotal = datos.map((lote) => lote.predio?.PREDIO)
  const prediosSet = new Set(prediosTotal)
  const predios = [...prediosSet]
  const salida = predios.map((nombrepredio) => {
    nombrepredio = nombrepredio || '';
    const acidezPromedio = promedioCalidad(datos.filter((item) => item.predio?.PREDIO === nombrepredio), "acidez")
    const brixPromedio = promedioCalidad(datos.filter((item) => item.predio?.PREDIO === nombrepredio), "brix")
    const ratioPromedio = promedioCalidad(datos.filter((item) => item.predio?.PREDIO === nombrepredio), "ratio")
    const pesoPromedio = promedioCalidad(datos.filter((item) => item.predio?.PREDIO === nombrepredio), "peso")
    const zumoPromedio = promedioCalidad(datos.filter((item) => item.predio?.PREDIO === nombrepredio), "zumo")

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
export const datosGraficasHistogramaCalidad = (datos: lotesType[]): graficaDataTypeCalidad[] => {
  const fechaTotal = datos.map((lote) => format(lote.fechaIngreso ? new Date(lote.fechaIngreso) : new Date(), 'dd-MM-yyyy'))
  const fechasSet = new Set(fechaTotal)
  const fechas = [...fechasSet]
  const salida = fechas.map((fecha) => {
    const acidezPromedio = promedioCalidad(datos.filter((item) =>  format(item.fechaIngreso ? new Date(item.fechaIngreso) : new Date(), 'dd-MM-yyyy') === fecha), "acidez")
    const brixPromedio = promedioCalidad(datos.filter((item) => format(item.fechaIngreso ? new Date(item.fechaIngreso) : new Date(), 'dd-MM-yyyy') === fecha), "brix")
    const ratioPromedio = promedioCalidad(datos.filter((item) => format(item.fechaIngreso ? new Date(item.fechaIngreso) : new Date(), 'dd-MM-yyyy') === fecha), "ratio")
    const pesoPromedio = promedioCalidad(datos.filter((item) => format(item.fechaIngreso ? new Date(item.fechaIngreso) : new Date(), 'dd-MM-yyyy') === fecha), "peso")
    const zumoPromedio = promedioCalidad(datos.filter((item) => format(item.fechaIngreso ? new Date(item.fechaIngreso) : new Date(), 'dd-MM-yyyy') === fecha), "zumo")

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
export const datosGraficaDona = (datos: lotesType[]): graficaDonaDataType => {
  const totalDescarteEncerado = datos.reduce(
    (acu, kilos) =>
      (acu += Object.keys(kilos.descarteEncerado ? kilos.descarteEncerado : {}).reduce(
        (acu2, itemdescarte) => (acu2 += kilos.descarteEncerado ? kilos.descarteEncerado[itemdescarte] : 0),
        0
      )),
    0
  )
  const totalDescarteLavado = datos.reduce(
    (acu, kilos) =>
      (acu += Object.keys(kilos.descarteLavado ? kilos.descarteLavado : {}).reduce(
        (acu2, itemdescarte) => (acu2 += kilos.descarteLavado ? kilos.descarteLavado[itemdescarte] : 0),
        0
      )),
    0
  )
  const totalExportacion = datos.reduce(
    (acu, lote) =>  acu += (lote.calidad1 && lote.calidad15 && lote.calidad2) ? 
      lote.calidad1 + lote.calidad15 + lote.calidad2 : 0, 0)
  const totalDeshidratacion = datos.reduce((acu, kilos) => (acu += kilos.deshidratacion ? kilos.deshidratacion : 0), 0)

  const totalFrutaNacional = datos.reduce((acu, kilos) => (acu += kilos.frutaNacional ? kilos.frutaNacional : 0), 0)

  const totalDirectoNacional = datos.reduce((acu, kilos) => (acu += kilos.directoNacional ? kilos.directoNacional : 0), 0)

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
export const promedio = (datos: lotesType[], llave): number => {
  const sumatoria = datos.reduce((acu, item) => acu += Number(item[llave]), 0);
  const promedio = sumatoria /  datos.length
  return promedio
}
export const promedioDescartes = (datos: lotesType[], llave): number => {
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
export const promedioExportacion = (datos: lotesType[]): number => {
  const sumatoria = datos.reduce(
    (acu, lote) => acu += (lote.calidad1 && lote.calidad15 && lote.calidad2) ? 
      lote.calidad1 + lote.calidad15 + lote.calidad2 : 0 ,0)
  const promedio = sumatoria / datos.length
  return promedio
}
export const promedioCalidad = (datos: lotesType[], llave): number => {
  const sumatoria = datos.reduce((acu, item) => {
    if(Object.prototype.hasOwnProperty.call(item,'calidad') && Object.prototype.hasOwnProperty.call(item.calidad, 'calidadInterna')){
      return acu += Number(item.calidad && item.calidad.calidadInterna[llave])
    } else {
      return acu += 0
    }
  }, 0);
  const promedio = sumatoria /  datos.length
  return promedio
}
