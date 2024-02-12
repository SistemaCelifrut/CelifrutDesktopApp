/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { prediosType } from '../types/types'

type vaciadoType = {
  closeDirecto: () => void
  propsModal: prediosType
  theme: string
  setShowSuccess: (e) => void
  setShowError: (e) => void
  setMessage: (e) => void
}

export default function Directo(props: vaciadoType): JSX.Element {
  const [canastillas, setCanastillas] = useState<number>(0)
  const [placa, setPlaca] = useState<string>('')
  const [nombreConductor, setNombreConductor] = useState<string>('')
  const [telefono, setTelefono] = useState<string>('')
  const [cedula, setCedula] = useState<string>('')
  const [remision, setRemision] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const vaciar = async (): Promise<void> => {
    try {
      setLoading(true)
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
        nuevo_lote.directoNacional = Number(nuevo_lote.directoNacional) + (Number(nuevo_lote.promedio) * Number(canastillasInt));
        nuevo_lote.infoSalidaDirectoNacional = {
          placa: placa,
          nombreConductor: nombreConductor,
          telefono: telefono,
          cedula: cedula,
          remision: remision
        }
        const request = {
          data:{
            lote: nuevo_lote,
            vaciado: canastillasInt
          },
          collection:'lotes',
          action: 'directoNacional',
          query: 'proceso'
        }

        const response = await window.api.server(request)
        if (response.status === 200) {
          props.closeDirecto()
          props.setShowSuccess(true)
          props.setMessage("Fruta enviada a directo nacional!")
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
      alert(`${e}`)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
      <div className={`${props.theme === 'Dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl w-96 h-90 overflow-hidden pb-5`}>
        <div className={`bg-red-600  flex justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}>
          <h2 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>{props.propsModal.predio.PREDIO}</h2>
        </div>
        <div className="flex justify-center pb-5">
          <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>Numero de canastillas en inventario: {props.propsModal.inventarioActual.inventario}</p>
        </div>
        <div className="flex flex-col mx-5 justify-center pb-10">
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Canastillas
            <input
              type="number"
              min="0"
              step="1"
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setCanastillas(Number(e.target.value))}
            />
          </label>
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Placa
            <input
              type="text"
              value={placa}
              maxLength={6}
              pattern="[A-Z]{3}[0-9]{3}"
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setPlaca(e.target.value)}
            />
          </label>
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Nombre conductor
            <input
              type="text"
              value={nombreConductor}
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setNombreConductor(e.target.value)}
            />
          </label>
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Telefono
            <input
              type="text"
              value={telefono}
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setTelefono(e.target.value)}
            />
          </label>
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Cedula
            <input
              type="text"
              value={cedula}
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setCedula(e.target.value)}
            />
          </label>
          <label className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Remision
            <input
              type="text"
              value={remision}
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setRemision(e.target.value)}
            />
          </label>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className={`flex items-center justify-center ${loading ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-md px-4 py-2`}
            onClick={vaciar}
          >
            {loading && <span className="loader"></span>}
            Vaciar
          </button>
          <button
            className={`border-2 border-gray-200 rounded-md px-4 py-2 ${props.theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'} `}
            onClick={props.closeDirecto}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

