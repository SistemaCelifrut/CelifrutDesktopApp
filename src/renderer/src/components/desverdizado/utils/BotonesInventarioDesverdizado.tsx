/* eslint-disable prettier/prettier */
import { MdOutlineSettingsInputComponent } from 'react-icons/md'
import { prediosDesverdizadoType } from '../type/type'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { FaSignOutAlt } from 'react-icons/fa'

type propsType = {
  theme: string
  title: string
  table: prediosDesverdizadoType[]
  user: string
  showButton: string
  closeParametros: () => void
  closeFinalizarDesverdizado: () => void
  closeProcesarDesverdizado: () => void
}

export default function BotonesInventarioDesverdizado(props: propsType): JSX.Element {
  return (
    <div
      className={`flex justify-between items-center m-4 
    ${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}
    >
      <h2>{props.title}</h2>
      <h2>{props.table && props.table.reduce((acu, lote) => (acu += lote.kilos), 0)} Kg</h2>
      <button
        onClick={props.closeParametros}
        className={
          props.user === 'recepcion' ||
          (props.user === 'admin' && props.showButton === 'desverdizando') ||
          props.showButton === 'finalizado'
            ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-900'
            : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
        }
      >
        <span className="absolute  -end-full transition-all group-hover:end-4">
          <MdOutlineSettingsInputComponent />
        </span>

        <span className="text-sm font-medium transition-all group-hover:me-4">Parametros</span>
      </button>
      {props.showButton === 'desverdizando' ? (
        <button
          onClick={props.closeFinalizarDesverdizado}
          className={
            props.user === 'recepcion' || props.user === 'admin'
              ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-900'
              : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
          }
        >
          <span className="absolute  -end-full transition-all group-hover:end-4">
            <IoCheckmarkDoneSharp />
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">Finalizar</span>
        </button>
      ) : props.showButton === 'finalizado' ? (
        <button
        onClick={props.closeProcesarDesverdizado}
          className={
            props.user === 'recepcion' || props.user === 'admin'
              ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-900'
              : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
          }
        >
          <span className="absolute  -end-full transition-all group-hover:end-4">
            <FaSignOutAlt />
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">Procesar</span>
        </button>
      ) : null}
    </div>
  )
}
