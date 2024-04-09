/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType"
import { filtroColumnasType } from "../type/types"
import { totalData, totalDescartes, totalExportacion } from "../functions/functions"
import { KEYS_FILTROS_COL } from "../functions/constantes"

type propsType ={
    columnVisibility: filtroColumnasType
    data: lotesType[]
}
export default function TotalesProceso (props:propsType): JSX.Element{
    return (
        <div className="componentContainer">
            <div className="lotes-proceso-promedios-div">
                <h3>Total</h3>
                <div className="lotes-proceso-promedios-div2">
                {Object.keys(props.columnVisibility).map((item,index) =>{
                    if(props.columnVisibility[item] && item !== 'placa' && item !== 'observaciones' && item !== 'rendimiento'){
                        if(item !== 'descarteLavado' && item !== 'descarteEncerado' && item !== 'exportacion'){
                            return(<p  key={index}>{KEYS_FILTROS_COL[item]}: {totalData(props.data,item).toLocaleString()}</p>)
                        }else if(item !== 'exportacion'){
                            return(<p  key={index}>{KEYS_FILTROS_COL[item]}: {totalDescartes(props.data,item).toLocaleString()}</p>)
                        }else{
                            return (<p  key={index}>{KEYS_FILTROS_COL[item]}: {totalExportacion(props.data).toLocaleString()}</p>)
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