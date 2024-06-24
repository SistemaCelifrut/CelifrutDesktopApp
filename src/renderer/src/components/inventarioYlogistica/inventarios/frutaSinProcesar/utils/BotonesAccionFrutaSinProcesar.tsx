/* eslint-disable prettier/prettier */
import { lotesType } from '@renderer/types/lotesType'
import "../css/inventario-fruta-sin-procesar.css"
type propsType = {
  title: string
  table: lotesType[]
  tipoFruta: string
  closeVaciado: () => void
  closeDirecto: () => void
  closeDesverdizado: () => void
}

export default function BotonesAccionFrutaSinProcesar(props: propsType): JSX.Element {
  return (
    <div className='inventario-fruta-sin-procesar-botones-container'>
      <h3>{props.title}</h3>
      <h3>
        {props.table && props.table.reduce((acu, lote) => 
          (acu += (lote?.inventario && lote.promedio) ? 
            lote.inventario * lote.promedio : 0), 0).toLocaleString('es-ES')} Kg</h3>
      <button onClick={props.closeDesverdizado} className={props.tipoFruta === "Naranja" ? 'desverdizar' : 'no-desverdizar'} >
        <span >Desverdizar</span>
      </button>
      {/* <button onClick={props.closeVaciado} className='vaciar'>
        <span >Vaciar</span>
      </button> */}
      <button onClick={props.closeDirecto} className='directo-nacional'>
        <span>Directo Nacional</span>
      </button>
    </div>
  )
}
