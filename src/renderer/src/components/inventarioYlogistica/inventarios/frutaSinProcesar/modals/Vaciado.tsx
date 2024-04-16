/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'
import { useState } from 'react'
import "../../../../../css/modal-style.css"

type vaciadoType = {
    closeVaciado: () => void
    propsModal: lotesType
    handleInfo: () => void;
  }

export default function Vaciado(props: vaciadoType): JSX.Element {
  const {messageModal} = useAppContext();
  const [canastillas, setCanastillas] = useState<number>(0)

  const vaciar = async (): Promise<void> => {
    try {

      const canastillasInt = canastillas
      const propsCanastillasInt =  props.propsModal.inventarioActual ?  props.propsModal.inventarioActual.inventario : 0

      if (propsCanastillasInt !== undefined && canastillasInt > propsCanastillasInt) {
        messageModal("error","Error en el numero de canastillas!")
      } else {
        const nuevo_lote = JSON.parse(JSON.stringify(props.propsModal));
        nuevo_lote["inventarioActual.inventario"] = nuevo_lote.inventarioActual.inventario - canastillasInt;
        nuevo_lote.kilosVaciados = Number(nuevo_lote.kilosVaciados)  + (Number(nuevo_lote.promedio) * Number(canastillasInt));
        if ('inventario' in nuevo_lote.inventarioActual) {
          delete nuevo_lote.inventarioActual.inventario;
        }
        if ('inventarioActual' in nuevo_lote) {
          delete nuevo_lote.inventarioActual;
        }
        const request = {
          data:{
            lote: nuevo_lote,
            vaciado: canastillasInt
          },
          collection:'lotes',
          action: 'vaciarLote',
          query: 'proceso',
          record: 'vaciarLote'
        }
        const response = await window.api.server(request)
        // console.log(request)
        // const response = {status:401};
        if (response.status === 200) {
          messageModal("success","Fruta vaciada!")
        } else {
          messageModal("error",`Error ${response.status}: ${response.message}`)
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", e.message)
    }
    } finally{
        props.closeVaciado();
        props.handleInfo();
    }
  }
  return (
    <div className="fondo-modal">
    <div className="modal-container">
      <div className='modal-header-agree'>
        <h2>{props.propsModal.predio && props.propsModal.predio.PREDIO}</h2>
      </div>
      <div className='modal-container-body'>
          <p>
            Numero de canastillas en inventario: {props.propsModal.inventarioActual && props.propsModal.inventarioActual.inventario}
          </p>
          <input
            type="number"
            min="0"
            step="1"
            onChange={(e): void => setCanastillas(Number(e.target.value))}
          />
       
      </div>
      <div className="modal-container-buttons">
        <button onClick={vaciar} className='agree'>Vaciar</button>
        <button onClick={props.closeVaciado} className='cancel'>Cancelar</button>
      </div>
    </div>
  </div>
);
}

