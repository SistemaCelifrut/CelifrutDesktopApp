/* eslint-disable prettier/prettier */

import { useContext, useReducer, useState } from "react"
import { INITIAL_STATE, reducer } from "../functions/reduce"
import { themeContext, userContext } from "@renderer/App"
import ContenidoZumo from "./ContenidoZumo"
import PruebasPlataforma from "./PruebasPlataforma"
import { calidadInternalote } from "../types/calidadInterna"

type propsType = {
    lote: calidadInternalote
    setLotesData: (e) => void
}

export default function PruebasCalidadInterna(props:propsType): JSX.Element {
    const theme = useContext(themeContext)
    const user = useContext(userContext)
    const [mensajeGuardado, setMensajeGuardado] = useState('')
    const [formulario, dispatch] = useReducer(reducer, INITIAL_STATE)

    const handleChange = (data: React.ChangeEvent<HTMLInputElement>, action: string): void => {
      console.log(props.lote)
        if (action === 'semillas') {
            dispatch({ type: action, data: String(data.target.checked) })
        } else {
            dispatch({ type: action, data: data.target.value })
        }
        console.log(formulario)
    }
    const guardar = async (): Promise<void> => {
        const new_lote: calidadInternalote = {
          ...props.lote,
          calidad:{
            calidadInterna:{
              zumo: Number(formulario.zumo),
              peso: Number(formulario.pesoInicial),
              brix:(Number(formulario.brix1) + Number(formulario.brix2) + Number(formulario.brix3)) / 3,
              acidez:(Number(formulario.acidez1) + Number(formulario.acidez2) + Number(formulario.acidez3)) / 3,
              semillas: Boolean(formulario.semillas),
              ratio:
              (Number(formulario.brix1) / Number(formulario.acidez1) +
                  Number(formulario.brix2) / Number(formulario.acidez2) +
                  Number(formulario.brix3) / Number(formulario.acidez3)) / 3,
              fecha: new Date().toUTCString()
            }
          }
        }
        const requestLotes = {
            query: 'proceso',
            collection:'lotes',
            action: 'putLotes',
            record: 'ingresoCalidadInterna',
            data: {
              lote:new_lote
            }
        }
        await window.api.server(requestLotes)
        const requestLotes2 = {
          data:{
            query:{ 
              "calidad.calidadInterna": { $exists : false},
            },
            select : { enf:1 },
            populate:{
              path: 'predio',
              select: 'PREDIO ICA'
            },
            sort:{fechaIngreso: -1}
          },
          collection:'lotes',
          action: 'getLotes',
          query: 'proceso'
        };
        const datos = await window.api.server(requestLotes2)
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
