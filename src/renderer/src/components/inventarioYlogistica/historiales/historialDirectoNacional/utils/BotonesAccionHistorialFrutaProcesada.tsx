/* eslint-disable prettier/prettier */
import { historialProcesoType } from '../types/types'
import { HiRefresh } from 'react-icons/hi'

type propsType = {
  theme: string
  title: string
  table: historialProcesoType[]
  user: string
  modificar: boolean
  closeModal: () => void
}

export default function BotonesAccionHistorialFrutaProcesada(props: propsType):JSX.Element {
  return (
    <div
      className={`flex justify-between items-center m-4 
    ${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
    >
      <h2>{props.title}</h2>
      <h2>{props.table && props.table.reduce((acu, lote) => (acu += lote.kilos), 0).toFixed(2)} Kg</h2>
      <button
        onClick={props.closeModal}
        className={
          props.user === 'recepcion' || (props.user === 'admin' && props.modificar)
            ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-900'
            : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
        }
      >
        <span className="absolute  -end-full transition-all group-hover:end-4">
          <HiRefresh />
        </span>

        <span className="text-sm font-medium transition-all group-hover:me-4">Modificar</span>
      </button>
    </div>
  )
}
