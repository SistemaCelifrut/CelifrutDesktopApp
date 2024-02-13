/* eslint-disable prettier/prettier */
import { useContext, useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE_HISTORIAL_PROCESO, documentoInit, reducerHistorial } from './functions/reducer'
import { createPortal } from 'react-dom'
import { historialProcesoType } from './types/types'
import { format } from 'date-fns'
import TableHistorialDirectoNacional from './tables/TableHistorialDirectoNacional'
import BotonesAccionHistorialFrutaProcesada from './utils/BotonesAccionHistorialFrutaProcesada'
import ModificarHistorialDirecto from './modals/ModificarHistorialDirecto'
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import SuccessModal from '@renderer/errors/modal/SuccessModal'
import { themeContext, userContext } from '@renderer/App'
import NavBarInventario from './utils/NavBarInventario'

const request = {
  data:{
    query:{ 
      operacionRealizada: "directoNacional", "documento.predio": { $exists: true } 
    },
    select : { },
    sort:{fecha: -1},
    limit:50
  },
  collection:'historialLotes',
  action: 'obtenerHistorialLotes',
  query: 'proceso'
};

export default function HistorialDirectoNacional(): JSX.Element {
  const theme = useContext(themeContext);
  const user = useContext(userContext);
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
    const asyncFunction = async ():Promise<void> => {
      try {
        const frutaActual = await window.api.server(request)
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
  }, [showModal])

  const closeModal = (): void => {
    setShowModal(!showModal)
  }

  const clickLote = (e): void => {
    const id = e.target.value
    console.log(id)
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

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: filtro })
  }, [filtro])

  const closeModalinfo = (): void => {
    setShowError(false)
  }

  const handleFilter = (data: string): void => {
    setFiltro(data)
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
      <TableHistorialDirectoNacional table={table} theme={theme} clickLote={clickLote} />

      {showModal &&
        createPortal(
          <ModificarHistorialDirecto
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
