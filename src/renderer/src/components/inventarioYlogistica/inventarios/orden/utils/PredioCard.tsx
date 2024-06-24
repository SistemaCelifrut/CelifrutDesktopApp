/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType"
import { format } from "date-fns"
import { BsArrowRightSquareFill } from "react-icons/bs";
import { es } from 'date-fns/locale';

type propsType = {
    lote: lotesType
    handleAddOrdenVaceo: (_id) => void
}

export default function PredioCard(props: propsType): JSX.Element {
    return (
        <div className="orden-vaciado-tarjeta-container">
            <div className="div1">
                <div className="orden-vaciado-tarjeta-nombre-predio-div">
                    <p>{props.lote.enf}</p>
                    <p>{props.lote.predio?.PREDIO}</p>
                    <p>{format(props.lote.fechaIngreso ? new Date(props.lote.fechaIngreso) : new Date(), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
                </div>
                <div className="orden-vaciado-tarjeta-nombre-predio-div">
                    <p>{props.lote.tipoFruta}</p>
                    {Object.prototype.hasOwnProperty.call(props.lote, "desverdizado") ? 
                        <p> Canastillas: {Number(props.lote?.canastillas)}</p> :
                        <p>Canastillas: {Number(props.lote?.inventario)}</p> 
                    }
                      {Object.prototype.hasOwnProperty.call(props.lote, "desverdizado") ? 
                        <p>Canastillas: {(Number(props.lote?.inventario) * Number(props.lote.promedio)).toLocaleString('es-CO')} Kg</p> :
                        <p> Canastillas: {(Number(props.lote?.inventario) * Number(props.lote.promedio)).toLocaleString('es-CO')} Kg</p>
                    }
                    {Object.prototype.hasOwnProperty.call(props.lote, "desverdizado") && 
                        <p>Desverdizado</p>
                    }
                    {/* <p>{props.lote._id}</p> */}
                </div>
            </div>
            <div className="div2">
                

                    <button onClick={(): void => props.handleAddOrdenVaceo(props.lote._id)}>
                        <BsArrowRightSquareFill />
                    </button>
                
            </div>
        </div>
    )
}
