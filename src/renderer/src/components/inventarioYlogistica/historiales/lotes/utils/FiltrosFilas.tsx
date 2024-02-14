/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext  } from "react"

type propsType = {
  handleFiltro: (tipoFiltro, elemento) => void
  prediosData: string[]
  setEf1: (e) => void
  setFiltroPredio: (e) => void
  setCantidad: (e) => void
}

export default function FiltrosFilas(props: propsType): JSX.Element {
  const theme = useContext(themeContext)

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
    props.handleFiltro('minRendimiento', e.target.value)
  }
  const handleMaxRendimiento = (e): void => {
    props.handleFiltro('maxRendimiento', e.target.value)
  }

  return (
    <div>
      <div className={`flex flex-row flex-wrap gap-2 p-3 rounded-xl`}>
        <select className="rounded-lg p-2" onChange={handleTipoFruta}>
          <option value="">Tipo de fruta</option>
          <option value="Naranja">Naranja</option>
          <option value="Limon">Limon</option>
        </select>
        <select className="w-52 rounded-lg p-2" onChange={(e): void => props.setFiltroPredio(e.target.value)}>
          <option value="">Nombre predios</option>
          {props.prediosData.map((item, index) => (
            <option key={item + index} value={item}>{item}</option>
          ))}
        </select>
        <input type="text" placeholder="EF1-"  className="rounded-lg p-1" onChange={(e): void => props.setEf1(e.target.value)}/>
        <label className={`flex flex-col
                              ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Fecha Incio
          <input className="text-black rounded-lg p-1" type="date" onChange={handleFechaInicio} />
        </label>
        <label className={`flex flex-col
                              ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Fecha Fin
          <input className="text-black rounded-lg p-1" type="date" onChange={handleFechaFin} />
        </label>
        <label className={`flex flex-col
                              ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Rendimiento
          <div>
            <input onChange={handleMinRendimiento} type="number" className="w-16 rounded-lg p-1 text-black" placeholder="min"/> - <input onChange={handleMaxRendimiento} type="number" className="w-16 text-black rounded-lg p-1" placeholder="max"/>
          </div>
        </label>
        <label className={`flex flex-col
                              ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Cantidad-lotes
          <div>
            <input onChange={(e): void => props.setCantidad(Number(e.target.value))} type="number" className="w-28 rounded-lg p-1 text-black" min={0} />
          </div>
        </label>
      </div>
    
    </div>
  )
}
