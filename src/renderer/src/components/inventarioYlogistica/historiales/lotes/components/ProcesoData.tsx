/* eslint-disable prettier/prettier */

import { dataContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"
import FiltrosColumnas from "../utils/FiltrosColumnas"
import FiltrosFilas from "../utils/FiltrosFilas"
import { filtroColumnasType, filtroType } from "../type/types"
import { filtrosColumnasObj } from "../functions/functions"
import GraficasBarras from "../utils/GraficasBarras"
import GraficaLineal from "../utils/GraficaLineal"
import GraficaCircular from "../utils/GraficaCircular"
import TableInfoLotes from "../table/TableInfoLotes"
import PromediosProceso from "../utils/PromediosProceso"
import { crear_filtro } from "../functions/filtroProceso"
import { lotesType } from "@renderer/types/lotesType"
import useAppContext from "@renderer/hooks/useAppContext"
import { requestLotes, requestProveedor } from "../functions/request"
import TotalesProceso from "../utils/TotalesProceso"

export default function ProcesoData(): JSX.Element {
    const { messageModal } = useAppContext();
    const dataGlobal = useContext(dataContext);
    if (!dataGlobal) {
        throw new Error("Error informes context data global")
    }
    const [columnVisibility, setColumnVisibility] = useState<filtroColumnasType>(filtrosColumnasObj)
    const [filtro, setFiltro] = useState<filtroType>({ tipoFruta: '', fechaIngreso: { $gte: null, $lt: null }, rendimiento: { $gte: '', $lt: '' }, nombrePredio: '', cantidad: '' })
    const [prediosData, setPrediosData] = useState<string[]>([])
    const [ef1, setEf1] = useState<string>(dataGlobal.dataComponentes)
    const [tipoGraficas, setTipoGraficas] = useState<string>('')
    const [data, setData] = useState<lotesType[]>([])
    const [dataOriginal, setDataOriginal] = useState<lotesType[]>([])
    const [filtroPredio, setFiltroPredio] = useState<string>('');
    const [cantidad, setCantidad] = useState<number>(50);

    useEffect(() => {
        obtenerData()
        window.api.serverEmit('serverEmit', handleServerEmit)
        // Función de limpieza
        return () => {
            window.api.removeServerEmit('serverEmit', handleServerEmit)
        }
    }, [filtro, cantidad])

    useEffect(() => {
        let filteredData = dataOriginal;

        if (ef1 !== '') {
            filteredData = filteredData.filter(item => item.enf && item.enf.startsWith(ef1.toUpperCase()));
        }

        if (filtroPredio !== '') {
            filteredData = filteredData.filter(item => item.predio?.PREDIO && item.predio?.PREDIO.includes(filtroPredio));
        }

        setData(filteredData);
    }, [ef1, filtroPredio])

    const obtenerData = async (): Promise<void> => {
        try {
            if (prediosData.length === 0) {
                const response = await window.api.server(requestProveedor);
                const nombrePredio = await response.data.map((item) => item.PREDIO)
                setPrediosData(nombrePredio)
            }
            const filtro_request = crear_filtro(filtro);
            const request = requestLotes(filtro_request, cantidad)
            const datosLotes = await window.api.server(request);
            setDataOriginal(datosLotes.data)
            if (ef1 === '') {
                setData(datosLotes.data)
            }
            else if (ef1 !== '') {
                setData(() => datosLotes.data.filter(item => item._id.toLowerCase().includes(ef1.toLowerCase())))
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                messageModal("error", `Error: ${e.message}`);
            }
        }
    }
    const handleServerEmit = async (data): Promise<void> => {
        if (data.fn === "vaciado" || data.fn === "ingresoLote" || data.fn === "procesoLote" || data.fn === "descartesToDescktop") {
            await obtenerData()
        }
    }
    const handleChange = (e): void => {
        setColumnVisibility({
            ...columnVisibility,
            [e.target.value]: e.target.checked,
        });
    }
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
        } else if (filtroCase === 'minRendimiento') {
            const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
            nuevoFiltro.rendimiento.$gte = elementoFiltro
            setFiltro(nuevoFiltro)
        } else if (filtroCase === 'maxRendimiento') {
            const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
            nuevoFiltro.rendimiento.$lt = elementoFiltro
            setFiltro(nuevoFiltro)
        }
    }

    return (
        <div className="componentContainer">
            <div>
                <h2>Lotes proceso</h2>
            </div>
            <div className="filtroContainer">
                <div>
                    <FiltrosColumnas columnVisibility={columnVisibility} handleChange={handleChange} />
                </div>
                <div>
                    <FiltrosFilas
                        handleFiltro={handleFiltro}
                        prediosData={prediosData}
                        setEf1={setEf1}
                        setFiltroPredio={setFiltroPredio}
                        setCantidad={setCantidad}
                    />
                    <div className="m-2">
                    </div>
                </div>

            </div>
            <div>
                <PromediosProceso data={data} columnVisibility={columnVisibility} />
            </div>

            <div className="lotes-select-tipo-grafica-div">
                <select className="defaultSelect" onChange={(e): void => setTipoGraficas(e.target.value)}>
                    <option value="">Tipo de gráficas</option>
                    <option value="barras">Grafica de barras</option>
                    <option value="lineal">Grafica lineal</option>
                    <option value="circular">Grafica circular</option>
                </select>
            </div>
            <div className="lotes-grafica-container">
                {tipoGraficas === 'barras' && <GraficasBarras data={data} />}
                {tipoGraficas === 'lineal' && <GraficaLineal data={data} filtro={filtro} />}
                {tipoGraficas === 'circular' && <GraficaCircular data={data} />}
            </div>
            <div>
                <TotalesProceso data={data} columnVisibility={columnVisibility} />
            </div>

            <div>
                <TableInfoLotes data={data} columnVisibility={columnVisibility} />
            </div>
        </div>
    )
}
