/* eslint-disable prettier/prettier */

import useAppContext from "@renderer/hooks/useAppContext";
import { useEffect, useState } from "react";
import TableProveedores from "./components/TablaProveedores";
import { proveedoresType } from "@renderer/types/proveedoresType";
import AgregarProveedor from "./components/AgregarProveedor";

export default function Proveedores(): JSX.Element {
    const { messageModal } = useAppContext()
    const [data, setData] = useState<proveedoresType[]>([])
    const [filtro, setFiltro] = useState<string>('')
    const [dataOriginal, setDataOriginal] = useState<proveedoresType[]>([])
    const [opciones, setOpciones] = useState<string>('inicio')
    const [modificar, setModificar] = useState<boolean>(false)
    const [proveedor, setProveedor] = useState<proveedoresType>()
    useEffect(() => {
        obtenerProveedores()
        window.api.serverEmit('serverEmit', handleServerEmit)

        // Función de limpieza
        return () => {
            window.api.removeServerEmit('serverEmit', handleServerEmit)
        }
    }, [])
    useEffect(() => {
        if(filtro !== ''){
            const dataFilter = dataOriginal.filter(
                item => item.PREDIO?.toLowerCase().startsWith(filtro.toLowerCase())
                        || item["CODIGO INTERNO"]?.startsWith(filtro))
            setData(dataFilter)
        }else{
            setData(dataOriginal)
        }
    }, [filtro])
    const obtenerProveedores = async (): Promise<void> => {
        try {
            const request = {
                data: {
                    query: {},
                },
                collection: 'proveedors',
                action: 'obtenerProveedores',
                query: 'proceso'
            };
            const response = await window.api.server(request);
            if (response.status !== 200)
                throw new Error(response.message)
            setData(response.data)
            setDataOriginal(response.data)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    const handleServerEmit = async (data): Promise<void> => {
        if (data.fn === "cambio-proveedor") {
            await obtenerProveedores()
        }
    }
    const handleChange = (): void => {
        if (opciones === "inicio") {
            setOpciones("agregar")
            setModificar(false)
        }
        else if (opciones === "agregar")
            setOpciones("inicio")
    }
    const handleModificar = (proveedorInfo): void => {
        setOpciones("agregar")
        setModificar(true)
        setProveedor(proveedorInfo)
    }
    return (
            <div className="componentContainer">
                <div className="navBar"></div>
                <h2>Cuentas</h2>
                <hr />
                <div className='filtroContainer'>
                    <div className='div-filter-actions'>
                        <button onClick={handleChange}>
                            Agregar Proveedor
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
                        </button>
                        <input type="text" placeholder='Buscar...' onChange={(e): void => setFiltro(e.target.value)} />
                    </div>
                </div>

                {opciones === "inicio" &&
                    <TableProveedores data={data}  handleModificar={handleModificar}/>}

                {opciones === "agregar" &&
                    <AgregarProveedor
                        proveedor={proveedor}
                        handleChange={handleChange}
                        modificar={modificar}
                    />
                }

            </div>


    )
}
