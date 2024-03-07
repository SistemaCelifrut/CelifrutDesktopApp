/* eslint-disable prettier/prettier */

import useAppContext from '@renderer/hooks/useAppContext'
import { historialLotesType } from '@renderer/types/lotesType'
import { useState } from 'react'
import { compararCanastillas, requestModificarHistorial } from '../functions/request'

type vaciadoType = {
    closeModal: () => void
    propsModal: historialLotesType
    obtenerHistorialProceso: () => Promise<void>
  }

export default function ModificarHistorialProceso(props: vaciadoType): JSX.Element {
  const {theme, messageModal} = useAppContext();
  const [canastillas, setCanastillas] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const modificar = async (): Promise<void> => {
    try {
        setLoading(true) 
        const checkCanastillas = compararCanastillas(Number(canastillas), props.propsModal)
        if(checkCanastillas){
          throw new Error("Error en el numero de canastillas")
        }
        const [requestLotes, requestHistorial] = requestModificarHistorial(Number(canastillas), props.propsModal)
        
        const responsehistorial = await window.api.server(requestHistorial)
        const responseLotes = await window.api.server(requestLotes)

        if (responseLotes.status === 200 && responsehistorial.status === 200) {
          messageModal("success","Historial modificado!");
          await props.obtenerHistorialProceso()
        }  else {
          throw new Error(`Error ${responseLotes.status}: ${responseLotes.message} y Error ${responsehistorial.status}: ${responsehistorial.message}`)
        }
    } catch (e: unknown) {
      if(e instanceof Error){
       messageModal("error", `${e.message}`)
      }
    } finally{
      setLoading(false)
      props.closeModal();
    }
  }
  return (
    <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
    <div className={`${theme === 'Dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl w-96 h-90 overflow-hidden pb-5`}>
      <div className={`bg-Celifrut-green flex justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}>
        <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>
          {props.propsModal.documento.predio && props.propsModal.documento.predio.PREDIO}
        </h2>
      </div>
      <div className="flex justify-center pb-5 px-4">
        <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>
          Ingrese el numero de canastillas que desea regresar al inventario:
        </p>
      </div>
      <div className="flex justify-center pb-10">
        <input
          type="number"
          min="0"
          step="1"
          className="border-2 border-gray-200 rounded-md p-2"
          onChange={(e): void => setCanastillas(Number(e.target.value))}
        />
      </div>
      <div className="flex justify-center gap-4">
        <button
          className={`flex items-center justify-center ${loading ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-md px-4 py-2`}
          onClick={modificar}
        >
          {loading && <span className="loader"></span>}
          Aceptar
        </button>
        <button
          className={`border-2 border-gray-200 rounded-md px-4 py-2 ${theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'} `}
          onClick={props.closeModal}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
}

