import { INITIAL_STATE_HISTORIAL_DESCARTE, reducerHistorial } from '../function/reducer'
import TarjetaHistorialDescartes from '../utils/TarjetaHistorialDescartes'
import { useEffect, useReducer, useState } from 'react'

type propsType = {
  theme: string
  user: string
  filtro: string
}

export default function HistorialDescarte(props: propsType) {
  const [datosOriginales, setDatosOriginales] = useState([])

  const [table, dispatch] = useReducer(reducerHistorial, INITIAL_STATE_HISTORIAL_DESCARTE)
  //useEffect donde se obtiene la informacion de el Main
  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const request = { action: 'obtenerHistorialDescarte' }
        const descarte = await window.api.inventario(request)
        console.log(descarte)
        if (descarte.status === 200) {
          setDatosOriginales(descarte.data)
          dispatch({ type: 'initialData', data: descarte.data, filtro: '' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: any) {
        alert(`Fruta actual ${e.name}: ${e.message}`)
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
          table.map(lote => (
            <TarjetaHistorialDescartes theme={props.theme} user={props.user} lote={lote} />
          ))
        }
      </div>
    </div>
  )
}
