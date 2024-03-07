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
    console.log(propsModal)
  const new_lote = propsModal.documento;
    let new_historial 
    if(new_lote.directoNacional && Object.prototype.hasOwnProperty.call(new_lote, 'inventarioActual.inventario')&& new_lote.promedio){
        new_lote.directoNacional = -(canastillas * new_lote.promedio);
        new_historial = -(canastillas * new_lote.promedio);
      }

      const requestLotes = {
        data:{
          lote: {
            _id:new_lote._id,
            $inc:{
              directoNacional: new_lote.directoNacional,
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
                $inc:{"documento.directoNacional":new_historial}
            }
          },
          collection:'historialLotes',
          action: 'putHistorialLote',
          query: 'proceso'
        }

      return [requestLotes, requestHistorial];
    
}
export const compararCanastillas = (canastillas: number, propsModal: historialLotesType): boolean => {
  console.log(propsModal)

    const propsCanastillasInt = propsModal.documento.directoNacional && propsModal.documento.promedio? 
    propsModal.documento.directoNacional / propsModal.documento.promedio : 0
    return canastillas > propsCanastillasInt
}