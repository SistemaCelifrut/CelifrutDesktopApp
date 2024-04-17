/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext"
import { useEffect, useState } from "react"
import { limpiezaPostCosechaType } from "../types/limpiezaPostCosecha"
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'
import { format } from "date-fns";
import { keys_limpieza_postcosecha_almacenamiento, keys_limpieza_postcosecha_comunes, keys_limpieza_postcosecha_insumos, keys_limpieza_postcosecha_laboratorio, keys_limpieza_postcosecha_lavado, keys_limpieza_postcosecha_proceso, keys_limpieza_postcosecha_recepcion, keys_limpieza_postcosecha_servicios, keys_limpieza_postcosecha_social } from "../functions/functions";

type propsType = {
    area: string
}
export default function TablaLimpiezaPostCosecha(props: propsType): JSX.Element {
    const { messageModal } = useAppContext()
    const [data, setData] = useState<limpiezaPostCosechaType[]>([])
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
                action: 'get_limpieza_post_cosecha',
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
        if(props.area === "social"){    
            setListaElementos(Object.keys(keys_limpieza_postcosecha_social).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_social)
        } else if(props.area === "recepcion"){
            setListaElementos(Object.keys(keys_limpieza_postcosecha_recepcion).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_recepcion)
        } else if(props.area === "lavado"){
            setListaElementos(Object.keys(keys_limpieza_postcosecha_lavado).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_lavado)
        } else if(props.area === "proceso"){
            setListaElementos(Object.keys(keys_limpieza_postcosecha_proceso).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_proceso)
        } else if(props.area === "insumos"){
            setListaElementos(Object.keys(keys_limpieza_postcosecha_insumos).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_insumos)
        } else if(props.area === "laboratorio"){
            setListaElementos(Object.keys(keys_limpieza_postcosecha_laboratorio).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_laboratorio)
        } else if(props.area === "almacenamiento"){
            setListaElementos(Object.keys(keys_limpieza_postcosecha_almacenamiento).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_almacenamiento)
        } else if(props.area === "servicios"){
            setListaElementos(Object.keys(keys_limpieza_postcosecha_servicios).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_servicios)
        } else if(props.area === "comunes"){
            setListaElementos(Object.keys(keys_limpieza_postcosecha_comunes).map(item => item))
            setObjetoElementos(keys_limpieza_postcosecha_comunes)
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