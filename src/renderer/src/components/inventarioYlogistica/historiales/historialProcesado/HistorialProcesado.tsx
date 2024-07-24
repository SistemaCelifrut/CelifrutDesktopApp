/* eslint-disable prettier/prettier */
import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE_HISTORIAL_PROCESO, documentoInit, reducerHistorial } from './functions/reducer'
import { createPortal } from 'react-dom'
import TableHistorialProcesado from './tables/TableHistorialProcesado'
import BotonesAccionHistorialFrutaProcesada from './utils/BotonesAccionHistorialFrutaProcesada'
import { format } from 'date-fns'
import ModificarHistorialProceso from './modals/ModificarHistorialProceso'
import useAppContext from '@renderer/hooks/useAppContext'
import { historialLotesType } from '@renderer/types/lotesType'
import { requestData } from './functions/request'
import { ordensarDataImprimir } from './functions/ordenarData'



export default function HistorialProcesado(): JSX.Element {
  const { messageModal } = useAppContext();
  const [datosOriginales, setDatosOriginales] = useState([])
  const [titleTable, setTitleTable] = useState('Historial Lotes Procesados')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [propsModal, setPropsModal] = useState<historialLotesType>(documentoInit)
  const [showModificar, setShowModificar] = useState<boolean>(false)
  const [table, dispatch] = useReducer(reducerHistorial, INITIAL_STATE_HISTORIAL_PROCESO)
  const [fechaInicio, SetFechaInicio] = useState("")
  const [fechaFin, SetFechaFin] = useState("")
  const [reload, setReload] = useState<boolean>(false);

  const obtenerHistorialProceso = async (): Promise<void> => {
    try {
      const request = requestData(fechaInicio, fechaFin)
      const frutaActual = await window.api.server2(request)
      if (frutaActual.status === 200) {
        setDatosOriginales(frutaActual.data)
        console.log(frutaActual)
        dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
      } else {
        messageModal("error", `Error ${frutaActual.status}: ${frutaActual.message}`)
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", `Error: ${e.message}`);
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
        setTitleTable((lote?.documento.enf || '') + ' ' + (lote?.documento.predio && lote?.documento.predio.PREDIO || ''))
        if (format(new Date(lote?.fecha), 'MM/dd/yyyy') == format(new Date(), 'MM/dd/yyyy')) {
          setShowModificar(true)
        } else {
          setShowModificar(false)
        }
      }
    }
  }

  useEffect(() => {
    obtenerHistorialProceso()
    window.api.reload(() => {
      setReload(!reload)
    });
    window.api.Descargar(() => {
      const dataOrdenada = ordensarDataImprimir(table)
      const data = JSON.stringify(dataOrdenada)
      window.api.crearDocumento(data)
    })
    return() => {
      window.api.removeReload()
    }
  }, [fechaInicio,fechaFin, reload])

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: '' })
  }, [])

  return (
    <div className='componentContainer'>
      <div className="navBar"></div>
      <BotonesAccionHistorialFrutaProcesada
        title={titleTable}
        table={table}
        closeModal={closeModal}
        modificar={showModificar}
        SetFechaInicio={SetFechaInicio}
        SetFechaFin={SetFechaFin}
      />
      <TableHistorialProcesado table={table} clickLote={clickLote} />

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
