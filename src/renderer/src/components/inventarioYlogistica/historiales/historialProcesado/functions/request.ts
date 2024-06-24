/* eslint-disable prettier/prettier */
import { historialLotesType } from "@renderer/types/lotesType";

export const requestModificarHistorial = (canastillas: number, propsModal: historialLotesType): object => {
  const promedio = propsModal.documento.promedio !== undefined ? propsModal.documento.promedio : 0;
  const request = {
    data: {
      inventario: canastillas,

      query: {
        _id: propsModal.documento._id,
        $inc: {
          kilosVaciados: -(canastillas * promedio)
        }
      },
      historialLote: {
        _id: propsModal._id,
        $inc: {
          "documento.$inc.kilosVaciados": -(canastillas * promedio)
        }
      }
    },
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
  const fechaMinima = new Date(0); // Fecha mínima (1 de enero de 1970)
  const fechaActual = new Date(); // Fecha actual
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
      limit: 50
    },
    action: 'obtenerHistorialLotes',
  }
};
