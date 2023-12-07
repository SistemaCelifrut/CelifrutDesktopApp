import { themeType } from '@renderer/env'
import { useEffect, useState, useReducer } from 'react'
import NavCalidadInternaForm from './utils/NavCalidadInternaForm'
import ContenidoZumo from './components/ContenidoZumo'
import { INITIAL_STATE, reducer } from './functions/reduce'
import PruebasPlataforma from './components/PruebasPlataforma'

type propsType = {
  theme: themeType
  user: string
}

export default function CalidadInterna(props: propsType) {
  const [lotesData, setLotesData] = useState([])
  const [lote, setLote] = useState<string>('')
  const [mensajeGuardado, setMensajeGuardado] = useState('')
  const [formulario, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const interval = async () => {
      try {
        const request = { action: 'obtenerLotesCalidadInterna' }
        const lotes = await window.api.calidad(request)
        console.log(lotes.data)
        setLotesData(lotes.data)
      } catch (e) {
        alert(e)
      }
    }
    interval()
  }, [])

  const handleChange = (data: any, action: string) => {
    if (action === 'semillas') {
      dispatch({ type: action, data: data.target.checked })
    } else {
      dispatch({ type: action, data: data.target.value })
    }
    console.log(formulario)
  }

  const guardar = async () => {
    const requestLotes = {
      action: 'guardarCalidadInterna',
      data: {
        lote: lote,
        zumo: Number(formulario.zumo),
        peso: Number(formulario.pesoInicial),
        brix: (Number(formulario.brix1) + Number(formulario.brix2) + Number(formulario.brix3)) / 3,
        acidez:
          (Number(formulario.acidez1) + Number(formulario.acidez2) + Number(formulario.acidez3)) /
          3,
        semillas: Boolean(formulario.semillas),
        ratio:
          (Number(formulario.brix1) / Number(formulario.acidez1) +
          Number(formulario.brix2) / Number(formulario.acidez2) +
          Number(formulario.brix3) / Number(formulario.acidez3)) / 3
      }
    }
    console.log(requestLotes)
    const response = await window.api.calidad(requestLotes)
    console.log(response)
    const requestLotes2 = { action: 'obtenerLotesCalidadInterna' }
    const datos = await window.api.calidad(requestLotes2)
    setLotesData(datos.data)

    setMensajeGuardado('Los datos se han guardado correctamente')

    setTimeout(() => {
      dispatch({ type: 'restablecer', data: '' })
      setMensajeGuardado('')
    }, 2000)
  }

  return (
    <div>
      <NavCalidadInternaForm lotesData={lotesData} setLote={setLote} />
      <div className="flex flex-col justify-center items-center">
        <ContenidoZumo
          theme={props.theme}
          user={props.user}
          handleChange={handleChange}
          formulario={formulario}
        />

        <PruebasPlataforma
          theme={props.theme}
          user={props.user}
          handleChange={handleChange}
          formulario={formulario}
        />
        {mensajeGuardado && (
          <p className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>
            {mensajeGuardado}
          </p>
        )}
        <button
          onClick={guardar}
          className="bg-orange-600 text-white border-none px-4 py-2 rounded-md mb-5 active:bg-orange-900 m-5"
        >
          Guardar
        </button>
      </div>
    </div>
  )
}
