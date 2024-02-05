/* eslint-disable prettier/prettier */

import { useContext, useReducer, useState } from "react"
import { INITIAL_STATE, reducer } from "../functions/reduce"
import { themeContext, userContext } from "@renderer/App"
import ContenidoZumo from "./ContenidoZumo"
import PruebasPlataforma from "./PruebasPlataforma"

type propsType = {
    lote: string
    setLotesData: (e) => void
}

export default function PruebasCalidadInterna(props:propsType): JSX.Element {
    const theme = useContext(themeContext)
    const user = useContext(userContext)
    const [mensajeGuardado, setMensajeGuardado] = useState('')
    const [formulario, dispatch] = useReducer(reducer, INITIAL_STATE)

    const handleChange = (data: React.ChangeEvent<HTMLInputElement>, action: string): void => {
        if (action === 'semillas') {
            dispatch({ type: action, data: String(data.target.checked) })
        } else {
            dispatch({ type: action, data: data.target.value })
        }
        console.log(formulario)
    }
    const guardar = async (): Promise<void> => {
        const requestLotes = {
            action: 'guardarCalidadInterna',
            query: 'proceso',
            data: {
                lote: props.lote,
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
        await window.api.calidad(requestLotes)
        const requestLotes2 = { action: 'obtenerLotesCalidadInterna', query: 'proceso' }
        const datos = await window.api.calidad(requestLotes2)
        console.log(datos);
        props.setLotesData(datos.data)

        setMensajeGuardado('Los datos se han guardado correctamente')

        setTimeout(() => {
            dispatch({ type: 'restablecer', data: '' })
            setMensajeGuardado('')
        }, 2000)
    }

    return (
        <div className="flex flex-col justify-center items-center">
        <ContenidoZumo
          theme={theme}
          user={user.cargo}
          handleChange={handleChange}
          formulario={formulario}
        />

        <PruebasPlataforma
          theme={theme}
          user={user.cargo}
          handleChange={handleChange}
          formulario={formulario}
        />
        {mensajeGuardado && (
          <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
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
    )
}
