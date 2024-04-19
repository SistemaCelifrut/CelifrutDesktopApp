/* eslint-disable prettier/prettier */
import { INITIAL_STATE, reducer } from '../function/reducer'
import { useEffect, useReducer, useState } from 'react'
import TarjetaInvetarioDescartes from '../utils/TarjetaInvetarioDescartes'
import BotonesInventarioDescartes from '../utils/BotonesInventarioDescartes'
import { createPortal } from 'react-dom'
import ModalConfirmarProcesoDescarte from '../modals/ModalConfirmarProcesoDescarte'

type propsType = {
  filtro: string
}

let enfObj = {}

const request = {
  data:{
    query:{ 
      $or: [
        { "inventarioActual.descarteLavado.descarteGeneral": { $gt: 0 } },
        { "inventarioActual.descarteLavado.pareja": { $gt: 0 } },
        { "inventarioActual.descarteLavado.balin": { $gt: 0 } },
        { "inventarioActual.descarteEncerado.descarteGeneral": { $gt: 0 } },
        { "inventarioActual.descarteEncerado.pareja": { $gt: 0 } },
        { "inventarioActual.descarteEncerado.balin": { $gt: 0 } },
        { "inventarioActual.descarteEncerado.extra": { $gt: 0 } },
      ],
    },
    select : {nombrePredio: 1,  tipoFruta: 1, inventarioActual:1, enf:1},
    populate:{
      path: 'predio',
      select: 'PREDIO'
    },
    sort:{fechaIngreso: -1}
  },
  collection:'lotes',
  action: 'getLotes',
  query: 'proceso',
};


export default function InventarioDescartes(props: propsType): JSX.Element {
  const [datosOriginales, setDatosOriginales] = useState([])
  const [render, setRender] = useState<boolean>(false)
  const [reprocesar, setReprocesar] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const [propsModal, setPropsModal] = useState({ action: '', data: {} })
  const [respawn, setRespawn] = useState<boolean>(false)

  const [table, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
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

    window.api.serverEmit('serverEmit', async () => {
      await asyncFunction()
    })
  }, [modal])

  const isProcesar = (data): void => {
    const keys = Object.keys(data)
    const enf = keys.map((item) => item.split('/')[0])
    const setEnfs = new Set(enf)
    const arrayEnf = [...setEnfs]
    if (arrayEnf.length === 1) {
      setReprocesar(true)
    } else {
      setReprocesar(false)
    }
  }

  const seleccionarItems = (e): void => {
    const id = e.target.value
    const [enf, descarte, tipoDescarte] = e.target.value.split('/')
      const lote = table.find((lote) => enf === lote._id)
    if (e.target.checked && lote) {
      enfObj[id] = lote.inventarioActual && lote.inventarioActual[descarte][tipoDescarte]
    } else if (!e.target.checked && lote) {
      delete enfObj[id]
    }
    isProcesar(enfObj)
    setRender(!render)
    console.log(enfObj)
  }

  const seleccionarVariosItems = (items): void => {
    for (const i of items) {
      const id = i.value
      const [enf, descarte, tipoDescarte] = i.value.split('/')
      const lote = table.find((lote) => enf === lote._id)
      if (i.checked && lote) {
        enfObj[id] = lote.inventarioActual && lote.inventarioActual[descarte][tipoDescarte]
      } else if (!i.checked && lote) {
        delete enfObj[id]
      }
      setRender(!render)
    }
    isProcesar(enfObj)
  }

  const procesar = (data: string): void => {
    if (modal === true) {
      setModal(!modal)
    } else {
      setModal(!modal)
      setPropsModal({ action: data, data: enfObj })
    }
  }

  const unCheck = (data:boolean): void => {
    setRespawn(data)
  }

  const reset = (): void =>{
    enfObj = {}
  }

  useEffect(() => {
    dispatch({ type: 'filter', data: datosOriginales, filtro: props.filtro })
  }, [props.filtro])

  return (
    <div className='componentContainer'>
      <BotonesInventarioDescartes
        table={table}
        enfObj={enfObj}
        reprocesar={reprocesar}
        procesar={procesar}
      />
      {table &&
        table.map((lote) => (
          <div key={lote._id}>
            <TarjetaInvetarioDescartes
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
            table={table}
            procesar={procesar}
            propsModal={propsModal}
            unCheck={unCheck}
            reset={reset}
          />,
          document.body
        )}
    </div>
  )
}
