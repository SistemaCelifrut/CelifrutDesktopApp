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
import ModalModificarFrutaSinProcesar from './ModalModificarFrutaSinProcesar'

type propsType = {
  filtro: string
}
const request = {
  action: 'getInventario'
};

export default function FrutaSinProcesar(props: propsType): JSX.Element {
  const { messageModal } = useAppContext();
  const [propsModal, setPropsModal] = useState<lotesType>(predios)
  const [titleTable, setTitleTable] = useState('Lotes')
  const [datosOriginales, setDatosOriginales] = useState([])
  //states de los modales
  const [tipoFruta, setTipoFruta] = useState<string>('')
  //states de los modales
  const [showVaciarModal, setShowVaciarModal] = useState<boolean>(false)
  const [showDirectoModal, setShowDirectoModal] = useState<boolean>(false)
  const [showDesverdizadoModal, setShowDesverdizadoModal] = useState(false)
  //para modificar un dato
  const [loteSeleccionado, setLoteSeleccionado] = useState<lotesType>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(false);
  const [table, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    obtenerFruta()
    window.api.reload(() => {
      setReload(!reload)
    });
    return() => {
      window.api.removeReload()
    }
  }, [reload])
  const obtenerFruta = async (): Promise<void> => {
    try {
      const frutaActual = await window.api.server2(request)
      if (frutaActual.status === 200 && Object.prototype.hasOwnProperty.call(frutaActual, "data")) {
        setDatosOriginales(frutaActual.data)
        dispatch({ type: 'initialData', data: frutaActual.data, filtro: '' })
      } else {
        messageModal("error", `${frutaActual.status}: ${frutaActual.message}`)
      }
    } catch (e) {
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
      setTitleTable(id + ' ' + (lote?.predio?.PREDIO || ""))
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
  const handleInfo = (): void => {
    setPropsModal(predios)
    setTitleTable("Lotes")
  }
  //para modificar el dato
  const handleModificar = (): void => {
    setShowModal(!showModal)
  }
  //
  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])
  return (
    <div>
      <BotonesAccionFrutaSinProcesar
        title={titleTable}
        table={table}
        tipoFruta={tipoFruta}
        closeVaciado={closeVaciado}
        closeDirecto={closeDirecto}
        closeDesverdizado={closeDesverdizado}
      />
      <TableFrutaSinProcesar
        handleModificar={handleModificar}
        setLoteSeleccionado={setLoteSeleccionado}
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
            obtenerFruta={obtenerFruta}
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
              {showModal && 
        <ModalModificarFrutaSinProcesar 
          showModal={showModal}  
          loteSeleccionado={loteSeleccionado}
          handleModificar={handleModificar}
        />}
    </div>
  )
}
