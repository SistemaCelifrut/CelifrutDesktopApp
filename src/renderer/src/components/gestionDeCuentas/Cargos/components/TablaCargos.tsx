/* eslint-disable prettier/prettier */
import { cargoType } from "@renderer/types/cargos"

type propsType = {
    data: cargoType[] | undefined
}
export default function TablaCargos(props: propsType): JSX.Element {
    const headers = ["Cargo", "Fecha creación"];
    if(props.data === undefined) {
        return(
            <div>
                Cargando Datos
            </div>
        )
    }
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
                {props.data.map(cargo => (
                    <tr key={cargo._id}>
                        <td>{cargo.Cargo}</td>
                        <td>{cargo.createdAt}</td>
                    </tr>
                ))}

                </tbody>
        </table>
    )
}
