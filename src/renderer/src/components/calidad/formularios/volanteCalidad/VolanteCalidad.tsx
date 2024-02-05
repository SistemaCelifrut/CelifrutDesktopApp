/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"
import FilstrosFecha from "./utils/FilstrosFecha"
import { promedioOperarioType, registrosType } from "./type/type"
import { isServerResponse } from "./functions/comprobarTypes"
import TablaVolantecalidad from "./table/TablaVolantecalidad"
import { FaCircleArrowRight } from "react-icons/fa6";
import TableResumenVolanteCalidad from "./table/TableResumenVolanteCalidad"
import { obtenerOperarios } from "./functions/functions"
import Graficas from "./components/Graficas"



export default function VolanteCalidad(): JSX.Element {
    const theme = useContext(themeContext)
    const [data, setData] = useState<registrosType[]>([])
    const [fechaInicio, setFechaInicio] = useState<Date>()
    const [fechaFin, setFechaFin] = useState<Date>()
    const [tipoFruta, setTipoFruta] = useState<string>('')
    const [showResume, setShowResume] = useState<boolean>()
    const [promedios, setPromedios] = useState<promedioOperarioType[]>([])
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
            const request = { action: 'obtenerVolanteCalidad', query: 'personal', data: { fechaInicio: fechaInicio, fechaFin: fechaFin } }
            const data = await window.api.calidad(request)
            if (isServerResponse(data)) {
                let datos
                if (tipoFruta !== '') {
                    datos = data.data.filter(item => item.fruta === tipoFruta)
                } else {
                    datos = data.data
                }
                setData(datos)
                const operarios = obtenerOperarios(datos);
                setPromedios(operarios)
            } else {
                alert('Error al traer los datos del servidor')
            }
        }
        obtenerDatosFiltrados()
    }, [fechaInicio, fechaFin, tipoFruta])


    return (
        <div className="flex flex-col mb-8 w-full ">
            <div className={`w-full flex justify-center p-2 text-2xl font-bold ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                <h2>
                    Volante calidad
                </h2>
            </div>
            <div>
                <FilstrosFecha setFechaFin={setFechaFin} setFechaInicio={setFechaInicio} setTipoFruta={setTipoFruta} />
            </div>
            <div className="ml-10 mt-6 mb-[-1rem] pb-0">
                <button
                    onClick={(): void => setShowResume(!showResume)}
                    className={`${showResume ? 'z-0' : 'z-10'}
                      group relative inline-flex w-40 h-10 items-center overflow-hidden rounded
                       bg-Celifrut-green-dark px-8 py-3 text-white `
                    }
                >
                    <span className="absolute  -end-full transition-all group-hover:end-4">
                        <FaCircleArrowRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                        Resumen
                    </span>
                </button>
                <button
                    onClick={(): void => setShowResume(!showResume)}
                    className={
                        'ml-[-8rem] group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-Celifrut-green  px-8 py-3 text-white z-0 '
                    }
                >
                    <span className="absolute  -end-full transition-all group-hover:end-4">
                        <FaCircleArrowRight />
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:me-4">
                        Tabla
                    </span>
                </button>
            </div>
            {showResume ?
                <div className="m-0 p-0 z-20 ">
                    <TableResumenVolanteCalidad data={promedios} />
                </div> : <div className="m-0 p-0 z-20 ">
                    <TablaVolantecalidad data={data} />
                </div>
            }

            <div className="flex justify-center">
                <div className="w-4/6">
                    <Graficas data={promedios} />
                </div>
            </div>

        </div>

    )
}
