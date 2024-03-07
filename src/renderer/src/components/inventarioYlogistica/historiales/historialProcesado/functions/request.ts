/* eslint-disable prettier/prettier */
import { historialLotesType, lotesType } from "@renderer/types/lotesType";

type requestModificarHistorialType = {
    data:{
        lote: lotesType
      },
      collection: string
      action: string
      query: string
      record?: string
}

export const requestModificarHistorial = (canastillas:number , propsModal: historialLotesType): requestModificarHistorialType[] => {
    const new_lote = propsModal.documento;
    let new_historial 
    if(new_lote.kilosVaciados && Object.prototype.hasOwnProperty.call(new_lote, 'inventarioActual.inventario')&& new_lote.promedio){
        new_lote.kilosVaciados = -(canastillas * new_lote.promedio);
        new_historial = -(canastillas * new_lote.promedio);
      }

      const requestLotes = {
        data:{
          lote: {
            _id:new_lote._id,
            $inc:{
                kilosVaciados: new_lote.kilosVaciados,
                "inventarioActual.inventario": canastillas
                
            }
          }
        },
        collection:'lotes',
        action: 'putLotes',
        query: 'proceso',
        record: 'modificarHistorialVaciado'
      }

      const requestHistorial = {
        data:{
            lote: {
                _id:propsModal._id,
                $inc:{"documento.kilosVaciados":new_historial}
            }
          },
          collection:'historialLotes',
          action: 'putHistorialLote',
          query: 'proceso'
        }

      return [requestLotes, requestHistorial];
    
}
export const compararCanastillas = (canastillas: number, propsModal: historialLotesType): boolean => {
    const propsCanastillasInt = propsModal.documento.kilosVaciados && propsModal.documento.promedio? 
    propsModal.documento.kilosVaciados / propsModal.documento.promedio : 0
    return canastillas > propsCanastillasInt
}