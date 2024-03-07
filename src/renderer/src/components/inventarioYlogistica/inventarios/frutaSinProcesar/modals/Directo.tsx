/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'
import { useState } from 'react'

type vaciadoType = {
  closeDirecto: () => void
  propsModal: lotesType
  handleInfo: () => void
}

export default function Directo(props: vaciadoType): JSX.Element {
  const {theme, messageModal} = useAppContext();
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
      const propsCanastillasInt = props.propsModal.inventarioActual ? props.propsModal.inventarioActual.inventario : 0

      if (propsCanastillasInt !== undefined && canastillasInt > propsCanastillasInt) {
        messageModal("error","Error en el numero de canastillas!");
      } else {
        const nuevo_lote = JSON.parse(JSON.stringify(props.propsModal));
        nuevo_lote["inventarioActual.inventario"] = nuevo_lote.inventarioActual.inventario - canastillasInt;
        nuevo_lote.directoNacional = Number(nuevo_lote.directoNacional) + (Number(nuevo_lote.promedio) * Number(canastillasInt));
        nuevo_lote.infoSalidaDirectoNacional = {
          placa: placa,
          nombreConductor: nombreConductor,
          telefono: telefono,
          cedula: cedula,
          remision: remision
        }
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
          action: 'putLotes',
          query: 'proceso',
          record: "directoNacional"
        }

        const response = await window.api.server(request)
        if (response.status === 200) {
          messageModal("success","Fruta enviada a directo nacional!");
        } else {
          messageModal("error",`Error ${response.status}: ${response.message}`)
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", e.message)
    }
    } finally {
      setLoading(false)
      props.closeDirecto();
      props.handleInfo();
    }
  }
  return (
    <div className={` fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
      <div className={`${theme === 'Dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl w-96 h-90 overflow-hidden pb-5`}>
        <div className={`bg-red-600  flex justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}>
          <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-lg font-semibold`}>{props.propsModal.predio && props.propsModal.predio.PREDIO}</h2>
        </div>
        <div className="flex justify-center pb-5">
          <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>Numero de canastillas en inventario: {props.propsModal.inventarioActual && props.propsModal.inventarioActual.inventario}</p>
        </div>
        <div className="flex flex-col mx-5 justify-center pb-10">
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Canastillas
            <input
              type="number"
              min="0"
              step="1"
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setCanastillas(Number(e.target.value))}
            />
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
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
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Nombre conductor
            <input
              type="text"
              value={nombreConductor}
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setNombreConductor(e.target.value)}
            />
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Telefono
            <input
              type="text"
              value={telefono}
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setTelefono(e.target.value)}
            />
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
            Cedula
            <input
              type="text"
              value={cedula}
              className="border-2 border-gray-200 rounded-md p-2 text-black"
              onChange={(e): void => setCedula(e.target.value)}
            />
          </label>
          <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col`}>
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
            className={`border-2 border-gray-200 rounded-md px-4 py-2 ${theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'} `}
            onClick={props.closeDirecto}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

