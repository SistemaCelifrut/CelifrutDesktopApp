import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE_HISTORIAL_PROCESO, reducerHistorial } from '../functions/reducer'
import { createPortal } from 'react-dom'
import { historialProcesoType } from '../types/types'
import { format } from 'date-fns'
import TableHistorialDirectoNacional from '../tables/TableHistorialDirectoNacional'
import BotonesAccionHistorialFrutaProcesada from '../utils/BotonesAccionHistorialFrutaProcesada'
import ModificarHistorialDirecto from '../modals/ModificarHistorialDirecto'

type propsType = {
  theme: string
  user: string
  filtro: string
}

export default function HistorialDirectoNacional(props: propsType) {
  const [datosOriginales, setDatosOriginales] = useState([])
  const [titleTable, setTitleTable] = useState('Lotes Procesados')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [propsModal, setPropsModal] = useState({ nombre: '', canastillas: 0, enf: '', id: '' })
  const [showModificar, setShowModificar] = useState<boolean>(false)

  const [table, dispatch] = useReducer(reducerHistorial, INITIAL_STATE_HISTORIAL_PROCESO)

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const request = { action: 'estoEsUnaPutaMIerda' }
        const frutaActual = await window.api.inventario(request)

        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
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
    const asyncFunction = async () => {
      try {
        const request = { action: 'obtenerHistorialDirectoNacional2' }
        const frutaActual = await window.api.inventario(request)

        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: any) {
        alert(`Fruta actual ${e.name}: ${e.message}`)
      }
    }
    asyncFunction()
  }, [showModal])

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const clickLote = (e) => {
    let id = e.target.value
    console.log(id)
    const lote: historialProcesoType | undefined = table.find((item) => item._id === id)
    if (lote !== undefined) {
      setPropsModal(() => ({
        nombre: lote.nombre,
        canastillas: lote.canastillas,
        enf: lote.enf,
        id: lote._id
      }))
      if (e.target.checked) {
        setTitleTable(lote?.enf + ' ' + lote?.nombre)
        if (format(new Date(lote?.fecha), 'MM/dd/yyyy') == format(new Date(), 'MM/dd/yyyy')) {
          setShowModificar(true)
        } else {
          setShowModificar(false)
        }
      }
    }
  }

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  return (
    <div>
      <BotonesAccionHistorialFrutaProcesada
        theme={props.theme}
        title={titleTable}
        table={table}
        user={props.user}
        closeModal={closeModal}
        modificar={showModificar}
      />
      <TableHistorialDirectoNacional table={table} theme={props.theme} clickLote={clickLote} />

      {showModal &&
        createPortal(
          <ModificarHistorialDirecto
            closeModal={closeModal}
            propsModal={propsModal}
            theme={props.theme}
          />,
          document.body
        )}
    </div>
  )
}
