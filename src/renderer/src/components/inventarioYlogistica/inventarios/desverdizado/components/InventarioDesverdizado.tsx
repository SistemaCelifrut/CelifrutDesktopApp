/* eslint-disable prettier/prettier */
import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE, predios, reducer } from '../functions/reduce'
import TableInventarioDesverdizado from '../tables/TableInventarioDesverdizado'
import BotonesInventarioDesverdizado from '../utils/BotonesInventarioDesverdizado'
import { createPortal } from 'react-dom'
import DesverdizadoSetParametrosModal from '../modals/DesverdizadoSetParametrosModal'
import DesverdizadoFInalizarDesverdizado from '../modals/DesverdizadoFInalizarDesverdizado'
import DesverdizadoProcesarModal from '../modals/DesverdizadoProcesarModal'
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'

type propsType = {
  filtro: string
}

const request = {
  data:{
    select: { promedio:1, enf:1, desverdizado:1, kilosVaciados:1},
    sort:{"desverdizado.fechaIngreso": -1}
  },
  action: 'getInventarioDesverdizado'
};

export default function InventarioDesverdizado(props: propsType): JSX.Element {
  const { messageModal } = useAppContext();
  const [datosOriginales, setDatosOriginales] = useState([])
  const [propsModal, setPropsModal] = useState<lotesType>(predios)
  const [titleTable, setTitleTable] = useState('Lotes')
  const [showButton, setShowButton] = useState<string>('')
  const [showModalParametros, setShowModalParametros] = useState<boolean>(false)
  const [showModalFinalizar, setShowModalFinalizar] = useState<boolean>(false)
  const [showModalProcesar, setShowModalProcesar] = useState<boolean>(false)
  const [render, setRender] = useState<boolean>(false)

  const [table, dispatch] = useReducer(reducer, INITIAL_STATE)


  const obtenerFruta = async (): Promise<void> => {
    try {
      setRender(!render)
      const frutaActual = await window.api.server2(request)

      if (frutaActual.status === 200) {
        setDatosOriginales(frutaActual.data)
        dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
      } else {
        messageModal("error", `Error ${frutaActual.status}: ${frutaActual.message}`);
      }
    } catch (e: unknown) {
     messageModal("error", `Error ${e}`)
    }
  }
  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "procesoLote") {
      await obtenerFruta()
    }
  }
  useEffect(() => {
    obtenerFruta()
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }

  }, [])

  const clickLote = (e): void => {
    const enf = e.target.value
    const lote: lotesType | undefined = table.find((item) => item.enf === enf)
    if (lote !== undefined) {
      setPropsModal(lote)
    }
    if (e.target.checked) {
      setTitleTable(enf + ' ' +  (lote?.predio?.PREDIO || ""))
      if (lote?.desverdizado?.fechaFinalizar) {
        setShowButton('finalizado')
      } else {
        setShowButton('desverdizando')
      }
    }
  }

  const closeParametros = (): void => {
    setShowModalParametros(!showModalParametros)
  }

  const closeFinalizarDesverdizado = (): void => {
    setShowModalFinalizar(!showModalFinalizar)
  }

  const closeProcesarDesverdizado = (): void => {
    setShowModalProcesar(!showModalProcesar)
  }
  const handleInfo = ():void => {
    setPropsModal(predios)
    setTitleTable("Lotes")
  }

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  return (
    <div>
      <BotonesInventarioDesverdizado
        title={titleTable}
        table={table}
        showButton={showButton}
        closeParametros={closeParametros}
        closeFinalizarDesverdizado={closeFinalizarDesverdizado}
        closeProcesarDesverdizado={closeProcesarDesverdizado}
      />

      <TableInventarioDesverdizado
        propsModal={propsModal}
        table={table}
        clickLote={clickLote}
        render={render}
      />
      {showModalParametros &&
        createPortal(
          <DesverdizadoSetParametrosModal
            closeParametros={closeParametros}
            propsModal={propsModal}
            handleInfo={handleInfo}
          />,
          document.body
        )}
      {showModalFinalizar &&
        createPortal(
          <DesverdizadoFInalizarDesverdizado
            closeFinalizarDesverdizado={closeFinalizarDesverdizado}
            propsModal={propsModal}
            handleInfo={handleInfo}
          />,
          document.body
        )}
      {showModalProcesar &&
        createPortal(
          <DesverdizadoProcesarModal
            closeProcesarDesverdizado={closeProcesarDesverdizado}
            propsModal={propsModal}
            handleInfo={handleInfo}
          />,
          document.body
        )}
    </div>
  )
}
