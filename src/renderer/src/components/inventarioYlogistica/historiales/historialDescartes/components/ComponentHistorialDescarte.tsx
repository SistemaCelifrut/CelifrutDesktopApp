/* eslint-disable prettier/prettier */
import { themeContext, userContext } from '@renderer/App'
import { INITIAL_STATE_HISTORIAL_DESCARTE, reducerHistorial } from '../function/reducer'
import TarjetaHistorialDescartes from '../utils/TarjetaHistorialDescartes'
import { useContext, useEffect, useReducer, useState } from 'react'

type propsType = {
  filtro: string
}

export default function ComponentHistorialDescarte(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const user = useContext(userContext)
  const [datosOriginales, setDatosOriginales] = useState([])

  const [table, dispatch] = useReducer(reducerHistorial, INITIAL_STATE_HISTORIAL_DESCARTE)
  //useEffect donde se obtiene la informacion de el Main
  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        const request = {
          data:{
            query:{},
            select :{},
            sort:{fecha: -1},
            limit:50
          },
          collection:'historialDescartes',
          action: 'getHistorialDescartes',
          query: 'proceso'
        };
        
        const descarte = await window.api.server(request)
        console.log(descarte)
        if (descarte.status === 200) {
          setDatosOriginales(descarte.data)
          dispatch({ type: 'initialData', data: descarte.data, filtro: '' })
        } else {
          console.log("error")
        }
      } catch (e: unknown) {
        console.log(e)
      }
    }
    asyncFunction()
  }, [])

  useEffect(() => {
    console.log(props.filtro)
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])


  return (
    <div className='historial-descartes-lista-container'>
        {table && 
          table.map((lote, index) => (
            <TarjetaHistorialDescartes theme={theme} user={user.cargo} lote={lote} key={index}/>
          ))
        }
    </div>
  )
}
