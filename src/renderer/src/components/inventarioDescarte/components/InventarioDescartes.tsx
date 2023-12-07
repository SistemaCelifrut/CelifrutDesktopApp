import { INITIAL_STATE, reducer } from '../function/reducer'
import { useEffect, useReducer, useState } from 'react'
import TarjetaInvetarioDescartes from '../utils/TarjetaInvetarioDescartes'
import TableDescartes from '../tables/TableDescartes'
import { descarteType } from '../types/descartes'
import BotonesInventarioDescartes from '../utils/BotonesInventarioDescartes'
import { createPortal } from 'react-dom'
import ModalConfirmarProcesoDescarte from '../modals/ModalConfirmarProcesoDescarte'

type propsType = {
  theme: string
  user: string
  filtro: string
}

let enfObj = {}

export default function InventarioDescartes(props: propsType) {
  const [datosOriginales, setDatosOriginales] = useState([])
  const [render, setRender] = useState<boolean>(false)
  const [reprocesar, setReprocesar] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const [propsModal, setPropsModal] = useState({ action: '', data: {} })
  const [respawn, setRespawn] = useState<boolean>(false)

  const [table, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const request = { action: 'obtenerDescarte2' }
        const frutaActual = await window.api.inventario(request)
        console.log(frutaActual)

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

    window.api.descartes('descartes', (data: descarteType[]) => {
      console.log(data)
      dispatch({ type: 'initialData', data: data, filtro: '' })
    })
  }, [])

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const request = { action: 'obtenerDescarte2' }
        const frutaActual = await window.api.inventario(request)
        console.log(frutaActual)

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

    window.api.descartes('descartes', (data: descarteType[]) => {
      console.log(data)
      dispatch({ type: 'initialData', data: data, filtro: '' })
    })
  }, [modal])

  const isProcesar = (data) => {
    const keys = Object.keys(data)
    const enf = keys.map((item) => item.split('/')[0])
    const setEnfs = new Set(enf)
    const arrayEnf = [...setEnfs]
    console.log(enfObj)
    if (arrayEnf.length === 1) {
      setReprocesar(true)
    } else {
      setReprocesar(false)
    }
  }

  const seleccionarItems = (e) => {
    let id = e.target.value
    const [enf, descarte, tipoDescarte] = e.target.value.split('/')
    const lote = table.find((lote) => enf === lote.enf)
    if (e.target.checked && lote) {
      enfObj[id] = lote[descarte][tipoDescarte]
    } else if (!e.target.checked && lote) {
      delete enfObj[id]
    }
    isProcesar(enfObj)
    setRender(!render)
    console.log(enfObj)
  }

  const seleccionarVariosItems = (items) => {
    for (let i of items) {
      let id = i.value
      const [enf, descarte, tipoDescarte] = i.value.split('/')
      const lote = table.find((lote) => enf === lote.enf)
      if (i.checked && lote) {
        enfObj[id] = lote[descarte][tipoDescarte]
      } else if (!i.checked && lote) {
        delete enfObj[id]
      }
      setRender(!render)
    }
    isProcesar(enfObj)
  }

  const procesar = (data: string) => {
    if (modal === true) {
      setModal(!modal)
    } else {
      setModal(!modal)
      setPropsModal({ action: data, data: enfObj })
    }
  }

  const unCheck = (data:boolean) => {
    setRespawn(data)
  }

  const reset = () =>{
    enfObj = {}
  }

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  return (
    <div>
      <TableDescartes theme={props.theme} user={props.user} />
      <BotonesInventarioDescartes
        theme={props.theme}
        user={props.user}
        table={table}
        enfObj={enfObj}
        reprocesar={reprocesar}
        procesar={procesar}
      />
      {table &&
        table.map((lote) => (
          <div key={lote.enf}>
            <TarjetaInvetarioDescartes
              theme={props.theme}
              user={props.user}
              lote={lote}
              seleccionarItems={seleccionarItems}
              seleccionarVariosItems={seleccionarVariosItems}
              respawn={respawn}
            />
          </div>
        ))}
      {modal &&
        createPortal(
          <ModalConfirmarProcesoDescarte
            procesar={procesar}
            propsModal={propsModal}
            theme={props.theme}
            unCheck={unCheck}
            reset={reset}
          />,
          document.body
        )}
    </div>
  )
}
