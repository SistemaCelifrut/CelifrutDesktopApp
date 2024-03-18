/* eslint-disable prettier/prettier */
import { lotesType } from "@renderer/types/lotesType"
import "../css/ordenVaciadoCard.css"
import { format } from "date-fns"
import { ImCancelCircle } from "react-icons/im";

type propsType = {
  lote: lotesType
  index: number
  handleRemoveOrdenVaceo: (_id) => void
}

export default function OrdenVaciadoCard(props: propsType): JSX.Element {
  return (
    <div className="orden-vaciado-card-container">
      <div className="orden-vaciado-card-container-div-index">
        {props.index + 1}
      </div>
      <div className="orden-vaciado-card-container-div-predio">
        <div className="orden-vaciado-card-container-div-info">
          <p>{props.lote?.enf}</p>
          <p>{props.lote?.predio?.PREDIO}</p>
          <p>{format(props.lote.fechaIngreso ? new Date(props.lote.fechaIngreso) : new Date(), 'dd/MM/yyyy')}</p>
        </div>
        <div className="orden-vaciado-card-container-div-info">
          <p>{props.lote.tipoFruta}</p>
          {Object.prototype.hasOwnProperty.call(props.lote, "desverdizado") ?
            <p> Canastillas: {Number(props.lote.desverdizado?.canastillas)}</p> :
            <p>Canastillas: {Number(props.lote.inventarioActual?.inventario)}</p>
          }
          {Object.prototype.hasOwnProperty.call(props.lote, "desverdizado") ?
            <p>Canastillas: {(Number(props.lote.desverdizado?.canastillas) * Number(props.lote.promedio)).toLocaleString('es-CO')} Kg</p> :
            <p> Canastillas: {(Number(props.lote.inventarioActual?.inventario) * Number(props.lote.promedio)).toLocaleString('es-CO')} Kg</p>
          }
          {Object.prototype.hasOwnProperty.call(props.lote, "desverdizado") &&
            <p>Desverdizado</p>
          }
          {/* <p>{props.lote._id}</p> */}
        </div>

      </div>
      <div className="orden-vaciado-card-container-div-cancel">
        <button onClick={(): void => props.handleRemoveOrdenVaceo(props.lote._id)}><ImCancelCircle /></button>
      </div>
    </div>
  )
}
