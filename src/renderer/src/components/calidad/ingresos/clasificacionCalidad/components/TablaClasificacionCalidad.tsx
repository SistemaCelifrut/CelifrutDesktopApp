/* eslint-disable prettier/prettier */
import { lotesInventarioType, serverResponse } from '../types/clasificacionTypes'
import FormClasificacionCalidadLimon from './FormClasificacionCalidadLimon'
import FormClasificacionCalidadNaranja from './FormClasificacionCalidadNaranja'
import { useState, useReducer, createContext, useEffect, useContext } from 'react'
import {
  INITIAL_STATE_LIMON,
  INITIAL_STATE_NARANJA,
  reducerLimon,
  reducerNaranja
} from '../functions/reduce'
import { obtenerPorcentage } from '../functions/obtenerPorcentage'
import { themeContext } from '@renderer/App'

type propsType = {
  lote: lotesInventarioType
}

export const formLimonContext = createContext(INITIAL_STATE_LIMON)
export const formNaranjaContext = createContext(INITIAL_STATE_NARANJA)

export default function TablaClasificacionCalidad(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const [totalPorcentaje, setTotalPorcentaje] = useState(0)
  const [formularioLimon, dispatchLimon] = useReducer(reducerLimon, INITIAL_STATE_LIMON)
  const [formularioNaranja, dispatchNaranja] = useReducer(reducerNaranja, INITIAL_STATE_NARANJA)

  const handleGuardar = async (): Promise<void> => {
    try {
      if (totalPorcentaje !== 100) {
        alert('Error: el porcentaje debe ser igual a 100%')
        return
      }
      const objRes = { lote: '' }
      if (props.lote.tipoFruta === 'Limon') {
        formularioLimon.forEach((item) => {
          objRes[item.key] = (Number(item.lavado) + Number(item.proceso)) / 2
        })
      } else if ( props.lote.tipoFruta === 'Naranja'){
        formularioNaranja.forEach((item) => {
          objRes[item.key] = (Number(item.lavado) + Number(item.proceso)) / 2
        })
      }
      const new_lote = {
        ...props.lote,
        calidad:{
          calidadInterna:props.lote.calidad?.calidadInterna,
          clasificacionCalidad:objRes
        }
      }
      const request = {
        query: 'proceso',
        collection:'lotes',
        action: 'putLotes',
        record: 'ingresoClasificacionCalidad',
        data: {
          lote:new_lote
        }
    }
      const response: serverResponse = await window.api.server(request)

      const requestLotes = {
        data:{
          query:{ 
            "calidad.clasificacionCalidad": { $exists : false},
          },
          select : { enf:1, tipoFruta: 1 },
          populate:{
            path: 'predio',
            select: 'PREDIO'
          },
          sort:{fechaIngreso: -1}
        },
        collection:'lotes',
        action: 'getLotes',
        query: 'proceso'
      };

      await window.api.server(requestLotes)
      if (response.status === 200) {
        alert('Guardado exitoso')
        if(props.lote.tipoFruta === 'Limon'){
          dispatchLimon({ type: 'initialData', data: '', cardData: '' })
        } else if(props.lote.tipoFruta === 'Naranja'){
          dispatchNaranja({ type: 'initialData', data: '', cardData: '' })
        }
      } else {
        alert('Error al guardar los datos')
      }
    } catch (e: unknown) {
      alert(`${e}`)
    }
  }

  const handleChangeLimon = (data: string, type: string, dataCard: string): void => {
    dispatchLimon({ type: type, data: data, cardData: dataCard })
  }

  const handleChangeNaranja = (data: string, type: string, dataCard: string): void => {
    dispatchNaranja({ type: type, data: data, cardData: dataCard })
  }

  useEffect(() => {
    dispatchLimon({ type: 'initialData', data: '', cardData: '' })
    dispatchNaranja({ type: 'initialData', data: '', cardData: '' })
  }, [])

  useEffect(()=>{
    console.log("aqui aqui", props.lote.tipoFruta)
  },[props.lote])

  useEffect(() => {
    let porcentaje = 0
    if(props.lote.tipoFruta === 'Limon'){
     porcentaje = obtenerPorcentage(formularioLimon)
    } else if(props.lote.tipoFruta === 'Naranja'){
     porcentaje = obtenerPorcentage(formularioNaranja)
    }
    setTotalPorcentaje(porcentaje)
  }, [formularioLimon, formularioNaranja])

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`w-52 h-20  p-4 rounded-xl fixed right-10 top-28 ${theme === 'Dark' ? 'bg-slate-400' : 'bg-white'} shadow-2xl`}>
        <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold flex flex-col justify-center items-center`}>
          <h2>Total Porcentaje: </h2>
          <h2>{totalPorcentaje.toFixed(2)}%</h2>
        </div>
      </div>
      {props.lote.tipoFruta === 'Limon' ? (
        <formLimonContext.Provider value={formularioLimon}>
          <FormClasificacionCalidadLimon handleChange={handleChangeLimon} tipoFuta={props.lote.tipoFruta} />
        </formLimonContext.Provider>
      ) : (
        <formNaranjaContext.Provider value={formularioNaranja}>
          <FormClasificacionCalidadNaranja handleChange={handleChangeNaranja} tipoFruta={props.lote.tipoFruta}/>
        </formNaranjaContext.Provider>
      )}
      <button
        onClick={handleGuardar}
        className="bg-orange-600 text-white border-none px-4 py-2 rounded-md mb-5 active:bg-orange-900 m-5">
        Guardar
      </button>
    </div>
  )
}
