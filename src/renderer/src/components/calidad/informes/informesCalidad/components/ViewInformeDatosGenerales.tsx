/* eslint-disable prettier/prettier */
import { contenedoresType } from "@renderer/types/contenedoresType";
import { lotesType } from "@renderer/types/lotesType"
import { format } from "date-fns"
import { es } from 'date-fns/locale';
import '../css/informesDatosGeneral.css'
type propsType = {
    loteSeleccionado: lotesType
    contenedores: contenedoresType[]
    setDataInforme: (e) => void
}

export default function ViewInformeDatosGenerales(props: propsType): JSX.Element {
    return (
        <div className="view-informes-datos-general-container">
            <div>
                <p>Clase de Fruta: <span>{props.loteSeleccionado.tipoFruta}</span></p>
                <p>Variedad:</p>
            </div>
            <div>
                <p>Fecha de Ingreso:
                    <span>
                        {format(props.loteSeleccionado.fechaIngreso ?
                            new Date(props.loteSeleccionado.fechaIngreso) :
                            new Date(), 'dd/MM/yyyy HH:mm', { locale: es })}
                    </span>
                </p>
                <p>Lugar: <span>{props.loteSeleccionado.predio?.DEPARTAMENTO}</span></p>
            </div>
            <div>
                <p>Predio: <span>{props.loteSeleccionado.predio?.PREDIO}</span></p>
                <p>Código ICA: <span>{props.loteSeleccionado.predio?.ICA}</span></p>
                <p>Código GGN: <span>{props.loteSeleccionado.predio?.GGN}</span></p>
            </div>
            <div>
                <p>Cantidad Ingreso Kg primera: <span>{props.loteSeleccionado.kilos}</span></p>
                <p>Orden de compra N° <span>{props.loteSeleccionado.enf}</span></p>
            </div>
            <div>
                <p>Contenedores:
                    <span>
                        {
                            props.contenedores !== undefined &&
                            props.contenedores.reduce((acu, cont) => (acu += cont.numeroContenedor + "-"), ' ')
                        }
                    </span></p>
            </div>
        </div>
    )
}