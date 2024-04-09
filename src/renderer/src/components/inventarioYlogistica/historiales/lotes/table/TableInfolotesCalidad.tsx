/* eslint-disable prettier/prettier */

import { filtroColumnasCalidadType } from "../type/types"
import { KEY_FILTRO_COL_CALIDAD } from "../functions/constantes"
import { format } from "date-fns"
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
    data: lotesType[]
    columnVisibility: filtroColumnasCalidadType
}
export default function TableInfolotesCalidad(props: propsType): JSX.Element {
    return (
        <div className="componentContainer">
            <table className="table-main">
                <thead>
                    <tr className="h-14 broder-2">
                        <th>ID</th>
                        <th>Nombre del predio</th>
                        <th>Fecha ingreso</th>
                        <th>Fecha calidad interna</th>
                        <th>Tipo de fruta</th>
                        {Object.keys(props.columnVisibility).map(item => {
                            if (props.columnVisibility[item]) {
                                return (
                                    <th key={item}>
                                        {KEY_FILTRO_COL_CALIDAD[item]}
                                    </th>
                                )
                            } else {
                                return null
                            }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.data) && props.data.map((lote, index) => {
                        if (Object.prototype.hasOwnProperty.call(lote, 'calidad') && Object.prototype.hasOwnProperty.call(lote.calidad, 'calidadInterna')) {
                            return (
                                <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={index}>
                                    <td>{lote.enf}</td>
                                    <td>{lote.predio?.PREDIO}</td>
                                    <td>
                                        {format(lote.fechaIngreso ? new Date(lote.fechaIngreso) : new Date(), 'dd-MM-yyyy')}
                                    </td>
                                    <td>
                                        {lote.calidad && 
                                        Object.prototype.hasOwnProperty.call(lote.calidad.calidadInterna, 'fecha') && 
                                        format(lote.calidad.calidadInterna ? new Date(lote.calidad.calidadInterna.fecha) : 
                                        new Date(), 'dd-MM-yyyy')}
                                    </td>
                                    <td>{lote.tipoFruta}</td>
                                    {Object.keys(props.columnVisibility).map((item, index) => {
                                        if (props.columnVisibility[item]) {
                                            return (
                                                <td key={index + item}>
                                                    {lote.calidad && 
                                                    lote.calidad.calidadInterna && 
                                                    lote.calidad.calidadInterna[item] !== null ? 
                                                    lote.calidad.calidadInterna[item].toFixed(2) : 0}
                                                </td>
                                            )
                                        } else {
                                            return null
                                        }
                                    })}
                                </tr>
                            )
                        } else {
                            return null
                        }

                    })}
                </tbody>
            </table>
        </div>
    )
}
