/* eslint-disable prettier/prettier */
import { themeContext } from "@renderer/App"
import { useContext, useState } from "react"
import { FaFilter } from "react-icons/fa";

type propsType = {
  prediosData: string[]
  handleFiltro: (tipoFiltro, elemento) => void

}

export default function FiltrosInformacionPredios(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const [prediosSeleccionados, setPrediosSeleccionados] = useState<string[]>([])
  const [fechaInicio, setFechaInicio] = useState<string | null>(null)
  const [fechaFin, setFechaFin] = useState<string | null>(null)
  const handlePredios = (e): void => {
    const value = e.target.value
    const arr = [...prediosSeleccionados];
    arr.push(value)
    setPrediosSeleccionados(arr)
  }
  const handlePrediosSeleccionados = (e): void => {
    const value = e.target.value
    const arr = prediosSeleccionados.filter(item => item !== value)
    setPrediosSeleccionados(arr)
  }
  const handleFiltrar = (): void => {
    console.log(prediosSeleccionados)
    console.log(fechaInicio)
    console.log(fechaFin)
  }
  return (
    <div className="p-2 flex flex-col gap-4">
      <div className="flex flex-flow gap-4">
        <label className={`flex flex-col
                              ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Predios
          <select className="w-52 rounded-lg p-4" onChange={handlePredios} multiple>
            {props.prediosData.map((item, index) => (

              <>
                {prediosSeleccionados.includes(item) ? null : <option key={item + index} value={item} className="text-black">{item}</option>}
              </>
            ))}
          </select>
        </label>
        <label className={`flex flex-col
                              ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Predios seleccionados
          <select className="w-52 rounded-lg p-4" onChange={handlePrediosSeleccionados} multiple>
            {prediosSeleccionados.map((item, index) => (
              <option key={item + index} value={item} className="text-black">{item}</option>
            ))}
          </select>
        </label>
        <label className={`flex flex-col
                              ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Fecha Incio
          <input className="text-black rounded-lg p-1" type="date" onChange={(e): void => setFechaInicio(e.target.value)} />
        </label>
        <label className={`flex flex-col
                              ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
          Fecha Fin
          <input className="text-black rounded-lg p-1" type="date" onChange={(e): void => setFechaFin(e.target.value)} />
        </label>
      </div>
      <div>
        <button
        onClick={handleFiltrar}
          className={
            'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-700'
          }
        >
          <span className="absolute -end-full transition-all group-hover:end-4 text-xl">
            <FaFilter />
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4">
            Filtrar
          </span>
        </button>
      </div>
    </div>
  )
}
