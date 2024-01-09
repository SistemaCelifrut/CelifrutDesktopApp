/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react'
import { AreaSchema } from '../types/controlPlagas'
import { themeContext } from '@renderer/App'
import { format } from 'date-fns'
import ColumnasControlPlagas from '../utils/ColumnasControlPlagas'
import { getAreaName } from '../functions/llavesControlDePlagas'
import { filtroArea } from '../functions/filtroControlDePlagas'

export default function ControlPlagas(): JSX.Element {
  const theme = useContext(themeContext)
  const [table, setTable] = useState<AreaSchema[]>([])
  const [data, setData] = useState<AreaSchema[]>([])
  const [area, setArea] = useState<string>('')

  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerRegistroControlPlagas', query:'personal' }
        const response = await window.api.calidad(request)
        setTable(response.data)
        setData(response.data)
      } catch (e: unknown) {
        alert(`${e}`)
      }
    }
    asyncFunction()
  }, [])

  const handleArea = (e): void =>{
    setArea(e.target.value)
  }

  const handleChangeFiltroFecha = async (e): Promise<void> => {
    const request = { action: 'obtenerRegistroControlPlagas', data:e.target.value, query:'personal' }
    const response = await window.api.calidad(request)
    setTable(response.data)
    setData(response.data)
  }


  useEffect(() => {
    const dataFiltrada = filtroArea(data, area)
    setTable(dataFiltrada)
  }, [area])


  return (
    <div className="p-2">
      <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold`}>
        CONTROL Y MONITOREO DE PLAGAS
      </h2>
      <div
        className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}
                        flex flex-row m-2 p-4 rounded-lg shadow-xl gap-2 justify-betweens`}
      >
        <label
          className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}
          htmlFor="fechaFilter"
        >
          Filtrar por Fecha:
        </label>
        <input className="w-1/5 rounded-md pl-2" type="date" id="fechaFilter"  onChange={handleChangeFiltroFecha}/>
        <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`} htmlFor="areaFilter">
          Filtrar por Área:
        </label>
        <select id="areaFilter" className="w-1/5 rounded-md pl-2" onChange={handleArea}>
          <option value="">Todas</option>
          <option value="area_control">Área de Control</option>
          <option value="area_cebo">Área de Cebo</option>
          <option value="area_hallazgos">Área de Hallazgos</option>
        </select>
      </div>
      <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/6`}>Fecha</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/6`}>
              Responsable
            </th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/6`}>Tipo Área</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/3`}>Área</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/6`}>
              Observaciones
            </th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/6`}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {table.map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
              <td className="p-2 text-sm w-1/5">
                {format(new Date(item.fecha), 'dd/MM/yyyy HH:mm:ss')}
              </td>
              <td className="p-2 text-sm w-1/5">{item.responsable}</td>
              <td className="p-2 text-sm w-1/5">
                {Object.keys(item)
                  .reduce<string[]>((areas, key) => {
                    if (key !== 'responsable' && key !== 'fecha') {
                      const areaName: string = getAreaName(key)
                      if (areaName !== 'Otro' && !areas.includes(areaName)) {
                        areas.push(areaName)
                      }
                    }
                    return areas
                  }, [])
                  .map((areaName, index) => (
                    <p key={index}>-{areaName}</p>
                  ))}
              </td>
              <td className="p-2 text-sm flex flex-row flex-wrap gap-1">
                <ColumnasControlPlagas item={item} campo="nombreCampo" />
              </td>
              <td className="p-2 text-sm overflow-auto">
               <ColumnasControlPlagas item={item} campo='nombreObservacion' />
              </td>
              <td className="p-2 text-sm">
              <ColumnasControlPlagas item={item} campo='nombreAcciones' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
