/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react"
import { controlPlagasType } from "../types/controlPlagas"
import useAppContext from "@renderer/hooks/useAppContext"
import { format } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { elemento_control_plagas_control } from "../functions/llavesControlDePlagas";
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'

export default function TableControlPlagasControl(): JSX.Element {
    const { messageModal } = useAppContext();
    const [data, setData] = useState<controlPlagasType[]>([])
    const [page, setPage] = useState<number>(1)
    const [responsable, setResponsable] = useState<string>("")
    const [area, setArea] = useState<string>("")
    const [fecha, setFecha] = useState<string>("")
    const headers = ["Responsable", "Area", "Cumple", "Obervaciones", "Acciones", "Fecha"]
    useEffect(() => {
        obtenerData()
    }, [page])
    const obtenerData = async (): Promise<void> => {
        try {
            const request = {
                collection: 'users',
                action: 'get_control_plagas_control',
                page: page,
                responsable: responsable,
                fecha: fecha,
                area: area
            }
            const response = await window.api.server(request);
            if (response.status !== 200)
                throw new Error(response.message)
            setData(response.data)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    const handleSearch = async (): Promise<void> => {
        await obtenerData()
    }
    return (
        <div className="componentContainer">
            <div className="filtroContainer">
                <label>
                    <p>Responsable</p>
                    <input type="text" placeholder="Nombre" onChange={(e): void => setResponsable(e.target.value)} />
                </label>
                <label>
                    <p>Areas</p>
                    <select onChange={(e):void => setArea(e.target.value)}>
                        <option value="" >Areas</option>
                        {Object.keys(elemento_control_plagas_control).map(llave => (
                            <option value={llave} key={llave}>{elemento_control_plagas_control[llave]}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <p>Fecha</p>
                    <input type="date" placeholder="Nombre" onChange={(e):void => setFecha(e.target.value)} />
                </label>
                <label>
                    <div>{" "}</div>
                    <button onClick={handleSearch}>Buscar</button>
                </label>
            </div>
            <table className="table-main">
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id} className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`}>
                            <td>{item.responsable}</td>
                            <td>{elemento_control_plagas_control[item.elemento]}</td>
                            <td><div>{item.cumple ? <FcOk /> : <FcCancel />}</div></td>
                            <td>{item.observaciones}</td>
                            <td>{item.acciones}</td>
                            <td>{format(new Date(item.fecha_creacion), 'dd-MM-yyyy')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="volante-calidad-button-page-div">
                <button
                    onClick={(): void => setPage(page - 1)}
                    disabled={page === 1}
                    className="volante-calidad-button-page">
                    {<IoIosArrowBack />}
                </button>
                {page}
                <button
                    onClick={(): void => setPage(page + 1)}
                    className="volante-calidad-button-page">
                    {<IoIosArrowForward />}
                </button>
            </div>
        </div>
    )
}