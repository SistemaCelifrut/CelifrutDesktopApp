/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { historialLotesType } from '@renderer/types/lotesType'

type propsType = {
  title: string
  table: historialLotesType[]
  modificar: boolean
  closeModal: () => void
}

export default function BotonesAccionHistorialFrutaProcesada(props: propsType):JSX.Element {
  const {user} = useAppContext();
  return (
    <div className='inventario-fruta-sin-procesar-botones-container'>
      <h2>{props.title}</h2>
      <h2>{props.table && props.table.reduce((acu, lote) => (acu += lote.documento.kilosVaciados ? lote.documento.kilosVaciados : 0), 0).toLocaleString('es-ES')} Kg</h2>
      {user.cargo === "admin" && 
      <button onClick={props.closeModal} className='vaciar'>
        Modificar
      </button>
     }
    </div>
  )
}
