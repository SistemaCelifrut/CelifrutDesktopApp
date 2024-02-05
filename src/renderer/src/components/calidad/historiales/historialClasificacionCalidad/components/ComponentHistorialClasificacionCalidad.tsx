/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react"
import { dataHistorialCalidadClasificacion, filtroType } from "../types/clasificacionTypes"
import TarjetaHistorialClasificacionCalidad from "../utils/TarjetaHistorialClasificacionCalidad"
import FiltrosHistorialClasificacionCalidad from "../utils/FiltrosHistorialClasificacionCalidad"
type propsType = {
    setShowSuccess: (e) => void
    setShowError: (e) => void
    setMessage: (e) => void
}
export default function ComponentHistorialClasificacionCalidad(props: propsType): JSX.Element {
    const [filtro, setFiltro] = useState<filtroType>({ tipoFruta: '', fechaIngreso: { $gte: null, $lt: null }, cantidad: "" })
    const [data, setData] = useState<dataHistorialCalidadClasificacion[]>([])
    useEffect(() => {
        const obtenerDataClasificacionCalidad = async (): Promise<void> => {
            try {
                const request = {
                    action: "dataHistorialClasificacionCalidad",
                    query: 'proceso',
                    data: { filtros: filtro }
                }
                const response = await window.api.calidad(request)
                if (response.status === 200) {
                    setData(response.data)
                } else {
                    props.setShowError(true)
                    props.setMessage("Error obteniendo los datos del servidor")
                    setInterval(() => {
                        props.setShowError(false)
                    }, 5000)
                }
            } catch (e) {
                props.setShowError(true)
                props.setMessage("Error obteniendo los datos del servidor")
                setInterval(() => {
                    props.setShowError(false)
                }, 5000)
            }
        }
        obtenerDataClasificacionCalidad()
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
    const ordenar = (a, b): number => {
        const numA = parseInt(a._id.substring(8));
        const numB = parseInt(b._id.substring(8));
        return numB - numA;
    }
    return (
        <div className="flex flex-col gap-2 p-2">
            <FiltrosHistorialClasificacionCalidad handleFiltro={handleFiltro} />
            {Array.isArray(data) && data.sort(ordenar).map((lote, index) => (
                <div key={index} ><TarjetaHistorialClasificacionCalidad lote={lote} /></div>
            ))}
        </div>
    )
}
