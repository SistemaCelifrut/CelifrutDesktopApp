import TableFrutaSinProcesar from '../tables/TableFrutaSinProcesar'
import { useEffect, useReducer, useState } from 'react'
import { INITIAL_STATE, reducer } from '../functions/reducer'
import BotonesAccionFrutaSinProcesar from '../utils/BotonesAccionFrutaSinProcesar'
import { prediosType } from '../types/types'
import { createPortal } from 'react-dom'
import Vaciado from '../modals/Vaciado'
import Directo from '../modals/Directo'
import Desverdizado from '../modals/Desverdizado'

type propsType = {
  theme: string
  user: string
  filtro:string
}

export default function FrutaSinProcesar(props: propsType) {
  const [propsModal, setPropsModal] = useState({ nombre: '', canastillas: 0, enf: '' })


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
    const asyncFunction = async () => {
      try {
        const request = { action: 'obtenerFrutaActual2' }
        const frutaActual = await window.api.inventario(request)
        console.log(frutaActual)
        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro:'' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: any) {
        alert(`Fruta actual ${e.name}: ${e.message}`)
      }
    }
    asyncFunction()
  }, [])

  useEffect(() => {
    const asyncFunction = async () => {
      try {
        const request = { action: 'obtenerFrutaActual2' }
        const frutaActual = await window.api.inventario(request)
        console.log(frutaActual)
        if (frutaActual.status === 200) {
          setDatosOriginales(frutaActual.data)
          dispatch({ type: 'initialData', data: frutaActual.data, filtro:'' })
        } else {
          alert('error obteniendo datos del servidor')
        }
      } catch (e: any) {
        alert(`Fruta actual ${e.name}: ${e.message}`)
      }
    }
    asyncFunction()
  }, [showVaciarModal, showDirectoModal, showDesverdizadoModal])

  const clickLote = (e) => {
    let id = e.target.value
    const lote: prediosType | undefined = table.find((item) => item._id === id)
    if (lote !== undefined) {
      setPropsModal(() => ({
        nombre: lote.nombre,
        canastillas: lote.inventario,
        enf: id
      }))
    }
    if (e.target.checked) {
      setTitleTable(id + ' ' + lote?.nombre)
      if (lote?.tipoFruta === 'Naranja') {
        setTipoFruta('Naranja')
      } else if (lote?.tipoFruta == 'Limon') {
        setTipoFruta('Limon')
      }
    }
  }
  //funciones que cierra los modales
  const closeVaciado = () => {
    setShowVaciarModal(!showVaciarModal)
  }
  const closeDirecto = () => {
    setShowDirectoModal(!showDirectoModal)
  }
  const closeDesverdizado = () => {
    setShowDesverdizadoModal(!showDesverdizadoModal)
  }
  //
useEffect(() =>{
  dispatch({type:'filter', data:datosOriginales, filtro:props.filtro})
},[props.filtro])

  return (
    <>
      <div className='flex flex-col'>
       
        <BotonesAccionFrutaSinProcesar
          title={titleTable}
          table={table}
          tipoFruta={tipoFruta}
          theme={props.theme}
          closeVaciado={closeVaciado}
          closeDirecto={closeDirecto}
          closeDesverdizado={closeDesverdizado}
          user={props.user}
        />
        <TableFrutaSinProcesar table={table} theme={props.theme} clickLote={clickLote} />

        {showVaciarModal &&
          createPortal(
            <Vaciado closeVaciado={closeVaciado} propsModal={propsModal} theme={props.theme} />,
            document.body
          )}
        {showDirectoModal &&
          createPortal(
            <Directo closeDirecto={closeDirecto} propsModal={propsModal} theme={props.theme} />,
            document.body
          )}
           {showDesverdizadoModal &&
          createPortal(
            <Desverdizado closeDesverdizado={closeDesverdizado} propsModal={propsModal} theme={props.theme} />,
            document.body
          )}
      </div>
    </>
  )
}
