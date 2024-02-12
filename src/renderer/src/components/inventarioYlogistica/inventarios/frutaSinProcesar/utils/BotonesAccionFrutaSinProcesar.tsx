/* eslint-disable prettier/prettier */
import { useContext } from 'react'
import { prediosType } from '../types/types'
import { HiSwitchHorizontal } from 'react-icons/hi'
import { themeContext } from '@renderer/App'

type propsType = {
  title: string
  table: prediosType[]
  tipoFruta: string
  closeVaciado: () => void
  closeDirecto: () => void
  closeDesverdizado: () => void
}

export default function BotonesAccionFrutaSinProcesar(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  return (
    <div
      className={`flex justify-between items-center m-4 
                      ${theme === 'Dark' ? 'text-white' : 'text-black'}`}
    >
      <h2>{props.title}</h2>
      <h2>{props.table && props.table.reduce((acu, lote) => (acu += lote.inventarioActual.inventario * lote.promedio), 0).toFixed(2)} Kg</h2>
      <button
        onClick={props.closeDesverdizado}
        className={
          props.tipoFruta === 'Naranja'
            ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-amber-500 px-8 py-3 text-white focus:outline-none active:bg-amber-700 active:border-amber-800'
            : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
        }
      >
        <span className="absolute -end-full transition-all group-hover:end-4">
          <svg
            className="h-5 w-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>

        <span className="text-sm font-medium transition-all group-hover:me-4">Desverdizar</span>
      </button>
      <button
        onClick={props.closeVaciado}
        className={
        props.tipoFruta === 'Limon' || props.tipoFruta === 'Naranja'
            ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-Celifrut-green px-8 py-3 text-white focus:outline-none active:bg-Celifrut-green-dark active:border-Celifrut-green-dark'
            : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
        }
      >
        <span className="absolute -end-full transition-all group-hover:end-4">
          <svg
            className="h-5 w-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>

        <span className="text-sm font-medium transition-all group-hover:me-4">Vaciar</span>
      </button>
      <button
        onClick={props.closeDirecto}
        className={
  
         props.tipoFruta === 'Limon'|| props.tipoFruta === 'Naranja'
            ? 'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-red-700 px-8 py-3 text-white focus:outline-none active:bg-red-900 active:border-red-700'
            : 'invisible group relative inline-flex w-40 h-10 items-center overflow-hidden'
        }
      >
        <span className="absolute  -end-full transition-all group-hover:end-4">
          <HiSwitchHorizontal />
        </span>

        <span className="text-sm font-medium transition-all group-hover:me-4">
          Directo Nacional
        </span>
      </button>
    </div>
  )
}
