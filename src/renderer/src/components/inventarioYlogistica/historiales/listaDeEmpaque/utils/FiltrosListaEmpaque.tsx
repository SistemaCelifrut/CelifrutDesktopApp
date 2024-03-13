/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import ObtenerPrediosContenedor from '../functions/ObtenerPrediosContenedor'
import { contenedoresType } from '@renderer/types/contenedoresType'
import "@renderer/css/filtros.css"

type propsType = {
  contenedor: contenedoresType | undefined
  setFiltro: (data: string) => void
  setFiltro2: (data: string) => void
}

export default function FiltrosListaEmpaque(props: propsType): JSX.Element {
  const [value1, setValue1] = useState<string>('')
  const [predios, setPredios] = useState<string[]>([])


  const handleFiltro1 = (e): void => {
    props.setFiltro(e.target.value)
    setValue1(e.target.value)
  }

  const handleFiltro2 = (e): void => {
    props.setFiltro2(e.target.value)
  }

  useEffect(() => {
    if (props.contenedor) {
      const response: string[] = ObtenerPrediosContenedor(props.contenedor)
      setPredios(response)
    }
  }, [value1])

  return (
    <div className='filtroContainer'>
      <h3>
        Opciones de busqueda
      </h3>
      <hr />
      <div className='div-filter-actions'>
        <select onChange={handleFiltro1}>
          <option value={''}>None</option>
          {props.contenedor && (
            <>
              <option value={'predio'}>Predios</option>
              <option value={'pallet'}>
                {props.contenedor && props.contenedor.infoContenedor && 
                  props.contenedor.infoContenedor.tipoEmpaque === 'Caja'
                  ? 'Pallets'
                  : 'Estibas'}
              </option>
            </>
          )}
        </select>
        <select
          onChange={handleFiltro2}>
          <option value={''}>None</option>
          {props.contenedor && value1 === 'pallet' && props.contenedor && props.contenedor.pallets
            ? Object.keys(props.contenedor.pallets).map((pallet) => (
              <option key={pallet} value={pallet}>
                {Number(pallet) + 1}
              </option>
            ))
            : null}

          {props.contenedor && value1 === 'predio'
            ? predios.map((enf) => (
              <option key={enf} value={enf}>
                {enf}
              </option>
            ))
            : null}
        </select>
      </div>
    </div>
  )
}
