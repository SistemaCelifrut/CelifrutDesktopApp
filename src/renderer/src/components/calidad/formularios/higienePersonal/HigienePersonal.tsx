/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react"
import { higienePersonalType } from "./types/higienePersonal"
import useAppContext from "@renderer/hooks/useAppContext"
import "./css/styles.css"
import { format } from "date-fns";
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'
import { KEYS_ELEMENTOS } from "./functions/filtroHigienePersonal";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import FiltrosHigienePersonal from "./components/FiltrosHigienePersonal";

export default function HigienePersonal(): JSX.Element {
    const { messageModal } = useAppContext();
    const headers = ["Responsable", "Operario", "Elementos", "Fecha"]
    const [data, setData] = useState<higienePersonalType[]>([])
    const [dataOriginal, setDataOriginal] = useState<higienePersonalType[]>([])
    const [page, setPage] = useState<number>(1)
    const [filtroResponsable, setFiltroResponsable] = useState<string>('')
    const [fechaInicio, setFechaInicio] = useState<Date>(new Date(0))
    const [fechaFin, setFechaFin] = useState<Date>(new Date())
    useEffect(() => {
        obtenerData()
    }, [page, fechaInicio, fechaFin])
    useEffect(() => {
        if(filtroResponsable === '')
            setData(dataOriginal)
        else{
            const filterData: higienePersonalType[] = dataOriginal.filter(item => item.responsable.toLowerCase().startsWith(filtroResponsable.toLowerCase()))
            setData(filterData)
        }
    },[filtroResponsable])
    const obtenerData = async (): Promise<void> => {
        try {
            const request = {
                collection: 'calidad',
                action: 'getHigienePersonal',
                page: page,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
            }
            const response = await window.api.server(request)
            if (response.status !== 200)
                throw new Error(response.message)
            setData(response.data)
            setDataOriginal(response.data)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    return (
        <div className='componentContainer'>
            <div className="navBar"></div>
            <FiltrosHigienePersonal
                setFechaInicio={setFechaInicio}
                setFechaFin={setFechaFin} 
                setFiltroResponsable={setFiltroResponsable} />
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
                        <tr key={item.id} className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`}>
                            <td>{item.responsable}</td>
                            <td>{item.nombre + " " + item.apellido}</td>
                            <td className="higiene-personal-elementos-container">
                                {Object.keys(item).map(elemento => {
                                    if(elemento !== 'operario_id' && 
                                        elemento !== 'responsable' && 
                                        elemento !== 'id' &&
                                        elemento !== 'nombre' &&
                                        elemento !== 'fecha_ingreso' && 
                                        elemento !== 'apellido'){
                                        return (
                                            <div className="higiene-personal-elementos-div" key={item.id + elemento}>
                                                {KEYS_ELEMENTOS[elemento]}
                                                {item[elemento] ? <FcOk /> : <FcCancel />}
                                            </div>
                                        )
                                    }else{
                                        return null
                                    }
                                })}
                            </td>
                            <td>
                                {format(new Date(item.fecha_ingreso),'dd-MM-yy')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-page-div">
                    <button
                        onClick={(): void => setPage(page - 1)}
                        disabled={page === 1}
                        className="button-page">
                        {<IoIosArrowBack />}
                    </button>
                    {page}
                    <button
                        onClick={(): void => setPage(page + 1)}
                        className="button-page">
                        {<IoIosArrowForward />}
                    </button>
                </div>
        </div>
    )
}
