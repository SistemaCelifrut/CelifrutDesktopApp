/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType"
import { obtenerPorcentage } from "../functions/data"

type propsType = {
    loteSeleccionado: lotesType
}

export default function ViewInformeResultados(props: propsType): JSX.Element {
    return (
        <>
            <tr>
                <td>Exportación Tipo 1: </td>
                <td>{props.loteSeleccionado.calidad1}</td>
                <td>{
                    props.loteSeleccionado.kilos &&
                    obtenerPorcentage(props.loteSeleccionado.calidad1, props.loteSeleccionado.kilos).toFixed(2)
                }% </td>

            </tr>
            <tr>
                <td>Exportación Tipo Caribe: </td>
                <td>{props.loteSeleccionado.calidad15}</td>
                <td>{
                    props.loteSeleccionado.kilos &&
                    obtenerPorcentage(props.loteSeleccionado.calidad15, props.loteSeleccionado.kilos).toFixed(2)
                }% </td>

            </tr>
            <tr>
                <td>Exportación Tipo 2: </td>
                <td>{props.loteSeleccionado.calidad2}</td>
                <td>{
                    props.loteSeleccionado.kilos &&
                    obtenerPorcentage(props.loteSeleccionado.calidad2, props.loteSeleccionado.kilos).toFixed(2)
                }% </td>

            </tr>
        </>
    )
}
