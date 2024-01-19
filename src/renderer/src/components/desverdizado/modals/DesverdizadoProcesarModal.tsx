/* eslint-disable prettier/prettier */

import { useState } from 'react'

type propsType = {
  closeProcesarDesverdizado: () => void
  propsModal: { nombre: string; canastillas: number; enf: string }
  theme: string
  setShowSuccess: (e) => void
  setShowError: (e) => void
  setMessage: (e) => void
}

export default function DesverdizadoProcesarModal(props: propsType): JSX.Element {
  const [canastillas, setCanastillas] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const vaciar = async (): Promise<void> => {
    try {
      setLoading(true)
      const canastillasInt = canastillas
      const propsCanastillasInt = props.propsModal.canastillas

      if (canastillasInt > propsCanastillasInt) {
        alert('Error en el numero de canastillas')
      } else {
        const obj = { canastillas: canastillas, enf: props.propsModal.enf, action: 'procesarDesverdizado' }
        const response = await window.api.proceso(obj)
        if (response.status === 200) {
          props.closeProcesarDesverdizado()
          props.setShowSuccess(true)
          props.setMessage("Lote vaciado con exito!")
          setInterval(() => {
            props.setShowSuccess(false)
          }, 5000)
        } else if (response.status === 400) {
          props.setShowError(true)
          props.setMessage("Error enviando los datos a el servidor!")
          setInterval(() => {
            props.setShowError(false)
          }, 5000)
        } else {
          props.setShowError(true)
          props.setMessage("Error enviando los datos a el servidor!")
          setInterval(() => {
            props.setShowError(false)
          }, 5000)
        }
      }
    } catch (e: unknown) {
      alert(`${e}`)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
      <div
        className={`${
          props.theme === 'Dark' ? 'bg-slate-800' : 'bg-white'
        } rounded-xl w-96 h-90 overflow-hidden pb-5`}
      >
        <div
          className={`bg-Celifrut-green flex justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}
        >
          <h2
            className={`${
              props.theme === 'Dark' ? 'text-white' : 'text-black'
            } text-lg font-semibold`}
          >
            {props.propsModal.nombre}
          </h2>
        </div>
        <div className="flex justify-center pb-5">
          <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>
            Numero de canastillas en inventario: {props.propsModal.canastillas}
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
            className={`flex items-center justify-center ${
              loading ? 'bg-blue-500' : 'bg-blue-600'
            } text-white rounded-md px-4 py-2`}
            onClick={vaciar}
          >
            {loading && <span className="loader"></span>}
            Vaciar
          </button>
          <button
            className={`border-2 border-gray-200 rounded-md px-4 py-2 ${
              props.theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'
            } `}
            onClick={props.closeProcesarDesverdizado}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
