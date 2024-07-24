/* eslint-disable prettier/prettier */
import { format } from "date-fns"
import { PiNotePencilDuotone } from "react-icons/pi";
import { es } from 'date-fns/locale';
import { recordLotesType } from "@renderer/types/recorLotesType";

type propsType = {
    data: recordLotesType[] | undefined
    handleModificar: () => void
    setLoteSeleccionado: (lote) => void
}
export default function TablaHistorialIngresoFruta(props:propsType): JSX.Element {
    if(props.data === undefined) return <div>Cargando...</div>
    const headers = ["EF1", "Predio", "Numero de canastillas", "Kilos", "Fecha ingreso", "Tipo de fruta", "Observaciones", "Placa", "User", ""]
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
                        <td>{lote.documento.enf}</td>
                        <td>{lote.documento.predio?.PREDIO}</td>
                        <td>{lote.documento.canastillas}</td>
                        <td>{lote.documento.kilos?.toLocaleString('es-ES')}</td>
                        <td>{format(lote.documento.fechaIngreso ? new Date(lote.documento.fechaIngreso) : new Date(), 'dd/MM/yyyy HH:mm', { locale: es })}</td>
                        <td>{lote.documento.tipoFruta}</td>
                        <td>{lote.documento.observaciones}</td>
                        <td>{lote.documento.placa}</td>
                        <td>{lote.user}</td>
                        <td>
                            <button style={{ color: "blue" }} onClick={():void => handleButton(lote)} ><PiNotePencilDuotone /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}