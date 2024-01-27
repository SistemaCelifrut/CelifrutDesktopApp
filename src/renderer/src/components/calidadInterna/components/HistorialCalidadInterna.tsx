/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react"
import TableHistorialCalidadInterna from "../tables/TableHistorialCalidadInterna"
import { dataHistorialCalidadInterna, filtroType } from "../types/calidadInterna"
import FiltrosHistorialCalidadInterna from "../utils/FiltrosHistorialCalidadInterna"
type propsType = {
    setShowSuccess: (e) => void
    setShowError: (e) => void
    setMessage: (e) => void
}

export default function HistorialCalidadInterna(props: propsType): JSX.Element {
    const [data, setData] = useState<dataHistorialCalidadInterna[]>([])
    const [filtro, setFiltro] = useState<filtroType>({ tipoFruta: '', fechaIngreso: { $gte: null, $lt: null }, cantidad:"" })

    useEffect(() => {
        const requestDataCalidadInterna = async (): Promise<void> => {
            const request = {
                action: "dataHistorialCalidadInterna",
                query: 'proceso',
                data: { filtros: filtro }
            }
            const response = await window.api.calidad(request);
            console.log(response)
            if (response.status === 200) {
                setData(response.data)
            } else {
                props.setShowError(true)
                props.setMessage("Error obteniendo los datos del servidor")
                setInterval(() => {
                    props.setShowError(false)
                }, 5000)
            }
        }
        requestDataCalidadInterna()
    }, [filtro])

    const handleFiltro = (filtroCase, elementoFiltro): void => {
        if (filtroCase === 'tipoFruta') {
            setFiltro({ ...filtro, tipoFruta: elementoFiltro })
        } else if (filtroCase === 'fechaInicio') {
            const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
            nuevoFiltro.fechaIngreso.$gte = new Date(elementoFiltro)
            setFiltro(nuevoFiltro)
        } else if (filtroCase === 'fechaFin') {
            const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
            const fecha = new Date(elementoFiltro)
            fecha.setUTCHours(23);
            fecha.setUTCMinutes(59);
            fecha.setUTCSeconds(59);
            nuevoFiltro.fechaIngreso.$lt = fecha
            setFiltro(nuevoFiltro)
        } else if (filtroCase === 'cantidad') {
            const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
            nuevoFiltro.cantidad = elementoFiltro
            setFiltro(nuevoFiltro)
        } 
    }
    return (
        <div className="flex flex-col gap-2">
            <FiltrosHistorialCalidadInterna handleFiltro={handleFiltro} />
            <TableHistorialCalidadInterna data={data} />
        </div>
    )
}
