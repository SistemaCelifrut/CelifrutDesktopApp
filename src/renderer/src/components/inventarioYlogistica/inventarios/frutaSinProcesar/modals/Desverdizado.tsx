/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'
import {  useState } from 'react'
import "../../../../../css/modal-style.css"


type vaciadoType = {
    closeDesverdizado: () => void
    propsModal: lotesType
    handleInfo: () => void
  }

export default function Desverdizado(props: vaciadoType): JSX.Element {
  const {messageModal} = useAppContext();
  const [canastillas, setCanastillas] = useState<number>(0)
  const [cuartoDesverdizado, setCuartoDesverdizado] = useState<string>('')

  const vaciar = async (): Promise<void> => {
    try {
      const canastillasInt = canastillas
      const propsCanastillasInt = props.propsModal.inventarioActual ? props.propsModal.inventarioActual.inventario : 0

      if (propsCanastillasInt !== undefined && canastillasInt > propsCanastillasInt) {
        messageModal("error","Error en el numero de canastillas!")
      } else {
        const nuevo_lote = JSON.parse(JSON.stringify(props.propsModal));
        nuevo_lote["inventarioActual.inventario"] = nuevo_lote.inventarioActual.inventario - canastillasInt;
        delete nuevo_lote.inventarioActual;
        nuevo_lote.desverdizado = {}
        nuevo_lote.desverdizado.canastillas = canastillasInt;
        nuevo_lote.desverdizado.canastillasIngreso = canastillasInt;
        const suma_canastillas = Number(nuevo_lote.promedio) * Number(canastillasInt);
        nuevo_lote.desverdizado.kilos = suma_canastillas;
        nuevo_lote.desverdizado.kilosIngreso = suma_canastillas;
        nuevo_lote.desverdizado.cuartoDesverdizado = cuartoDesverdizado;
        
        const request = {
          data:{
            lote: nuevo_lote,
          },
          collection:'lotes',
          action: 'putLotes',
          query: 'proceso',
          record: "desverdizado"
        }
        const response = await window.api.server(request)
        console.log(response)
        if (response.status === 200) {
          messageModal("success","Fruta puesta a desverdizar!")
        } else {
          messageModal("error",`Error ${response.status}: ${response.message}`)
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", e.message)
    }
    } finally{
      props.closeDesverdizado();
      props.handleInfo();
    }
  }
  return (
    <div className="fondo-modal">
    <div className="modal-container">
      <div className='modal-header-warning'>
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
        <p>Cuarto Desverdizado</p>
        <input
          type="text"
          className="border-2 border-gray-200 rounded-md p-2"
          onChange={(e): void => setCuartoDesverdizado(e.target.value)}
        />
      </div>
      <div className="modal-container-buttons">
        <button onClick={vaciar} className='warning'>Desverdizar</button>
        <button onClick={props.closeDesverdizado} className='cancel'>Cancelar</button>
      </div>
     </div>
    </div>

);
}

