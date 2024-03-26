/* eslint-disable prettier/prettier */
import { contenedoresType } from "@renderer/types/contenedoresType"
import "../css/infoContenedor.css"

type propsType = {
    contenedor: contenedoresType
}
export default function TablaInspeccionMula(props: propsType): JSX.Element {
    const headers = ["Agencia de aduanas", "Puerto", "Prof", "Naviera", "Conductor", "Cedula", "Celular", "Color", "Placa", "Trailer", "Modelo", "Marca"]
    const keys = ["agenciaAduanas", "puerto", "prof", "naviera", "conductor", "cedula", "celular", "color", "placa", "trailer", "modelo", "marca"]
    return (
        <div className="contenedores-infoContenedor-container">
            {headers.map((item, index) => (
                <div key={item} className="contenedores-infoContenedor-div-datos">
                    <div className="contenedores-infoContenedor-div-datos-header">{item}</div>
                    <div className="contenedores-infoContenedor-div-datos-info">
                        {props.contenedor.formularioInspeccionMula && props.contenedor.formularioInspeccionMula[keys[index]]}
                    </div>
                </div>
            ))}
        </div>
    )
}