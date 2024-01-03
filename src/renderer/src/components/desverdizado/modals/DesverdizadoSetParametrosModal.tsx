/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { GiSave } from 'react-icons/gi'

type vaciadoType = {
  closeParametros: () => void
  propsModal: { nombre: string; enf: string }
  theme: string
}

export default function DesverdizadoSetParametrosModal(props: vaciadoType): JSX.Element {
  const [temperatura, setTemperatura] = useState<number>(0)
  const [etileno, setEtileno] = useState<number>(0)
  const [dioxido, setDioxido] = useState<number>(0)
  const [humedad, setHumedad] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const guardar = async (): Promise<void> => {
    try {
      setLoading(true)
      const request = {
        temperatura: temperatura,
        etileno: etileno,
        carbono: dioxido,
        humedad: humedad,
        enf: props.propsModal.enf,
        action: 'setParametrosDesverdizado'
      }

      const response = await window.api.proceso(request)
      console.log(response)
      if (response.status === 200) {
        alert('Parametros guardados con exito')
        props.closeParametros()
      } else if (response.status === 400) {
        alert(response.data)
      } else {
        alert(response)
      }
    } catch (e: unknown) {
      alert(`${e}`)
    } finally {
      setLoading(false)
      props.closeParametros()
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
          className={`flex bg-yellow-500 justify-between items-center border-b-2 border-gray-200 p-3 mb-4 rounded-sm`}
        >
          <h2
            className={`${
              props.theme === 'Dark' ? 'text-white' : 'text-black'
            } text-lg font-semibold`}
          >
            {props.propsModal.nombre}
          </h2>
        </div>
        <div className="flex justify-center pb-2">
          <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>
            Temperatura C°
          </p>
        </div>
        <div className="flex justify-center pb-5">
          <input
            type="number"
            min="0"
            step="1"
            className="border-2 border-gray-200 rounded-md p-2"
            onChange={(e): void => setTemperatura(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-center pb-2">
          <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>
            Etileno (ppm)
          </p>
        </div>
        <div className="flex justify-center pb-5">
          <input
            type="number"
            min="0"
            step="1"
            className="border-2 border-gray-200 rounded-md p-2"
            onChange={(e): void => setEtileno(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-center pb-2">
          <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>
            Dioxido de carbono (ppm)
          </p>
        </div>
        <div className="flex justify-center pb-5">
          <input
            type="number"
            min="0"
            step="1"
            className="border-2 border-gray-200 rounded-md p-2"
            onChange={(e): void => setDioxido(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-center pb-2">
          <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} text-md`}>
            Humedad %
          </p>
        </div>
        <div className="flex justify-center pb-10">
          <input
            type="number"
            min="0"
            step="1"
            className="border-2 border-gray-200 rounded-md p-2"
            onChange={(e): void => setHumedad(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-center gap-4">
          <button
          onClick={guardar}
            className={`flex items-center justify-center ${
              loading ? 'bg-blue-500' : 'bg-blue-600'
            } text-white rounded-md px-4 py-2 gap-2`}
          >
            {loading && <span className="loader"></span>}
            Guardar
            <GiSave />
          </button>
          <button
            className={`border-2 border-gray-200 rounded-md px-4 py-2 ${
              props.theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'
            } `}
            onClick={props.closeParametros}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
