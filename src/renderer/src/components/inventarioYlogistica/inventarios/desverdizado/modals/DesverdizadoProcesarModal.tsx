/* eslint-disable prettier/prettier */

import { useState } from 'react'
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'

type propsType = {
  closeProcesarDesverdizado: () => void
  propsModal: lotesType
  handleInfo: () => void
}

export default function DesverdizadoProcesarModal(props: propsType): JSX.Element {
  const { theme, messageModal } = useAppContext();
  const [canastillas, setCanastillas] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const vaciar = async (): Promise<void> => {
    try {
      setLoading(true)
      const canastillasInt = canastillas
      const propsCanastillasInt = props.propsModal.desverdizado?.canastillas ? props.propsModal.desverdizado?.canastillas : 0

      if (propsCanastillasInt !== undefined && canastillasInt > propsCanastillasInt) {
        messageModal("error","Error en el numero de canastillas!");
      } else if (props.propsModal.promedio !== undefined) {
     
        const nuevo_lote = JSON.parse(JSON.stringify(props.propsModal));
        nuevo_lote["desverdizado.canastillas"] = nuevo_lote.desverdizado.canastillas - canastillasInt;
        nuevo_lote["desverdizado.kilos"] = (nuevo_lote.desverdizado.canastillas - canastillasInt) * props.propsModal.promedio;
        nuevo_lote["desverdizado.fechaProceso"] = new Date().toUTCString();
        nuevo_lote.kilosVaciados = nuevo_lote.kilosVaciados + (canastillasInt * props.propsModal.promedio);
        nuevo_lote.tipoFruta = "Naranja";
        delete nuevo_lote.desverdizado
        const request = {
          data:{
            lote: nuevo_lote
          },
          collection:'lotes',
          action: 'vaciarLote',
          query: 'proceso',
          record: 'vaciarLote'
        }
        const response = await window.api.server(request)
        if (response.status === 200) {
          messageModal("success","Lote vaciado con exito!");
        } else if (response.status === 400) {
          messageModal("error","Error enviando los datos a el servidor!")
        } else {
          messageModal("error","Error enviando los datos a el servidor!");
        }
      }
    } catch (e: unknown) {
      messageModal("error",`${e}`)
    } finally {
      setLoading(false)
      props.handleInfo();
    }
  }
  return (
    <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
      <div
        className={`${
          theme === 'Dark' ? 'bg-slate-800' : 'bg-white'
        } rounded-xl w-96 h-90 overflow-hidden pb-5`}
      >
        <div
          className={`bg-Celifrut-green flex justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}
        >
          <h2
            className={`${
              theme === 'Dark' ? 'text-white' : 'text-black'
            } text-lg font-semibold`}
          >
            {props.propsModal.predio && props.propsModal.predio.PREDIO}
          </h2>
        </div>
        <div className="flex justify-center pb-5">
          <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>
            Numero de canastillas en inventario: {props.propsModal.desverdizado?.canastillas}
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
              theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'
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
