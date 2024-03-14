/* eslint-disable prettier/prettier */
import {
  sumatoriaDescarteEspecifico,
  sumatoriaDescarteSeleccionado,
  sumatoriaDescartes
} from '../function/sumatorias'
import { useEffect } from 'react'
import { ImExit } from 'react-icons/im'
import { RiRecycleFill } from 'react-icons/ri'
import { llavesVisualizar } from '../function/llaves'
import { lotesType } from '@renderer/types/lotesType'
import useAppContext from '@renderer/hooks/useAppContext'

type propsType = {
  table: lotesType[]
  enfObj: object
  reprocesar: boolean
  procesar: (action:string) => void
}

export default function BotonesInventarioDescartes(props: propsType): JSX.Element {
  const {theme} = useAppContext();
  useEffect(() => {
    console.log(props.enfObj)
  }, [props.enfObj])

  return (
    <div>
      <div
        className={` ${theme === 'Dark' ? 'bg-gray-600' : 'bg-gray-200'} m-2 p-4 rounded-md `}
      >
        <div>
          <div className="flex flex-row justify-between">
            <h2 className={`${theme === 'Dark' ? 'text-white' : 'texy-black'} font-bold`}>
              Kilos Totales: {sumatoriaDescartes(props.table).toFixed(2)} Kg
            </h2>
            <h2 className={`${theme === 'Dark' ? 'text-white' : 'texy-black'} font-bold`}>
              Kilos seleccionados: {sumatoriaDescarteSeleccionado(props.enfObj).toFixed(2)} Kg
            </h2>
            {props.reprocesar && (
              <button
              onClick={(): void => props.procesar("Reprocesar el lote")}
                className={      
                     'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-700'}>
                <span className="absolute -end-full transition-all group-hover:end-4 text-xl">
                  <RiRecycleFill />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Reprocesar
                </span>
              </button>
            )}
            {!props.reprocesar && (
              <button
              onClick={(): void => props.procesar("Reprocesar como Celifrut")}
                className={
                     'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-700'
                }>
                <span className="absolute -end-full transition-all group-hover:end-4 text-xl">
                  <RiRecycleFill />
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Reprocesar Celifrut
                </span>
              </button>
            )}
            <button
            onClick={(): void => props.procesar("Enviar descarte")}
              className={
                   'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-700'
                 }>
              <span className="absolute  -end-full transition-all group-hover:end-4">
                <ImExit />
              </span>

              <span className="text-sm font-medium transition-all group-hover:me-4">Enviar</span>
            </button>
          </div>
          <div className="flex gap-2 md:flex-col lg:flex-row justify-between">
            <div
              className={`p-2 border-2 mt-2 rounded-md  w-full ${
                theme === 'Dark' ? '' : 'border-gray-700'
              }`}
            >
              <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold`}>
                Descarte Lavado:
              </h3>
              <div className="p-2 flex flex-row gap-4">
                {props.table[0] && props.table[0].inventarioActual && props.table[0].inventarioActual.descarteLavado &&
                  Object.keys(props.table[0].inventarioActual.descarteLavado).map((item) => (
                    <h4
                      className={`${theme === 'Dark' ? 'text-white' : 'texy-black'}`}
                      key={item}
                    >
                      {llavesVisualizar[item]}: {sumatoriaDescarteEspecifico(props.table, 'descarteLavado', item).toFixed(2)} Kg
                    </h4>
                  ))}
              </div>
            </div>
            <div
              className={`p-2 border-2 mt-2 rounded-md  w-full ${
                theme === 'Dark' ? '' : 'border-gray-700'
              }`}
            >
              <h3 className={`${theme === 'Dark' ? 'text-white' : 'texy-black'} font-bold`}>
                Descarte Encerado:
              </h3>
              <div className="p-2 flex flex-row gap-4 ">
                {props.table[0] && props.table[0].inventarioActual && props.table[0].inventarioActual.descarteEncerado && 
                  Object.keys(props.table[0].inventarioActual.descarteEncerado).map((item) => (
                    <h4
                      className={`${theme === 'Dark' ? 'text-white' : 'texy-black'}`}
                      key={item}
                    >
                      {llavesVisualizar[item]}: {sumatoriaDescarteEspecifico(props.table, 'descarteEncerado', item).toFixed(2)}{' '}
                      Kg
                    </h4>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
