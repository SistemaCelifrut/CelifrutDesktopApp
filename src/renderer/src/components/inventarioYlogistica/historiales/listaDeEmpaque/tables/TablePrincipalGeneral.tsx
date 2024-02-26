/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import PrincipalGeneral from '../functions/PrincipalGeneral'
import { themeType } from '@renderer/env'
import { contenedoresType } from '@renderer/types/contenedoresType'

type propsType = {
  contenedor: contenedoresType | undefined
  theme: themeType
}
type calidadType = {
  1.5: number
  1: number
  2: number
}
type calibreType = {
  [key: string]: number
}

type PrincipalGeneralType = [number, calidadType, calibreType, calibreType]

export default function TablePrincipalGeneral(props: propsType): JSX.Element {
  const [total, setTotal] = useState<number>(0)
  const [calidad, setCalidad] = useState<calidadType>({ 1: 0, 1.5: 0, 2: 0 })
  const [calibre, setCalibre] = useState<calibreType>({})
  const [tipoCaja, setTipoCaja] = useState<calibreType>({})

  useEffect(() => {
    const result = PrincipalGeneral(props.contenedor)
    if (Array.isArray(result)) {
      const [total, calidad, calibre, tipoCaja]: PrincipalGeneralType = result
      setTotal(total)
      setCalidad(calidad)
      setCalibre(calibre)
      setTipoCaja(tipoCaja)
    } else {
      // Manejar el caso cuando el resultado es 0
    }
  }, [props.contenedor])

  return (
    <div
      className={`${props.theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-100'}
                  p-2 ml-2 mt-2 bg-gray-100 border border-gray-300 rounded shadow-md`}
    >
      <h1 className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'}`}>Resumen</h1>
      <hr />
      <h3 className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'}`}>Total</h3>

      <div
        className={`${
          props.theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-black'
        }
                    p-4 rounded-md mb-2`}
      >
        <span className="font-bold">
          {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
            ? 'Cajas: '
            : 'Sacos: '}
        </span>
        {total}
      </div>
      <hr />
      <h3 className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'}`}>Calidad</h3>
      <div
        className={`${
          props.theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-black'
        }
        p-4 rounded-md mb-2 flex`}
      >
        <div className="flex flex-col items-center">
          {' '}
          <div className='flex flex-row gap-10' >
            <div>
              <span className='font-bold'>Calidad 1:</span> {calidad[1]}{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
            </div>
            <div>
              <span className='font-bold'>Calidad 1.5:</span> {calidad['1.5']}{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
            </div>
            <div>
              <span className='font-bold'>Calidad 2:</span> {calidad['2']}{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h3 className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'}`}>Calibre</h3>
      {calibre !== null &&
        Object.keys(calibre).map((item) => (
          <div
            key={item + 'div'}
            className={`${
              props.theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-black'
            }
                        p-4 rounded-md mb-2`}
          >
            <div className={`${props.theme === 'Dark' ? 'text-white' : 'text-black'} font-bold`}>Calibre {item}:</div>
            <div>
              {calibre[item]}{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
            </div>
          </div>
        ))}
      <hr />
      <h3 className={`${props.theme === 'Dark' ? 'text-white' : 'text-blue-500'}`}>
        Tipo{' '}
        {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
          ? 'Cajas: '
          : 'Sacos: '}
      </h3>
      {tipoCaja !== null &&
        Object.keys(tipoCaja).map((item) => (
          <div
          key={item}
          className={`${
            props.theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-black'
          }
          p-4 rounded-md mb-2 flex gap-4`}
          >
            <div className='font-bold'>
              Tipo de{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas: '
                : 'Sacos: '}{' '}
              {item}
            </div>
            <div>
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
              {tipoCaja[item]}
            </div>
          </div>
        ))}
    </div>
  )
}
