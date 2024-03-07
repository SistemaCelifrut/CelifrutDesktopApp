/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"

export default function VariablesProceso(): JSX.Element {
    const theme = useContext(themeContext);
    const [kilosVaciadosHoy, setKilosVaciadosHoy] = useState<number>(0);
    const [kilosProcesadosHoy, setKilosProcesadosHoy] = useState<number>(0);
    const [predioProcesando, setPredioProcesando] = useState<string>('')
    const [nombrePredio, setNombrePredio] = useState<string>('')
    const [horaInicio, setHoraInicio] = useState<string>('')
    useEffect(()=>{
        const request = async (): Promise<void> => {
            try{
                const request = {
                    collection: 'variablesDesktop',
                    action: 'obtenerEF1Sistema',
                    query: 'variablesDelProceso'
                }
                const response = await window.api.server(request)
                setKilosVaciadosHoy(Number(response.kilosVaciadosHoy))
                setKilosProcesadosHoy(Number(response.kilosProcesadosHoy))
                setPredioProcesando(response.predioProcesando.enf)
                setNombrePredio(response.predioProcesando.nombrePredio)
                setHoraInicio(response.inicioProceso)
                console.log(response);
            } catch (e){
                console.log(e);
            }
        }
        request();
    },[])
  return (
    <div className="p-5 flex flex-col justify-start w-full">
        <div className="p-5 flex justify-start flex-row">
            <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold`}>
                Kilos vaciados hoy: {kilosVaciadosHoy} Kg
            </p>
            <p className={`${theme === 'Dark' ? 'text-white' : 'text-black'} font-bold ml-5`}>
                Kilos procesados hoy: {kilosProcesadosHoy} Kg
            </p>
        </div>
        <div className=" justify-start flex flex-row gap-4">
            <p>Predio procesando:</p>
            {predioProcesando}
            <p>Nombre predio:</p>
            {nombrePredio}
        </div>
        <div className=" justify-start flex flex-row gap-4">
            <p>Inicio proceso:</p>
            {new Date(horaInicio).toLocaleString()}

        </div>
  </div>
  )
}
