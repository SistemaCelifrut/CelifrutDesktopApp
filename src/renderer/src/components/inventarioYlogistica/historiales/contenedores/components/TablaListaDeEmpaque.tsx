/* eslint-disable prettier/prettier */

import { contenedoresType } from "@renderer/types/contenedoresType"
import { useEffect, useState } from "react"
import { itemListaEmpaqueType } from "../types/types"
import useAppContext from "@renderer/hooks/useAppContext"
import { crear_lista_empaque } from "../functions/crearListaEmpaque"
type propsType = {
    contenedor: contenedoresType
}

export default function TablaListaDeEmpaque(props: propsType): JSX.Element {
    const { messageModal } = useAppContext();
    const headers = ["Pallet", "Fecha empaque", "Rotulo", "Variedad", "Producto", "Peso", "Categoria", "Tamaño", "Cantida", "ICA", "GGN", "Fecha vnecimiento"]
    const [data, setData] = useState<itemListaEmpaqueType[]>([])
    useEffect(() => {
        try {
            const response = crear_lista_empaque(props.contenedor);
            if (typeof response === "string")
                throw new Error(response)
            setData(response)
        } catch (e) {
            if (e instanceof Error) {
                messageModal("error", e.message)
            }
        }
    }, [])

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
                {data.map((item, index) => (
                    <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={index} >
                        <td>
                            {item.pallet}
                        </td>
                        <td>
                            {item.fecha}
                        </td>
                        <td>
                            {item.label}
                        </td>
                        <td>
                            {item.variedad}
                        </td>
                        <td>
                            {item.producto}
                        </td>
                        <td>
                            {item.peso}
                        </td>
                        <td>
                            {item.categoria}
                        </td>
                        <td>
                            {item.tamaño}
                        </td>
                        <td>
                            {item.cantidad}
                        </td>
                        <td>
                            {item.ICA}
                        </td>
                        <td>
                            {item.GGN}
                        </td>
                        <td>
                            {item.fechaVencimiento}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}