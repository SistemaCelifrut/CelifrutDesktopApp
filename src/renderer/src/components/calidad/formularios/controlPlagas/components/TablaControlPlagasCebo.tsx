/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext";
import { useEffect, useState } from "react";
import { controlPlagasType } from "../types/controlPlagas";
import { format } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'

export default function TableControlPlagasCebo(): JSX.Element {
    const { messageModal } = useAppContext();
    const [data, setData] = useState<controlPlagasType[]>([])
    const [page, setPage] = useState<number>(1)
    const [responsable, setResponsable] = useState<string>("")
    const [fecha, setFecha] = useState<string>("")

    useEffect(() => {
        obtenerData()
    }, [page])
    const headers = ["Responsable", "Area", "Cumple", "Obervaciones", "Acciones", "Fecha"]
    const obtenerData = async (): Promise<void> => {
        try {
            const request = {
                collection: 'users',
                action: 'get_control_plagas_cebo',
                page: page,
                responsable: responsable,
                fecha: fecha,
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
                    <p>Fecha</p>
                    <input type="date" placeholder="Nombre" onChange={(e): void => setFecha(e.target.value)} />
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
                            <td>{item.elemento}</td>
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