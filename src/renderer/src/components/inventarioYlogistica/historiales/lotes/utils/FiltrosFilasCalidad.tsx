/* eslint-disable prettier/prettier */

import { useState } from "react"

type propsType = {
  handleFiltro: (tipoFiltro, elemento) => void
  prediosData: string[]
  setEf1: (e) => void
  setFiltroPredio: (e) => void
  setCantidad: (e) => void
  seteOrdenar: (e) => void

}

export default function FiltroFilasCalidad(props: propsType): JSX.Element {
  const [criterio, setCriterio] = useState<string>('fechaIngreso')

  const handleTipoFruta = (e): void => {
    props.handleFiltro("tipoFruta", e.target.value)
  }
  const handleFechaInicio = (e): void => {
    props.handleFiltro('fechaInicio', e.target.value)
  }
  const handleFechaFin = (e): void => {
    props.handleFiltro('fechaFin', e.target.value)
  }
  const handleMinRendimiento = (e): void => {
    if (criterio === 'acidez') {
      props.handleFiltro('acidezMin', e.target.value)
    } else if (criterio === 'brix') {
      props.handleFiltro('brixMin', e.target.value)
    } else if (criterio === 'ratio') {
      props.handleFiltro('ratioMin', e.target.value)
    } else if (criterio === 'peso') {
      props.handleFiltro('pesoMin', e.target.value)
    } else if (criterio === 'zumo') {
      props.handleFiltro('zumoMin', e.target.value)
    }
  }
  const handleMaxRendimiento = (e): void => {
    if (criterio === 'acidez') {
      props.handleFiltro('acidezMax', e.target.value)
    } else if (criterio === 'brix') {
      props.handleFiltro('brixMax', e.target.value)
    } else if (criterio === 'ratio') {
      props.handleFiltro('ratioMax', e.target.value)
    } else if (criterio === 'peso') {
      props.handleFiltro('pesoMax', e.target.value)
    } else if (criterio === 'zumo') {
      props.handleFiltro('zumoMax', e.target.value)
    }
  }
  const handleOrdenar = (e): void => {
    const obj = {};
    obj[criterio] = Number(e.target.value);
    props.seteOrdenar(obj)
  }
  return (
    <div className="filtroContainer">
      <label>
        <p>Tipo fruta</p>
        <select onChange={handleTipoFruta}>
          <option value="">Tipo de fruta</option>
          <option value="Naranja">Naranja</option>
          <option value="Limon">Limon</option>
        </select>
      </label>
      <label>
        <p>Codigo lote</p>
        <input type="text" placeholder="EF1-" onChange={(e): void => props.setEf1(e.target.value)} />
      </label>
      <label >
        <p>Fecha Incio</p>
        <input type="date" onChange={handleFechaInicio} />
      </label>
      <label>
        <p>Fecha Fin</p>
        <input type="date" onChange={handleFechaFin} />
      </label>
      <label >
        <p>Cantidad-lotes</p>
        <div>
          <input onChange={(e): void => props.setCantidad(Number(e.target.value))} type="number" min={0} />
        </div>
      </label>
      <label>
        <p>Criterios</p>
        <select onChange={(e): void => setCriterio(e.target.value)}>
          <option value="">Criterio</option>
          <option value="acidez">Acidez</option>
          <option value="brix">Brix</option>
          <option value="ratio">Ratio</option>
          <option value="peso">Peso</option>
          <option value="zumo">Zumo</option>
        </select>
      </label>
      {criterio !== '' &&
        <label >
          <p>Umbral</p>
          <div>
            <input onChange={handleMinRendimiento} type="number"  placeholder="min" /> - <input onChange={handleMaxRendimiento} type="number" className="w-16 text-black rounded-lg p-1" placeholder="max" />
          </div>
        </label>}
      {criterio !== '' &&
        <label>
          <p>Ordenar por</p>
          <select onChange={handleOrdenar}>
          <option value="-1">Ordenado por</option>
          <option value="1">De menor a mayor</option>
          <option value="-1">De mayor a menor</option>
        </select>
        </label>
        }


    </div>
  )
}
