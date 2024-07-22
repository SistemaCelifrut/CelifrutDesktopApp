/* eslint-disable prettier/prettier */

import { filtroColumnasType } from "../type/types"
import { KEYS_FILTROS_COL } from "../functions/constantes"
import { promedio, promedioDescartes, promedioDesverdizado, promedioExportacion } from "../functions/functions"
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
    columnVisibility: filtroColumnasType
    data: lotesType[]
}

export default function PromediosProceso(props: propsType): JSX.Element {
    return (
        <div className="componentContainer">
            <div className="lotes-proceso-promedios-div">
                <h3>Promedios</h3>
                <div className="lotes-proceso-promedios-div2">
                    {Object.keys(props.columnVisibility).map((item, index) => {
                        if (!props.columnVisibility[item]) {
                            return null
                        }
                        if (['placa', 'observaciones', 'contenedores'].includes(item)) {
                            return null
                        }
                        if (['descarteLavado', 'descarteEncerado'].includes(item)) {
                            return (<p key={index}>{KEYS_FILTROS_COL[item]}: {promedio(props.data, item).toFixed(2)}</p>)
                        } else if (item === 'exportacion') {
                            return (<p key={index}>{KEYS_FILTROS_COL[item]}: {promedioExportacion(props.data).toFixed(2)}</p>)
                        } else if(item === 'desverdizado'){
                            return (<p key={index}>{KEYS_FILTROS_COL[item]}: {promedioDesverdizado(props.data).toFixed(2)}</p>)
                        }
                        else {
                            return (<p key={index}>{KEYS_FILTROS_COL[item]}: {promedioDescartes(props.data, item).toFixed(2)}</p>)
                        }

                    })}
                </div>
            </div>
        </div>
    )
}
