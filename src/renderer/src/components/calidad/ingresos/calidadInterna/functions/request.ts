/* eslint-disable prettier/prettier */

export const requestLotes = {

  action: 'getLotesCalidadInterna'

}

// export const new_lote = (formulario, lote: lotesType, clasificacionCalidad: string):lotesType => {
//   return {
//     ...lote,
//   clasificacionCalidad:clasificacionCalidad,
//   calidad:{
//     ...lote.calidad,
//     calidadInterna:{
//       zumo: Number(formulario.zumo),
//       peso: Number(formulario.pesoInicial),
//       brix:(Number(formulario.brix1) + Number(formulario.brix2) + Number(formulario.brix3)) / 3,
//       acidez:(Number(formulario.acidez1) + Number(formulario.acidez2) + Number(formulario.acidez3)) / 3,
//       semillas: Boolean(formulario.semillas),
//       ratio:
//       (Number(formulario.brix1) / Number(formulario.acidez1) +
//           Number(formulario.brix2) / Number(formulario.acidez2) +
//           Number(formulario.brix3) / Number(formulario.acidez3)) / 3,
//       fecha: new Date().toUTCString()
//     }
//   }
//   }
// }

export const new_lote = (formulario): object => {
  return {
    "calidad.calidadInterna.zumo": Number(formulario.zumo),
    "calidad.calidadInterna.peso": Number(formulario.pesoInicial),
    "calidad.calidadInterna.brix": (Number(formulario.brix1) + Number(formulario.brix2) + Number(formulario.brix3)) / 3,
    "calidad.calidadInterna.acidez": (Number(formulario.acidez1) + Number(formulario.acidez2) + Number(formulario.acidez3)) / 3,
    "calidad.calidadInterna.semillas": Boolean(formulario.semillas),
    "calidad.calidadInterna.ratio":
      (Number(formulario.brix1) / Number(formulario.acidez1) +
        Number(formulario.brix2) / Number(formulario.acidez2) +
        Number(formulario.brix3) / Number(formulario.acidez3)) / 3,
    "calidad.calidadInterna.fecha": new Date().toUTCString()

  }
}