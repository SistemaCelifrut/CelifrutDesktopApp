/* eslint-disable prettier/prettier */
import { themeContext } from '@renderer/App'
import { useContext, useState } from 'react'
import { prediosType } from '../types/types'

type vaciadoType = {
    closeDesverdizado: () => void
    propsModal: prediosType
    setShowSuccess: (e) => void 
    setShowError: (e) => void
    setMessage: (e) => void
  }

export default function Desverdizado(props: vaciadoType): JSX.Element {
  const theme = useContext(themeContext);
  const [canastillas, setCanastillas] = useState<number>(0)
  const [cuartoDesverdizado, setCuartoDesverdizado] = useState<string>('')

  const vaciar = async (): Promise<void> => {
    try {
      const canastillasInt = canastillas
      const propsCanastillasInt = props.propsModal.inventarioActual.inventario

      if (canastillasInt > propsCanastillasInt) {
        props.setShowError(true)
        props.setMessage("Error en el numero de canastillas!")
        setInterval(() => {
          props.setShowError(false)
        }, 5000)
      } else {
        const nuevo_lote = props.propsModal
        nuevo_lote.inventarioActual.inventario -= canastillasInt;
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
            vaciado: canastillas
          },
          collection:'lotes',
          action: 'desverdizado',
          query: 'proceso'
        }

        const response = await window.api.server(request)
        console.log(response)
        if (response.status === 200) {
          props.closeDesverdizado()
          props.setShowSuccess(true)
          props.setMessage("Fruta puesta a desverdizar!")
          setInterval(() => {
            props.setShowSuccess(false)
          }, 5000)
        } else {
          props.setShowError(true)
          props.setMessage(`Error ${response.status}: ${response.message}`)
          setInterval(() => {
            props.setShowError(false)
          }, 5000)
        }
      }
    } catch (e: unknown) {
      props.setShowError(true)
      props.setMessage(`Error ${e}`)
      setInterval(() => {
        props.setShowError(false)
      }, 5000)
    }
  }
  return (
    <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
    <div className={`${theme === 'Dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl w-96 h-90 overflow-hidden pb-5`}>
      <div className={`flex bg-yellow-500 justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}>
        <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>{props.propsModal.predio.PREDIO}</h2>
      </div>
      <div className="flex justify-center pb-2">
        <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>Numero de canastillas en inventario: {props.propsModal.inventarioActual.inventario}</p>
      </div>
      <div className="flex justify-center pb-5">
        <input
          type="number"
          min="0"
          step="1"
          className="border-2 border-gray-200 rounded-md p-2"
          onChange={(e): void => setCanastillas(Number(e.target.value))}
        />
      </div>
      <div className="flex justify-center pb-2">
        <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>Cuarto Desverdizado</p>
      </div>
      <div className="flex justify-center pb-10">
        <input
          type="text"
          className="border-2 border-gray-200 rounded-md p-2"
          onChange={(e): void => setCuartoDesverdizado(e.target.value)}
        />
      </div>
      <div className="flex justify-center gap-4">
        <button
          className={`flex items-center justify-center bg-blue-600 text-white rounded-md px-4 py-2`}
          onClick={vaciar}
        >
          Aceptar
        </button>
        <button
          className={`border-2 border-gray-200 rounded-md px-4 py-2 ${theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'} `}
          onClick={props.closeDesverdizado}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);
}

