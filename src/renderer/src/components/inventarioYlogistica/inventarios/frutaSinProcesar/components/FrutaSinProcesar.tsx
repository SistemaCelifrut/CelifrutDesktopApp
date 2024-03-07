/* eslint-disable prettier/prettier */
import TableFrutaSinProcesar from '../tables/TableFrutaSinProcesar'
import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE, predios, reducer } from '../functions/reducer'
import BotonesAccionFrutaSinProcesar from '../utils/BotonesAccionFrutaSinProcesar'
import { createPortal } from 'react-dom'
import Vaciado from '../modals/Vaciado'
import Directo from '../modals/Directo'
import Desverdizado from '../modals/Desverdizado'
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'

type propsType = {
  filtro: string
}
const request = {
  data: {
    query: {
      "inventarioActual.inventario": { $gt: 0 },
    },
    select: { nombrePredio: 1, fechaIngreso: 1, observaciones: 1, tipoFruta: 1, promedio: 1, "inventarioActual.inventario": 1, enf: 1, kilosVaciados: 1, directoNacional: 1 },
    populate: {
      path: 'predio',
      select: 'PREDIO ICA'
    },
    sort: { fechaIngreso: -1 }
  },
  collection: 'lotes',
  action: 'getLotes',
  query: 'proceso',
};

export default function FrutaSinProcesar(props: propsType): JSX.Element {
  const { messageModal} = useAppContext();
  const [propsModal, setPropsModal] = useState<lotesType>(predios)
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
    obtenerFruta()
    
    const handleServerEmit = async (data): Promise<void> => {
      if (data.fn === "vaciado" || data.fn === "ingresoLote" || data.fn === "procesoLote") {
        await obtenerFruta()
      }
    }
  
    window.api.serverEmit('serverEmit', handleServerEmit)
  
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [])
  

  const obtenerFruta = async (): Promise<void> => {
    try {
      const frutaActual = await window.api.server(request)
      if (frutaActual.status === 200) {
        setDatosOriginales(frutaActual.data)
        dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
      } else {
        messageModal("error",`Error ${frutaActual.status}: ${frutaActual.message}`)
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        messageModal("error", e.message)
    }
    }
  }
  const clickLote = (e): void => {
    const id = e.target.value
    const lote: lotesType | undefined = table.find((item) => item.enf === id)
    if (lote !== undefined) {
      setPropsModal(lote)
    }
    if (e.target.checked) {
      setTitleTable(id + ' ' +  (lote?.predio?.PREDIO || ""))
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
  const handleInfo = ():void => {
    setPropsModal(predios)
    setTitleTable("Lotes")
  }
  //
  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])
  return (
    <>
      <div className='flex flex-col p-2'>

        <BotonesAccionFrutaSinProcesar
          title={titleTable}
          table={table}
          tipoFruta={tipoFruta}
          closeVaciado={closeVaciado}
          closeDirecto={closeDirecto}
          closeDesverdizado={closeDesverdizado}
        />

        <TableFrutaSinProcesar 
          table={table} 
          clickLote={clickLote} 
          propsModal={propsModal}
        />

        {showVaciarModal &&
          createPortal(
            <Vaciado
              closeVaciado={closeVaciado}
              propsModal={propsModal} 
              handleInfo={handleInfo} />,
            document.body
          )}

        {showDirectoModal &&
          createPortal(
            <Directo
              handleInfo={handleInfo}
              closeDirecto={closeDirecto}
              propsModal={propsModal} />,
            document.body
          )}
        {showDesverdizadoModal &&
          createPortal(
            <Desverdizado
              handleInfo={handleInfo}
              closeDesverdizado={closeDesverdizado}
              propsModal={propsModal} />,
            document.body
          )}
      </div>
    </>
  )
}
