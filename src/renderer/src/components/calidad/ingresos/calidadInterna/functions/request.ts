/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType"

export const requestLotes = {
  data: {
    query: {
      'calidad.calidadInterna': { $exists: false },
      enf: { $regex: '^E', $options: 'i' }
    },
    select: { enf: 1, calidad: 1, tipoFruta: 1 },
    populate: {
      path: 'predio',
      select: 'PREDIO ICA'
    },
    sort: { fechaIngreso: -1 }
  },
  collection: 'lotes',
  action: 'getLotes',
  query: 'proceso'
}

export const new_lote = (formulario, lote: lotesType, clasificacionCalidad: string):lotesType => {
  return {
    ...lote,
  clasificacionCalidad:clasificacionCalidad,
  calidad:{
    ...lote.calidad,
    calidadInterna:{
      zumo: Number(formulario.zumo),
      peso: Number(formulario.pesoInicial),
      brix:(Number(formulario.brix1) + Number(formulario.brix2) + Number(formulario.brix3)) / 3,
      acidez:(Number(formulario.acidez1) + Number(formulario.acidez2) + Number(formulario.acidez3)) / 3,
      semillas: Boolean(formulario.semillas),
      ratio:
      (Number(formulario.brix1) / Number(formulario.acidez1) +
          Number(formulario.brix2) / Number(formulario.acidez2) +
          Number(formulario.brix3) / Number(formulario.acidez3)) / 3,
      fecha: new Date().toUTCString()
    }
  }
  }
}