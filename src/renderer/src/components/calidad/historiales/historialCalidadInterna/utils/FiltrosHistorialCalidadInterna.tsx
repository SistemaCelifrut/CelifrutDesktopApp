/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"

type propsType = {
    handleFiltro: (tipoFiltro, elemento) => void
    setCantidad: (e) => void
}

export default function FiltrosHistorialCalidadInterna(props: propsType): JSX.Element {

    const handleTipoFruta = (e): void => {
        props.handleFiltro("tipoFruta", e.target.value)
    }
    const handleFechaInicio = (e): void => {
        props.handleFiltro("fechaInicio", e.target.value)
    }
    const handleFechaFin = (e): void => {
        props.handleFiltro("fechaFin", e.target.value)
    }

    const theme = useContext(themeContext);
    return (
        <div className={`${theme === 'Dark' ? 'bg-gray-500' : 'bg-gray-200'} p-3 rounded-lg shadow-lg`}>
            <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                    text-2xl font-bold  transition-all border-b-2 duration-500 ease-in-out  hover:text-Celifrut-green hover:border-b-2  hover:border-Celifrut-green`}>
                <h2>Historial Calidad interna</h2>
            </div>
            <div className={`flex flex-row flex-wrap gap-2 p-3 rounded-xl`}>
                <select className="rounded-lg p-2" onChange={handleTipoFruta}>
                    <option value="">Tipo de fruta</option>
                    <option value="Naranja">Naranja</option>
                    <option value="Limon">Limon</option>
                </select>
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
          Cantidad-lotes
          <div>
            <input onChange={(e): void => props.setCantidad(Number(e.target.value))} type="number" className="w-28 rounded-lg p-1 text-black" min={0} />
          </div>
        </label>
            </div>
        </div>
    )
}
