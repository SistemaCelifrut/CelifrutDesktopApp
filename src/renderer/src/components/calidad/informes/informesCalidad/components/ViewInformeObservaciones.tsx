/* eslint-disable prettier/prettier */
import { dataCalidadInterna } from "@renderer/constants/calidadDefectos"
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
    loteSeleccionado: lotesType
}
export default function ViewInformeObservaciones(props: propsType): JSX.Element {
    return (
        <div>
            <div>
                <h3>Observaciones</h3>
            </div>
            <div>
                {props.loteSeleccionado &&
                    Object.entries(dataCalidadInterna).map(([key, value]) => (
                        <div key={key}>
                          <p>{value}</p>
                          <p>{props.loteSeleccionado.calidad?.calidadInterna?.[key]}</p>
                        </div>
                      ))}
            </div>
        </div>
    )
}