/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"
import { filtroColumnasCalidadType } from "../type/types"
import {  KEY_FILTRO_COL_CALIDAD } from "../functions/constantes"
import { promedioCalidad } from "../functions/functions"
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
    columnVisibility: filtroColumnasCalidadType
    data: lotesType[]
}

export default function PromediosCalidad(props: propsType): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div className="mt-4">
            <div className={`${theme === 'Dark' ? 'bg-slate-500' : 'bg-slate-200'} 
                        p-4 rounded-lg shadow-lg`}>
                <h3 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold`}>
                    Promedios
                </h3>
                <div className={`${theme === 'Dark' ? 'bg-slate-900 text-white' : 'bg-white text-black'} rounded-lg p-2 flex flex-row flex-wrap gap-4`}>
                    {Object.keys(props.columnVisibility).map((item, index) => {
                        if (props.columnVisibility[item] && item) {
                            console.log(item)
                            return (<p className={`font-bold`} key={index}>{KEY_FILTRO_COL_CALIDAD[item]}: {promedioCalidad(props.data, item).toFixed(2)}</p>)
                        } else {
                            return null
                        }
                    })}
                </div>
            </div>
        </div>
    )
}