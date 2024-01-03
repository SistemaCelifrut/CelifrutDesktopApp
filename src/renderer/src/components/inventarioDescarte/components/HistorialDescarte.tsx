/* eslint-disable prettier/prettier */
import { INITIAL_STATE_HISTORIAL_DESCARTE, reducerHistorial } from '../function/reducer'
import TarjetaHistorialDescartes from '../utils/TarjetaHistorialDescartes'
import { useEffect, useReducer, useState } from 'react'

type propsType = {
  theme: string
  user: string
  filtro: string
}

export default function HistorialDescarte(props: propsType): JSX.Element {
  const [datosOriginales, setDatosOriginales] = useState([])

  const [table, dispatch] = useReducer(reducerHistorial, INITIAL_STATE_HISTORIAL_DESCARTE)
  //useEffect donde se obtiene la informacion de el Main
  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerHistorialDescarte' }
        const descarte = await window.api.proceso(request)
        console.log(descarte)
        if (descarte.status === 200) {
          setDatosOriginales(descarte.data)
          dispatch({ type: 'initialData', data: descarte.data, filtro: '' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: unknown) {
        alert(`Fruta actual ${e}`)
      }
    }
    asyncFunction()
  }, [])

  useEffect(() => {
    console.log(props.filtro)
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])


  return (
    <div>
      <div className=' w-3/3 flex flex-row flex-wrap mt-2 p-0 gap-2 '>
        {table && 
          table.map((lote, index) => (
            <TarjetaHistorialDescartes theme={props.theme} user={props.user} lote={lote} key={index}/>
          ))
        }
      </div>
    </div>
  )
}
