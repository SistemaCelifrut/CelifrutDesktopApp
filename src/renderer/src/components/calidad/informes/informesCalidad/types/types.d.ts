/* eslint-disable prettier/prettier */
export type serverResponseType = {
  status: number
  data: informesCalidadType[]
}

export type informesCalidadType = {
    _id: string
    nombrePredio: string
    tipoFruta: string
    urlInformeCalidad: string
    deshidratacion: number
    calidad: object
    descarteLavado: object
}
