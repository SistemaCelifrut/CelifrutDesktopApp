/* eslint-disable prettier/prettier */
import { useContext, useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE_HISTORIAL_PROCESO, documentoInit, reducerHistorial } from './functions/reducer'
import { createPortal } from 'react-dom'
import TableHistorialProcesado from './tables/TableHistorialProcesado'
import BotonesAccionHistorialFrutaProcesada from './utils/BotonesAccionHistorialFrutaProcesada'
import { historialProcesoType } from './types/types'
import { format } from 'date-fns'
import ModificarHistorialProceso from './modals/ModificarHistorialProceso'
import { themeContext, userContext } from '@renderer/App'
import NavBarInventario from './utils/NavBarInventario'
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import SuccessModal from '@renderer/errors/modal/SuccessModal'

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
  const user = useContext(userContext)
  const theme = useContext(themeContext);
  const [datosOriginales, setDatosOriginales] = useState([])
  const [titleTable, setTitleTable] = useState('Lotes Procesados')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [propsModal, setPropsModal] = useState<historialProcesoType>(documentoInit)
  const [showModificar, setShowModificar] = useState<boolean>(false)
  const [filtro, setFiltro] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [table, dispatch] = useReducer(reducerHistorial, INITIAL_STATE_HISTORIAL_PROCESO)

  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        const frutaActual = await window.api.server(request)
        console.log(frutaActual)
        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
        } else {
          setShowError(true)
          setMessage(`Error ${frutaActual.status}: ${frutaActual.message}`)
          setInterval(() => {
            setShowError(false)
          }, 5000)
        }
      } catch (e: unknown) {
        setShowError(true)
        setMessage(`Error ${e}`)
        setInterval(() => {
          setShowError(false)
        }, 5000)
      }
    }
    asyncFunction()
  }, [showModal])

  const closeModal = (): void => {
    setShowModal(!showModal)
  }

  const clickLote = (e): void => {
    const id = e.target.value
    const lote: historialProcesoType | undefined = table.find((item) => item._id === id)
    if (lote !== undefined) {
      setPropsModal(lote)
      if (e.target.checked) {
        setTitleTable(lote?.documento.enf + ' ' + lote?.documento.predio.PREDIO)
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

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: filtro })
  }, [filtro])

  const closeModalinfo = (): void => {
    setShowError(false)
  }

  return (
    <div className='w-full'>
      <NavBarInventario handleFilter={handleFilter} />

      <BotonesAccionHistorialFrutaProcesada
        theme={theme}
        title={titleTable}
        table={table}
        user={user.cargo}
        closeModal={closeModal}
        modificar={showModificar}
      />
      <TableHistorialProcesado table={table} theme={theme} clickLote={clickLote} />

      {showModal &&
        createPortal(
          <ModificarHistorialProceso
            closeModal={closeModal}
            propsModal={propsModal}
            theme={theme}
            setMessage={setMessage}
            setShowSuccess={setShowSuccess}
            setShowError={setShowError}
          />,
          document.body
        )}

      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModalinfo} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModalinfo} theme={theme} />}
      </div>
    </div>
  )
}
