/* eslint-disable prettier/prettier */

import { useState } from 'react'
import { historialProcesoType } from '../types/types'

type vaciadoType = {
    closeModal: () => void
    propsModal: historialProcesoType
    theme:string
    setShowSuccess: (e) => void
    setShowError: (e) => void
    setMessage: (e) => void
  }

export default function ModificarHistorialProceso(props: vaciadoType): JSX.Element {
  const [canastillas, setCanastillas] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const vaciar = async (): Promise<void> => {
    try {
        setLoading(true)
      const canastillasInt = canastillas
      const propsCanastillasInt = props.propsModal.documento.kilosVaciados / props.propsModal.documento.promedio

      if (canastillasInt > propsCanastillasInt) {
        props.setShowError(true)
        props.setMessage("Error en el numero de canastillas!")
        setInterval(() => {
          props.setShowError(false)
        }, 5000)
      } else {
        const new_lote = props.propsModal.documento;
        new_lote.inventarioActual.inventario += canastillasInt;
        new_lote.kilosVaciados -= canastillasInt * new_lote.promedio;

        const request = {
          data:{
            lote: new_lote
          },
          collection:'lotes',
          action: 'putLotes',
          query: 'proceso',
          record: 'modificarHistorialVaciado'
        }
        const response = await window.api.server(request)
        if (response.status === 200) {
          props.closeModal()
          props.setShowSuccess(true)
          props.setMessage("Historial modificado!")
          setInterval(() => {
            props.setShowSuccess(false)
          }, 5000)
        }  else {
          props.setShowError(true)
          props.setMessage(`Error ${response.status}: ${response.message}`)
          setInterval(() => {
            props.setShowError(false)
          }, 5000)
        }
      }
    } catch (e: unknown) {
      alert(`${e}`)
    } finally{
      setLoading(false)
    }
  }
  return (
    <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
    <div className={`${props.theme === 'Dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl w-96 h-90 overflow-hidden pb-5`}>
      <div className={`bg-Celifrut-green flex justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}>
        <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>{props.propsModal.documento.predio.PREDIO}</h2>
      </div>
      <div className="flex justify-center pb-5 px-4">
        <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>Ingrese el numero de canastillas que desea regresar al inventario:</p>
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
          onClick={vaciar}
        >
          {loading && <span className="loader"></span>}
          Aceptar
        </button>
        <button
          className={`border-2 border-gray-200 rounded-md px-4 py-2 ${props.theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'} `}
          onClick={props.closeModal}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
}

