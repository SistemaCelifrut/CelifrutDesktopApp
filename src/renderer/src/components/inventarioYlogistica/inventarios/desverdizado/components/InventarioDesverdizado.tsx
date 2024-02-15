/* eslint-disable prettier/prettier */
import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE, predios, reducer } from '../functions/reduce'
import TableInventarioDesverdizado from '../tables/TableInventarioDesverdizado'
import { prediosDesverdizadoType } from '../type/type'
import BotonesInventarioDesverdizado from '../utils/BotonesInventarioDesverdizado'
import { createPortal } from 'react-dom'
import DesverdizadoSetParametrosModal from '../modals/DesverdizadoSetParametrosModal'
import DesverdizadoFInalizarDesverdizado from '../modals/DesverdizadoFInalizarDesverdizado'
import DesverdizadoProcesarModal from '../modals/DesverdizadoProcesarModal'

type propsType = {
  theme: string
  user: string
  filtro: string
  setShowSuccess: (e) => void
  setShowError: (e) => void
  setMessage: (e) => void
}
const request = {
  data:{
    query:{ 
      "desverdizado": { $exists: true },
      "desverdizado.canastillas": {$gt: 0}
    },
    select : { promedio:1, enf:1, desverdizado:1, kilosVaciados:1},
    populate:{
      path: 'predio',
      select: 'PREDIO ICA'
    },
    sort:{"desverdizado.fechaIngreso": -1}
  },
  collection:'lotes',
  action: 'getLotes',
  query: 'proceso'
};

export default function InventarioDesverdizado(props: propsType): JSX.Element {
  const [datosOriginales, setDatosOriginales] = useState([])
  const [propsModal, setPropsModal] = useState<prediosDesverdizadoType>(predios)
  const [titleTable, setTitleTable] = useState('Lotes')
  const [showButton, setShowButton] = useState<string>('')
  const [showModalParametros, setShowModalParametros] = useState<boolean>(false)
  const [showModalFinalizar, setShowModalFinalizar] = useState<boolean>(false)
  const [showModalProcesar, setShowModalProcesar] = useState<boolean>(false)
  const [render, setRender] = useState<boolean>(false)

  const [table, dispatch] = useReducer(reducer, INITIAL_STATE)



  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        setRender(!render)
        const frutaActual = await window.api.server(request)

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
        props.setShowError(true)
        props.setMessage(`Error ${e}`)
        setInterval(() => {
          props.setShowError(false)
        }, 5000)
      }
    }
    asyncFunction()
  }, [showModalFinalizar, showModalParametros, showModalProcesar])

  const clickLote = (e): void => {
    const enf = e.target.value
    console.log(enf)
    const lote: prediosDesverdizadoType | undefined = table.find((item) => item.enf === enf)
    if (lote !== undefined) {
      setPropsModal(lote)
    }
    if (e.target.checked) {
      setTitleTable(enf + ' ' + lote?.predio.PREDIO)
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

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  return (
    <div>
      <BotonesInventarioDesverdizado
        title={titleTable}
        table={table}
        theme={props.theme}
        showButton={showButton}
        user={props.user}
        closeParametros={closeParametros}
        closeFinalizarDesverdizado={closeFinalizarDesverdizado}
        closeProcesarDesverdizado={closeProcesarDesverdizado}
      />

      <TableInventarioDesverdizado
        theme={props.theme}
        table={table}
        clickLote={clickLote}
        render={render}
      />
      {showModalParametros &&
        createPortal(
          <DesverdizadoSetParametrosModal
            closeParametros={closeParametros}
            propsModal={propsModal}
            theme={props.theme}
            setMessage={props.setMessage} 
            setShowSuccess={props.setShowSuccess} 
            setShowError={props.setShowError} 
          />,
          document.body
        )}
      {showModalFinalizar &&
        createPortal(
          <DesverdizadoFInalizarDesverdizado
            closeFinalizarDesverdizado={closeFinalizarDesverdizado}
            propsModal={propsModal}
            theme={props.theme}
            setMessage={props.setMessage} 
            setShowSuccess={props.setShowSuccess} 
            setShowError={props.setShowError} 
          />,
          document.body
        )}
      {showModalProcesar &&
        createPortal(
          <DesverdizadoProcesarModal
            closeProcesarDesverdizado={closeProcesarDesverdizado}
            propsModal={propsModal}
            theme={props.theme}
            setMessage={props.setMessage} 
            setShowSuccess={props.setShowSuccess} 
            setShowError={props.setShowError} 
          />,
          document.body
        )}
    </div>
  )
}
