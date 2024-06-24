/* eslint-disable prettier/prettier */

import { labelsInventarioDescarte } from "../func/functions"
import { invetarioDescarteEnceradoType } from "../types/type"

type propsType = {
    data: invetarioDescarteEnceradoType
}

export default function TablaDescarteEncerado (props:propsType):JSX.Element{

    return(
        <table className="table-main">
        <thead>
            <tr>
                <th>Descarte Lavado</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(props.data).map((key, index) => (
                <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`}  key={key}>
                    <td>{labelsInventarioDescarte[key]}</td>
                    <td>{props.data[key]} Kg</td>
                </tr>
            ))}
        </tbody>
    </table>
    )
}