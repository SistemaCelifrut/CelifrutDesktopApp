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
      const propsCanastillasInt =  props.propsModal.inventario ?  props.propsModal.inventario : 0

      if (propsCanastillasInt !== undefined && canastillasInt > propsCanastillasInt) {
        messageModal("error","Error en el numero de canastillas!")
      } else {
        
        const request = {
          data:{
            inventario:props.propsModal.inventario,
            query:{
              $inc:{
                kilosVaciados: props.propsModal.inventario
              }
            }
          },
          action: 'vaciarLote',
          
        }
        const response = await window.api.server2(request)
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
            Numero de canastillas en inventario: {props.propsModal.inventario && props.propsModal.inventario}
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

