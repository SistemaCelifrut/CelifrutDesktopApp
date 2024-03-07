/* eslint-disable prettier/prettier */
import { MdOutlineSettingsInputComponent } from 'react-icons/md'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { FaSignOutAlt } from 'react-icons/fa'
import useAppContext from '@renderer/hooks/useAppContext'
import { lotesType } from '@renderer/types/lotesType'

type propsType = {
  title: string
  table: lotesType[]
  showButton: string
  closeParametros: () => void
  closeFinalizarDesverdizado: () => void
  closeProcesarDesverdizado: () => void
}

export default function BotonesInventarioDesverdizado(props: propsType): JSX.Element {
  const { theme } = useAppContext();
  return (
    <div
      className={`flex justify-between items-center m-4 
    ${theme === 'Dark' ? 'text-white' : 'text-black'}`}
    >
      <h2>{props.title}</h2>
      <h2>{props.table && props.table.reduce((acu, lote) => (acu += lote.desverdizado?.kilos ? lote.desverdizado?.kilos : 0), 0)} Kg</h2>
      <button
        onClick={props.closeParametros}
        className={
          
             'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-900'

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
          className={'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-900'}>
          <span className="absolute  -end-full transition-all group-hover:end-4">
            <IoCheckmarkDoneSharp />
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">Finalizar</span>
        </button>
      ) : props.showButton === 'finalizado' ? (
        <button
        onClick={props.closeProcesarDesverdizado}
          className={
              'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-900'

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
