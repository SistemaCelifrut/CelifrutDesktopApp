/* eslint-disable prettier/prettier */
import { historialLotesType } from "@renderer/types/lotesType";

export const requestModificarHistorial = (canastillas: number, propsModal: historialLotesType): object => {
  const promedio = propsModal.documento.promedio !== undefined ? propsModal.documento.promedio : 0;
  const request = {
    _id: propsModal.documento._id,
    kilosVaciados: -(canastillas * promedio),
    inventario: canastillas,
    historialLote: {
      _idRecord: propsModal._id,
      kilosHistorial: -(canastillas * promedio),
      __vHistorial:propsModal.__v,
    },
    __v:propsModal.documento.__v,
    action: 'modificarHistorialFrutaProcesada',

  }


  return request;

}
export const compararCanastillas = (canastillas: number, propsModal: historialLotesType): boolean => {
  const propsCanastillasInt = propsModal.documento.kilosVaciados && propsModal.documento.promedio ?
    propsModal.documento.kilosVaciados / propsModal.documento.promedio : 0
  return canastillas > propsCanastillasInt
}
export const requestData = (fechaInicio, fechaFin): object => {
  const fechaActual = new Date(); 
  const fechaMinima = new Date(fechaActual); 
   // Restar 7 días a la fecha actual para obtener la fecha de una semana antes
   fechaMinima.setDate(fechaActual.getDate() - 7);
  // Si fechaInicio es "" o null, usar fecha mínima
  if (!fechaInicio) {
    fechaInicio = fechaMinima;
  } else {
    fechaInicio = new Date(fechaInicio);
  }

  // Si fechaFin es "" o null, usar fecha actual
  if (!fechaFin) {
    fechaFin = fechaActual;
  } else {
    fechaFin = new Date(fechaFin);
  }

  // Si fechaFin es menor que fechaInicio, usar fecha actual
  if (fechaFin < fechaInicio) {
    fechaFin = fechaActual;
  }

  return {
    data: {
      query: {
        operacionRealizada: "vaciarLote"
      },
      fecha:{fechaInicio:fechaInicio, fechaFin:fechaFin},
    },
    action: 'obtenerHistorialLotes',
  }
};
