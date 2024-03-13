/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import PrincipalGeneral from '../functions/PrincipalGeneral'
import { contenedoresType } from '@renderer/types/contenedoresType'
import "../css/table.css"

type propsType = {
  contenedor: contenedoresType | undefined
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
    <div className='listaEmpaque-table-container'>
      <h3>Resumen</h3>
      <hr />
      <h3>Total</h3>
      <div className='listaEmpaque-table-containter-tipo'>
        <span className="font-bold">
          {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
            ? 'Cajas: '
            : 'Sacos: '}
        </span>
        {total}
      </div>
      <hr />
      <h3>Calidad</h3>
      <div className="listaEmpaque-table-containter-tipo">
        <div>
          {' '}
          <div className='listaEmpaque-table-show-items' >
            <div>
              <span >Calidad 1:</span> {calidad[1]}{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
            </div>
            <div>
              <span>Calidad 1.5:</span> {calidad['1.5']}{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
            </div>
            <div>
              <span>Calidad 2:</span> {calidad['2']}{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h3>Calibre</h3>
      {calibre !== null &&
        Object.keys(calibre).map((item) => (
          <div
            key={item + 'div'}
            className="listaEmpaque-table-containter-tipo">
            <div className="listaEmpaque-table-show-items"><span>Calibre {item}:</span> </div>
            <div>
              <span> {calibre[item]}{' '}</span>
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas '
                : 'Sacos '}
            </div>
          </div>
        ))}
      <hr />
      <h3>
        Tipo{' '}
        {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
          ? 'Cajas: '
          : 'Sacos: '}
      </h3>
      {tipoCaja !== null &&
        Object.keys(tipoCaja).map((item) => (
          <div
          key={item}
          className="listaEmpaque-table-containter-tipo">
            <div className='listaEmpaque-table-show-items'>
              <span>Tipo de{' '}
              {props.contenedor && props.contenedor.infoContenedor?.tipoEmpaque === 'Caja'
                ? 'Cajas: '
                : 'Sacos: '}{' '}
              {item}</span>
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
