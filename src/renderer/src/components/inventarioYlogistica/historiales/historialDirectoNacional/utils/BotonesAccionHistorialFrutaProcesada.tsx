/* eslint-disable prettier/prettier */
import useAppContext from '@renderer/hooks/useAppContext'
import { historialLotesType } from '@renderer/types/lotesType'
import { HiRefresh } from 'react-icons/hi'

type propsType = {
  title: string
  table: historialLotesType[]
  modificar: boolean
  closeModal: () => void
}

export default function BotonesAccionHistorialFrutaProcesada(props: propsType):JSX.Element {
  const {theme} = useAppContext();
  return (
    <div
      className={`flex justify-between items-center m-4 
    ${theme === 'Dark' ? 'text-white' : 'text-black'}`}
    >
      <h2>{props.title}</h2>
      <h2>{props.table && props.table.reduce((acu, lote) => (acu += lote.documento.directoNacional ? lote.documento.directoNacional : 0), 0).toFixed(2)} Kg</h2>
      <button
        onClick={props.closeModal}
        className={
           props.modificar
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
