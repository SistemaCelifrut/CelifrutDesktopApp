/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"
import { filtroColumnasType } from "../type/types"
import { KEYS_FILTROS_COL } from "../functions/constantes"
import { promedio, promedioDescartes, promedioExportacion } from "../functions/functions"
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
    columnVisibility: filtroColumnasType
    data: lotesType[]
}

export default function PromediosProceso(props:propsType): JSX.Element {
    const theme = useContext(themeContext)
  return (
    <div className="mt-4">
        <div className={`${theme === 'Dark' ? 'bg-slate-500' : 'bg-slate-200'} 
                        p-4 rounded-lg shadow-lg`}>
            <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold`}>
                Promedios
            </h3>
            <div className={`${theme === 'Dark' ? 'bg-slate-900 text-white': 'bg-white text-black'} rounded-lg p-2 flex flex-row flex-wrap gap-4`}>
            {Object.keys(props.columnVisibility).map((item,index) =>{
                if(props.columnVisibility[item] && item !== 'placa' && item !== 'observaciones'){
                    if(item !== 'descarteLavado' && item !== 'descarteEncerado' && item !== 'exportacion'){
                        return(<p className={`font-bold`} key={index}>{KEYS_FILTROS_COL[item]}: {promedio(props.data,item).toFixed(2)}</p>)
                    }else if(item !== 'exportacion'){
                        return(<p className={`font-bold`} key={index}>{KEYS_FILTROS_COL[item]}: {promedioDescartes(props.data,item).toFixed(2)}</p>)
                    }else{
                        return (<p className={`font-bold`} key={index}>{KEYS_FILTROS_COL[item]}: {promedioExportacion(props.data).toFixed(2)}</p>)
                    }
                } else {
                    return null
                }
            })}
            </div>
        </div>
    </div>
  )
}
