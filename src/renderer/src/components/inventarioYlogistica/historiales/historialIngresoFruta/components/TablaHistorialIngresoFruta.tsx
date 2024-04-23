/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType"
import { format } from "date-fns"
import { PiNotePencilDuotone } from "react-icons/pi";

type propsType = {
    data: lotesType[] | undefined
    handleModificar: () => void
    setLoteSeleccionado: (lote) => void
}
export default function TablaHistorialIngresoFruta(props:propsType): JSX.Element {
    if(props.data === undefined) return <div>Cargando...</div>
    const headers = ["EF1", "Predio", "Numero de canastillas", "Kilos", "Fecha ingreso", "Tipo de fruta", "Observaciones", "Placa", ""]
    const handleButton= (lote): void => {
        props.handleModificar()
        props.setLoteSeleccionado(lote)
    }
    return (
        <table className="table-main">
            <thead>
                <tr >
                    {headers.map(item => (
                        <th key={item}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map((lote, index) => (
                    <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={lote._id} >
                        <td>{lote.enf}</td>
                        <td>{lote.predio?.PREDIO}</td>
                        <td>{lote.canastillas}</td>
                        <td>{lote.kilos?.toLocaleString('es-ES')}</td>
                        <td>{format(lote.fechaIngreso ? new Date(lote.fechaIngreso) : new Date(), 'dd-MM-yy')}</td>
                        <td>{lote.tipoFruta}</td>
                        <td>{lote.observaciones}</td>
                        <td>{lote.placa}</td>
                        <td>
                            <button style={{ color: "blue" }} onClick={():void => handleButton(lote)} ><PiNotePencilDuotone /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}