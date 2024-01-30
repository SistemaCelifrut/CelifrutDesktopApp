/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"
import FiltrosColumnas from "../utils/FiltrosColumnas"
import FiltrosFilas from "../utils/FiltrosFilas"
import { LoteDataType, filtroColumnasType, filtroType } from "../type/types"
import { filtrosColumnasObj } from "../functions/functions"
import GraficasBarras from "../utils/GraficasBarras"
import GraficaLineal from "../utils/GraficaLineal"
import GraficaCircular from "../utils/GraficaCircular"
import TableInfoLotes from "../table/TableInfoLotes"

export default function ProcesoData(): JSX.Element {
    const theme = useContext(themeContext)
    const [columnVisibility, setColumnVisibility] = useState<filtroColumnasType>(filtrosColumnasObj)
    const [filtro, setFiltro] = useState<filtroType>({ tipoFruta: '', fechaIngreso: { $gte: null, $lt: null }, rendimiento: { $gte: '', $lt: '' }, nombrePredio: '', cantidad: '' })
    const [prediosData, setPrediosData] = useState<string[]>([])
    const [ef1, setEf1] = useState<string>('')
    const [tipoGraficas, setTipoGraficas] = useState<string>('')
    const [data, setData] = useState<LoteDataType[]>([])
    const [dataOriginal, setDataOriginal] = useState<LoteDataType[]>([])

    useEffect(() => {
        const obtenerData = async (): Promise<void> => {
            if(prediosData.length === 0){
                const requestProveedor = { action: 'obtenerProveedores' }
                const response = await window.api.proceso(requestProveedor);
                const nombrePredio = await response.data.map((item) => item.PREDIO)
                 setPrediosData(nombrePredio)
            }
            const request = { action: 'obtenerDatosLotes', data: { filtros: filtro }};
            const datosLotes = await window.api.proceso(request);
            setDataOriginal(datosLotes.data)

            if (ef1 === '') {
                setData(datosLotes.data)
            }
            else if (ef1 !== '') {
                setData(() => datosLotes.data.filter(item =>item._id.toLowerCase().includes(ef1.toLowerCase())))
            }
            // const dataGrafica = datosGraficas(datosLotes.data)
            // setDataGrafica(dataGrafica)
        }
        obtenerData()
      
        
    }, [filtro, ef1])

    useEffect(() => {
        if (ef1 === '') {
            setData(dataOriginal)
        }
        else if (ef1 !== '') {
            setData(previusData => previusData.filter(item => item._id.includes(ef1.toUpperCase())))
        }
    }, [ef1])

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
        } else if (filtroCase === 'predio') {
            const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
            nuevoFiltro.nombrePredio = elementoFiltro
            setFiltro(nuevoFiltro)
        } else if (filtroCase === 'cantidad') {
            const nuevoFiltro: filtroType = JSON.parse(JSON.stringify(filtro))
            nuevoFiltro.cantidad = elementoFiltro
            setFiltro(nuevoFiltro)
        }
    }

    return (
        <div>
        <div className={`${theme === 'Dark' ? 'bg-gray-500' : 'bg-gray-200'} p-3 rounded-lg shadow-lg`}>
            <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                    text-2xl font-bold  transition-all border-b-2 duration-500 ease-in-out  hover:text-Celifrut-green hover:border-b-2  hover:border-Celifrut-green`}>
                <h2>Lotes</h2>
            </div>
            <div className="m-2">
                <FiltrosColumnas columnVisibility={columnVisibility} handleChange={handleChange} />
            </div>
            <div>
                <FiltrosFilas handleFiltro={handleFiltro} prediosData={prediosData} setEf1={setEf1} />
                <div className="m-2">

                </div>
            </div>
       
        </div>
        <select className="rounded-lg p-2 border-solid border-2 border-blue-200 mt-2" onChange={(e): void => setTipoGraficas(e.target.value)}>
                <option value="">Tipo de gráficas</option>
                <option value="barras">Grafica de barras</option>
                <option value="lineal">Grafica lineal</option>
                <option value="circular">Grafica circular</option>
            </select>
            <div className='w-full flex justify-center p-2'>
                {tipoGraficas === 'barras' && <GraficasBarras data={data}/>}
                {tipoGraficas === 'lineal' && <GraficaLineal  data={data} filtro={filtro}/>}
                {tipoGraficas === 'circular' && <GraficaCircular  data={data} />}
            </div>
            
            <div>
                <TableInfoLotes data={data} columnVisibility={columnVisibility} />
            </div>
        </div>
    )
}
