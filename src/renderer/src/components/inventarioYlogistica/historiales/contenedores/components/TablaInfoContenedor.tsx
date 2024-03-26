/* eslint-disable prettier/prettier */
import { contenedoresType } from "@renderer/types/contenedoresType"
import "../css/infoContenedor.css"
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'
import { format } from "date-fns"

type propsType = {
    contenedor: contenedoresType
}
export default function TablaInfoContenedor(props: propsType): JSX.Element {
    const headers = ["Fecha creación", "Fecha inicio", "Fecha de cargue", "Tipo de ruta", "Empaque", "Caja", "Calidad", "Calibres", "Desverdizado", "Cerrado", "Observaciones"]
    const keys = ["fechaCreacion", "fechaInicio", "fechaEstimadaCargue", "tipoFruta", "tipoEmpaque", "tipoCaja", "calidad", "calibres", "desverdizado", "cerrado", "observaciones"]
    return (
        <div className="contenedores-infoContenedor-container">
            {headers.map((item, index) => {
                if (item === "Caja" || item === "Calidad" ){
                    return (
                        <div key={item} className="contenedores-infoContenedor-div-datos">
                            <div className="contenedores-infoContenedor-div-datos-header">{item}</div>
                            <div className="contenedores-infoContenedor-div-datos-info">{props.contenedor.infoContenedor &&  props.contenedor.infoContenedor[keys[index]].map(x => x + " - ")}</div>
                        </div>
                    )
                } else if (item.startsWith("Fecha")){
                    return (
                        <div key={item} className="contenedores-infoContenedor-div-datos">
                            <div className="contenedores-infoContenedor-div-datos-header">{item}:</div>
                            <div className="contenedores-infoContenedor-div-datos-info">
                            {format(props.contenedor.infoContenedor?
                                    new Date(props.contenedor.infoContenedor[keys[index]]) :
                                    new Date(), 'dd-MM-yy')}
                            </div>
                        </div>
                    )
                } else if (item === "Desverdizado" || item === "Cerrado"){
                    return (
                        <div key={item} className="contenedores-infoContenedor-div-datos">
                            <div className="contenedores-infoContenedor-div-datos-header">{item}</div>
                            <div className="contenedores-infoContenedor-div-datos-info">
                                {props.contenedor.infoContenedor && props.contenedor.infoContenedor[keys[index]] ? <FcOk /> : <FcCancel />}
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={item} className="contenedores-infoContenedor-div-datos">
                            <div className="contenedores-infoContenedor-div-datos-header">{item}:</div>
                            <div className="contenedores-infoContenedor-div-datos-info">{props.contenedor.infoContenedor && props.contenedor.infoContenedor[keys[index]]}</div>
                        </div>
                    )

                }
            }


            )}
        </div>


    )
}