/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext"
import { useEffect, useState } from "react"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'
import { format } from "date-fns";
import { limpiezaMensualType } from "../types/limpiezaMensual";
import { keys_limpieza_mensual_carton, keys_limpieza_mensual_cuartosFrios, keys_limpieza_mensual_lavado, keys_limpieza_mensual_pasillo, keys_limpieza_mensual_produccion, keys_limpieza_mensual_recepcion, keys_limpieza_mensual_social } from "../functions/LimpiezaMensual";

type propsType = {
    area: string
}
export default function TablaLimpiezaMensual(props: propsType): JSX.Element {
    const { messageModal } = useAppContext()
    const [data, setData] = useState<limpiezaMensualType[]>([])
    const [page, setPage] = useState<number>(1)
    const [fecha, setFecha] = useState<string>("")
    const [elemento, setElemento] = useState<string>("")
    const [listaElementos, setListaElementos] = useState<string[]>([])
    const [objetoElementos, setObjetoElementos] = useState<object>({})
    const headers = ["Responsable", "Area", "Elemento", "Cumple", "Obervaciones", "Fecha"]

    useEffect(() => { 
        obtenerDatos() 
    }, [page])
    useEffect(() => { 
        selectListaElementos() 
    }, [])
    const obtenerDatos = async (): Promise<void> => {
        try {
            const request = {
                collection: 'users',
                action: 'get_limpieza_mensual',
                area: props.area,
                page: page,
                fecha: fecha,
                elemento: elemento
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
        await obtenerDatos()
    }
    const selectListaElementos = ():void => {
        if(props.area === "recepcion"){    
            setListaElementos(Object.keys(keys_limpieza_mensual_recepcion).map(item => item))
            setObjetoElementos(keys_limpieza_mensual_recepcion)
        } else if(props.area === "lavado"){
            setListaElementos(Object.keys(keys_limpieza_mensual_lavado).map(item => item))
            setObjetoElementos(keys_limpieza_mensual_lavado)
        } else if(props.area === "produccion"){
            setListaElementos(Object.keys(keys_limpieza_mensual_produccion).map(item => item))
            setObjetoElementos(keys_limpieza_mensual_produccion)
        } else if(props.area === "pasillo"){
            setListaElementos(Object.keys(keys_limpieza_mensual_pasillo).map(item => item))
            setObjetoElementos(keys_limpieza_mensual_pasillo)
        } else if(props.area === "cuartosFrios"){
            setListaElementos(Object.keys(keys_limpieza_mensual_cuartosFrios).map(item => item))
            setObjetoElementos(keys_limpieza_mensual_cuartosFrios)
        } else if(props.area === "carton"){
            setListaElementos(Object.keys(keys_limpieza_mensual_carton).map(item => item))
            setObjetoElementos(keys_limpieza_mensual_carton)
        } else if(props.area === "social"){
            setListaElementos(Object.keys(keys_limpieza_mensual_social).map(item => item))
            setObjetoElementos(keys_limpieza_mensual_social)
        } 
    }
    return (
        <div className="componentContainer">
              <div className="filtroContainer">
                <label>
                    <p>Elementos</p>
                    <select onChange={(e):void => setElemento(e.target.value)}>
                        <option value="" ></option>
                        {listaElementos.map(llave => (
                            <option value={llave} key={llave}>{objetoElementos[llave]}</option>
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
                            <td>{item.area}</td>
                            <td>{objetoElementos[item.elemento]}</td>
                            <td><div>{item.cumple ? <FcOk /> : <FcCancel />}</div></td>
                            <td>{item.observaciones}</td>
                            <td>{format(new Date(item.fecha_ingreso), 'dd-MM-yyyy')}</td>
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