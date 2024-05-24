/* eslint-disable prettier/prettier */
import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE_HISTORIAL_PROCESO, documentoInit, reducerHistorial } from './functions/reducer'
import { createPortal } from 'react-dom'
import TableHistorialProcesado from './tables/TableHistorialProcesado'
import BotonesAccionHistorialFrutaProcesada from './utils/BotonesAccionHistorialFrutaProcesada'
import { format } from 'date-fns'
import ModificarHistorialProceso from './modals/ModificarHistorialProceso'
import NavBarInventario from './utils/NavBarInventario'
import useAppContext from '@renderer/hooks/useAppContext'
import { historialLotesType } from '@renderer/types/lotesType'

const request = {
  data:{
    query:{ 
      operacionRealizada: "vaciarLote", "documento.predio": { $exists: true } 
    },
    select : { },
    sort:{fecha: -1},
    limit:50
  },
  collection:'historialLotes',
  action: 'obtenerHistorialLotes',
  query: 'proceso'
};


export default function HistorialProcesado(): JSX.Element {
  const { messageModal} = useAppContext();
  const [datosOriginales, setDatosOriginales] = useState([])
  const [titleTable, setTitleTable] = useState('Historial Lotes Procesados')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [propsModal, setPropsModal] = useState<historialLotesType>(documentoInit)
  const [showModificar, setShowModificar] = useState<boolean>(false)
  const [filtro, setFiltro] = useState<string>('')
  const [table, dispatch] = useReducer(reducerHistorial, INITIAL_STATE_HISTORIAL_PROCESO)

  const obtenerHistorialProceso = async (): Promise<void> => {
    try {
      const frutaActual = await window.api.server(request)
      console.log(frutaActual)
      if (frutaActual.status === 200) {
        setDatosOriginales(frutaActual.data)
        dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
      } else {
        messageModal("error",`Error ${frutaActual.status}: ${frutaActual.message}`)
      }
    } catch (e: unknown) {
      if(e instanceof Error){
        messageModal("error",`Error: ${e.message}`);
      }
    }
  }

  const closeModal = (): void => {
    setShowModal(!showModal)
  }

  const clickLote = (e): void => {
    const id = e.target.value
    const lote: historialLotesType | undefined = table.find((item) => item._id === id)
    if (lote !== undefined) {
      setPropsModal(lote)
      if (e.target.checked) {
        setTitleTable(( lote?.documento.enf || '') + ' ' + (lote?.documento.predio && lote?.documento.predio.PREDIO || ''))
        if (format(new Date(lote?.fecha), 'MM/dd/yyyy') == format(new Date(), 'MM/dd/yyyy')) {
          setShowModificar(true)
        } else {
          setShowModificar(false)
        }
      }
    }
  }

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }
  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "vaciado") {
      await obtenerHistorialProceso()
    }
  }

  useEffect(() => {
    obtenerHistorialProceso()
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [])

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: filtro })
  }, [filtro])

  return (
    <div className='componentContainer'>
      <NavBarInventario handleFilter={handleFilter} />
      <BotonesAccionHistorialFrutaProcesada
        title={titleTable}
        table={table}
        closeModal={closeModal}
        modificar={showModificar}
      />
      <TableHistorialProcesado table={table}  clickLote={clickLote} />

      {showModal &&
        createPortal(
          <ModificarHistorialProceso
            obtenerHistorialProceso={obtenerHistorialProceso}
            closeModal={closeModal}
            propsModal={propsModal}
          />,
          document.body
        )}
    </div>
  )
}
