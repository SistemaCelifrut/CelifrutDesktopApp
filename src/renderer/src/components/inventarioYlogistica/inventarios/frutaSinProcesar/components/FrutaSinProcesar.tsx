/* eslint-disable prettier/prettier */
import TableFrutaSinProcesar from '../tables/TableFrutaSinProcesar'
import { useContext, useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE, reducer } from '../functions/reducer'
import BotonesAccionFrutaSinProcesar from '../utils/BotonesAccionFrutaSinProcesar'
import { prediosType } from '../types/types'
import { createPortal } from 'react-dom'
import Vaciado from '../modals/Vaciado'
import Directo from '../modals/Directo'
import Desverdizado from '../modals/Desverdizado'
import { themeContext } from '@renderer/App'

type propsType = {
  filtro: string
  setShowSuccess: (e) => void
  setShowError: (e) => void
  setMessage: (e) => void
}

export default function FrutaSinProcesar(props: propsType): JSX.Element {
  const theme = useContext(themeContext);
  const [propsModal, setPropsModal] = useState({ nombre: '', canastillas: 0, enf: '' })


  const [titleTable, setTitleTable] = useState('Lotes')
  const [datosOriginales, setDatosOriginales] = useState([])
  //states de los modales
  const [tipoFruta, setTipoFruta] = useState<string>('')
  //states de los modales
  const [showVaciarModal, setShowVaciarModal] = useState<boolean>(false)
  const [showDirectoModal, setShowDirectoModal] = useState<boolean>(false)
  const [showDesverdizadoModal, setShowDesverdizadoModal] = useState(false)

  const [table, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerFrutaActual' }
        const frutaActual = await window.api.proceso(request)
        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
        } else {
          props.setShowError(true)
          props.setMessage(`Error ${frutaActual.status}: ${frutaActual.message}`)
          setInterval(() => {
            props.setShowError(false)
          }, 5000)
        }
      } catch (e: unknown) {
        alert(`Fruta actual ${e}`)
      }
    }
    asyncFunction()
  }, [])

  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerFrutaActual' }
        const frutaActual = await window.api.proceso(request)
        console.log(frutaActual)
        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: unknown) {
        alert(`Fruta actual ${e}`)
      }
    }
    asyncFunction()
  }, [showVaciarModal, showDirectoModal, showDesverdizadoModal])

  const clickLote = (e): void => {
    const id = e.target.value
    const lote: prediosType | undefined = table.find((item) => item._id === id)
    if (lote !== undefined) {
      setPropsModal(() => ({
        nombre: lote.predio.PREDIO,
        canastillas: lote.inventarioActual.inventario,
        enf: id
      }))
    }
    if (e.target.checked) {
      setTitleTable(id + ' ' + lote?.predio.PREDIO)
      if (lote?.tipoFruta === 'Naranja') {
        setTipoFruta('Naranja')
      } else if (lote?.tipoFruta == 'Limon') {
        setTipoFruta('Limon')
      }
    }
  }
  //funciones que cierra los modales
  const closeVaciado = (): void => {
    setShowVaciarModal(!showVaciarModal)
  }
  const closeDirecto = (): void => {
    setShowDirectoModal(!showDirectoModal)
  }
  const closeDesverdizado = (): void => {
    setShowDesverdizadoModal(!showDesverdizadoModal)
  }
  //
  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  return (
    <>
      <div className='flex flex-col'>

        <BotonesAccionFrutaSinProcesar
          title={titleTable}
          table={table}
          tipoFruta={tipoFruta}
          closeVaciado={closeVaciado}
          closeDirecto={closeDirecto}
          closeDesverdizado={closeDesverdizado}
        />
        <TableFrutaSinProcesar table={table} theme={theme} clickLote={clickLote} />

        {showVaciarModal &&
          createPortal(
            <Vaciado 
              closeVaciado={closeVaciado} 
              propsModal={propsModal} 
              theme={theme} 
              setMessage={props.setMessage} 
              setShowSuccess={props.setShowSuccess} 
              setShowError={props.setShowError} />,
            document.body
          )}

        {showDirectoModal &&
          createPortal(
            <Directo 
              closeDirecto={closeDirecto} 
              propsModal={propsModal} 
              theme={theme}
              setMessage={props.setMessage} 
              setShowSuccess={props.setShowSuccess} 
              setShowError={props.setShowError} />,
            document.body
          )}
        {showDesverdizadoModal &&
          createPortal(
            <Desverdizado 
              closeDesverdizado={closeDesverdizado} 
              propsModal={propsModal} 
              setMessage={props.setMessage} 
              setShowSuccess={props.setShowSuccess} 
              setShowError={props.setShowError} />,
            document.body
          )}
      </div>
    </>
  )
}
