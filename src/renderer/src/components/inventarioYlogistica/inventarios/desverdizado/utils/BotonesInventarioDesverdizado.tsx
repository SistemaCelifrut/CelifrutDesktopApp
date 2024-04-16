/* eslint-disable prettier/prettier */
import { lotesType } from '@renderer/types/lotesType'
import "../css/style.css"

type propsType = {
  title: string
  table: lotesType[]
  showButton: string
  closeParametros: () => void
  closeFinalizarDesverdizado: () => void
  closeProcesarDesverdizado: () => void
}

export default function BotonesInventarioDesverdizado(props: propsType): JSX.Element {
  return (
    <div className='inventario-desverdizado-botones-container'>
      <h3>{props.title}</h3>
      <h3>{props.table && props.table.reduce((acu, lote) => (acu += lote.desverdizado?.kilos ? lote.desverdizado?.kilos : 0), 0)} Kg</h3>
      <button onClick={props.closeParametros} className='boton-desverdizado'>
        Parametros
      </button>
      {props.showButton === 'desverdizando' ? (
        <button onClick={props.closeFinalizarDesverdizado} className='boton-desverdizado' >
          Finalizar
        </button>
      ) : props.showButton === 'finalizado' ? (
        <button
        onClick={props.closeProcesarDesverdizado}
          className='boton-desverdizado'>
          Procesar
        </button>
      ) : null}
    </div>
  )
}
