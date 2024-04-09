/* eslint-disable prettier/prettier */

import { format } from "date-fns"
import { registrosType } from "../type/type"

type propsType = {
    data: registrosType[]
}
export default function TablaVolantecalidad(props: propsType): JSX.Element {
    const headers = ["Nombre", "Apellido", "Tipo fruta", "Unidades revisadas", "Numero de defectos", "Fecha"]
    return (

        <table className="table-main">
            <thead>
                <tr>
                    {headers.map(item => (
                        <th key={item}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map((item, index) => (
                    <tr key={item.id} className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`}>
                        <td>
                            {item.nombre}
                        </td>
                        <td>
                            {item.apellido}
                        </td>
                        <td>
                            {item.tipo_fruta}
                        </td>
                        <td>
                            {item.unidades_revisadas}
                        </td>
                        <td>
                            {item.numero_defectos}
                        </td>
                        <td>
                            {format(item.fecha_ingreso ? new Date(item.fecha_ingreso) : new Date(), 'dd-MM-yy')}
                        </td>
                    </tr>
                    ))}
            </tbody>
        </table>

    )
}
