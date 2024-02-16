/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useState  } from "react"

type propsType = {
  handleFiltro: (tipoFiltro, elemento) => void
  prediosData: string[]
  setEf1: (e) => void
  setFiltroPredio: (e) => void
  setCantidad: (e) => void
  seteOrdenar: (e) => void

}

export default function FiltroFilasCalidad(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
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
    if(criterio === 'acidez'){
      props.handleFiltro('acidezMin', e.target.value)
    }else if( criterio === 'brix'){
      props.handleFiltro('brixMin', e.target.value)
    }else if( criterio === 'ratio'){
      props.handleFiltro('ratioMin', e.target.value)
    }else if( criterio === 'peso'){
      props.handleFiltro('pesoMin', e.target.value)
    } else if( criterio === 'zumo'){
      props.handleFiltro('zumoMin', e.target.value)
    }
  }
  const handleMaxRendimiento = (e): void => {
    if(criterio === 'acidez'){
      props.handleFiltro('acidezMax', e.target.value)
    }else if( criterio === 'brix'){
      props.handleFiltro('brixMax', e.target.value)
    }else if( criterio === 'ratio'){
      props.handleFiltro('ratioMax', e.target.value)
    }else if( criterio === 'peso'){
      props.handleFiltro('pesoMax', e.target.value)
    } else if( criterio === 'zumo'){
      props.handleFiltro('zumoMax', e.target.value)
    }
  }
  const handleOrdenar = (e): void => {
    const obj = {};
    obj[criterio] = Number(e.target.value);
     props.seteOrdenar(obj)
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
   
        <label className={`flex flex-col ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Fecha Incio
          <input className="text-black rounded-lg p-1" type="date" onChange={handleFechaInicio} />
        </label>
        <label className={`flex flex-col ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Fecha Fin
          <input className="text-black rounded-lg p-1" type="date" onChange={handleFechaFin} />
        </label>
        <label className={`flex flex-col ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Cantidad-lotes
          <div>
            <input onChange={(e): void => props.setCantidad(Number(e.target.value))} type="number" className="w-28 rounded-lg p-1 text-black" min={0} />
          </div>
        </label>
        <select className="rounded-lg p-2" onChange={(e): void => setCriterio(e.target.value)}>
          <option value="">Criterio</option>
          <option value="acidez">Acidez</option>
          <option value="brix">Brix</option>
          <option value="ratio">Ratio</option>
          <option value="peso">Peso</option>
          <option value="zumo">Zumo</option>
        </select>
          {criterio !== '' && 
           <label className={`flex flex-col ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
           Umbral
           <div>
             <input onChange={handleMinRendimiento} type="number" className="w-16 rounded-lg p-1 text-black" placeholder="min"/> - <input onChange={handleMaxRendimiento} type="number" className="w-16 text-black rounded-lg p-1" placeholder="max"/>
           </div>
         </label>}
         {criterio !== '' && 
         <select className="rounded-lg p-2" onChange={handleOrdenar}>
          <option value="-1">Ordenado por</option>
          <option value="1">De menor a mayor</option>
          <option value="-1">De mayor a menor</option>
        </select>}
      </div>
    
    </div>
  )
}
