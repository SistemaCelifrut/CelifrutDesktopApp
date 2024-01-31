/* eslint-disable prettier/prettier */
import { themeContext } from '@renderer/App'
import { format } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { limpiezaDataType } from '../types/limpiezaPostCosecha'
import { getAreaName, nombreCampo } from '../functions/LimpiezaPostCosecha'
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'

export default function LimpiezaPostCosecha(): JSX.Element {
  const theme = useContext(themeContext)
  const [table, setTable] = useState<limpiezaDataType[]>([])


  useEffect(() => {
    const asyncFunction = async (): Promise<void> => {
      const request = { action: 'obtenerRegistroLimpiezaDesinfeccionPlanta', query:'personal' }
      const response = await window.api.calidad(request)
      console.log(response)

      setTable(response.data)
    }
    asyncFunction()
  }, [])

  const handleChangeFiltroFecha = async (e): Promise<void> => {
    const request = { action: 'obtenerRegistroLimpiezaDesinfeccionPlanta', data:e.target.value, query:'personal' }
    const response = await window.api.calidad(request)
    setTable(response.data)
  }

  return (
    <div className="p-1">
      <div
        className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}
                        flex flex-row m-2 p-4 rounded-lg shadow-xl gap-4 `}
      >
        <label
          className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}
          htmlFor="fechaFiltro"
        >
          Filtrar por fecha:
        </label>
        <input className="w-1/5 rounded-md pl-2" type="date" id="fechaFiltro" onChange={handleChangeFiltroFecha} />
      </div>
      <h2
        className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                    font-bold text-2xl mt-8 ml-4`}
      >
        INSPECCIÓN LIMPIEZA Y DESINFECCIÓN DIARIA PLANTA POSTCOSECHA
      </h2>
      <table className={`mr-2 ml-2 w-full mt-2 border-2`}>
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Fecha</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Responsable</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Área</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Tipo Área</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Observaciones</th>
          </tr>
        </thead>
        <tbody className="border-2">
          {table &&
            table.map((item, index) => (
              <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}>
                <td className={`p-2 text-sm`}>
                  {format(new Date(item.fecha), 'dd/MM/yyyy HH:mm:ss')}
                </td>
                <td className={`p-2 text-sm`}>
                {item.responsable}
                      </td>
                <td className={`p-2 text-sm`}>
                  {Object.keys(item)
                    .reduce((areas: string[], key) => {
                      // Aquí estamos definiendo explícitamente el tipo del array
                      if (key !== 'responsable') {
                        const areaName = getAreaName(key)
                        if (areaName !== 'Otro' && !areas.includes(areaName)) {
                          areas.push(areaName)
                        }
                      }
                      return areas
                    }, [])
                    .map((areaName, index) => (
                      <p key={index}>{areaName}</p>
                    ))}
                </td>
                <td className={`p-2 text-sm`}>
                  {Object.entries(item).map(([elemento, valor], elIndex) => {
                    if (
                      elemento !== 'responsable' &&
                      !elemento.includes('_observaciones') &&
                      elemento !== '_id' &&
                      elemento !== '__v'
                    ) {
                      const nombreMostrado = nombreCampo[elemento] || elemento
                      return (
                        <div key={elIndex + "div"} className="border-2 border-slate-300 flex flex-row mt-1 mb-1 gap-2 items-center p-1">
                          <p key={elIndex}>{nombreMostrado}:</p>
                          <div> {valor ? <FcOk /> : <FcCancel />}</div>
                        </div>
                      )
                    }
                    return null
                  })}
                </td>
                <td className={`p-2 text-sm`}>
                  {Object.entries(item).map(([elemento, valor], elIndex) => {
                    if (elemento.includes('_observaciones')) {
                      const nombreMostrado = nombreCampo[elemento] || elemento
                      return (
                        <p key={elIndex}>
                          {nombreMostrado}: {valor}
                        </p>
                      )
                    }
                    return null
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
