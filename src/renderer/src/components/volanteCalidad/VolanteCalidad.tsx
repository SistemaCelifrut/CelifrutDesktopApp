/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"
import FilstrosFecha from "./utils/FilstrosFecha"
import { registrosType } from "./type/type"
import { isServerResponse } from "./functions/comprobarTypes"
import TablaVolantecalidad from "./table/TablaVolantecalidad"

export default function VolanteCalidad(): JSX.Element {
    const theme = useContext(themeContext)
    const [data, setData] = useState<registrosType[]>([])
    const [fechaInicio, setFechaInicio] = useState<Date>()
    const [fechaFin, setFechaFin] = useState<Date>()
    useEffect((): void => {
        const funcionAsyncrona = async (): Promise<void> => {
            const request = { action: 'obtenerVolanteCalidad', query: 'personal' }
            const data = await window.api.calidad(request)
            if (isServerResponse(data)) {
                setData(data.data)
            } else {
                alert('Error al traer los datos del servidor')
            }
        }
        funcionAsyncrona()
    }, [])

    useEffect((): void => {
        const obtenerDatosFiltrados = async (): Promise<void> => {
            console.log(fechaInicio)
            console.log(fechaFin)
            const request = { action: 'obtenerVolanteCalidad', query: 'personal', data: { fechaInicio: fechaInicio, fechaFin: fechaFin } }
            const data = await window.api.calidad(request)
            if (isServerResponse(data)) {
                setData(data.data)
            } else {
                alert('Error al traer los datos del servidor')
            }
        }
        obtenerDatosFiltrados()
    }, [fechaInicio, fechaFin])


    return (
        <div>
            <div className={`w-full flex justify-center p-2 text-2xl font-bold ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                <h2>
                    Volante calidad
                </h2>
            </div>
            <div>
                <FilstrosFecha setFechaFin={setFechaFin} setFechaInicio={setFechaInicio} />
            </div>
            <div>
                <TablaVolantecalidad data={data} />
            </div>
        </div>

    )
}
