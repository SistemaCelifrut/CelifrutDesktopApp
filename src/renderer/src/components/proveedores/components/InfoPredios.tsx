/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"
import TableResumenInfoPredios from "../table/TableResumenInfoPredios"
import FiltrosInformacionPredios from "../utils/FiltrosInformacionPredios";

type propsType = {
    setShowSuccess: (e) => void 
    setShowError: (e) => void
    setMessage: (e) => void
}

export default function InfoPredios(props:propsType): JSX.Element {
    const theme = useContext(themeContext)
    const [prediosData, setPrediosData] = useState<string[]>([])
    const [showSpiner, setShowSpiner] = useState<boolean>(false)
    const [filtro, setFiltro] = useState({})

    useEffect(() => {
        const obtenerDataResumen = async (): Promise<void> => {
            try{
                setShowSpiner(true)
                if(prediosData.length === 0){
                    const requestProveedor = { action: 'obtenerProveedores' }
                    const response = await window.api.proceso(requestProveedor);
                    const nombrePredio = await response.data.map((item) => item.PREDIO)
                     setPrediosData(nombrePredio)
                }
                const request = { action: 'obtenerDataPrediosInfo', data: { filtros: filtro }};
                const datosLotes = await window.api.proceso(request);
            } catch(e) {
                props.setShowError(true)
                props.setMessage("Error obteniendo los datos del servidor")
                setInterval(() => {
                  props.setShowError(false)
                }, 5000)
            } finally{
                setShowSpiner(false)
            }
  
        }
        obtenerDataResumen()
    }, []);

    const handleFiltro = (filtroCase, elementoFiltro): void => {
    }
    return (
        <div className="mt-4 z-10">
            <div className={`${theme === 'Dark' ? 'bg-gray-500' : 'bg-gray-200'} p-3 rounded-lg shadow-lg z-0`}>
                <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                     text-2xl font-bold `}>
                    <p className="z-0 z-">Información Predios</p>
                </div>
                <div>
                    <FiltrosInformacionPredios prediosData={prediosData} handleFiltro={handleFiltro}/>
                </div>
            </div>
        <div>
            <TableResumenInfoPredios showSpiner={showSpiner} />
        </div>
        </div>
    )
}
