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
        if (filtro !== '') {
            const dataFilter = dataOriginal.filter(
                item => item.PREDIO?.toLowerCase().startsWith(filtro.toLowerCase())
                    || item["CODIGO INTERNO"]?.startsWith(filtro))
            setData(dataFilter)
        } else {
            setData(dataOriginal)
        }
    }, [filtro])
    useEffect(() => {
        obtenerProveedores()
        window.api.reload(() => {
            obtenerProveedores()
        });
        return () => {
            window.api.removeReload()
        }
    }, [])
    const obtenerProveedores = async (): Promise<void> => {
        try {
            const request = {
                action: 'getProveedores',
            };
            const response = await window.api.server2(request);
            if (response.status !== 200)
                throw new Error(response.message)
            setData(response.data)
            setDataOriginal(response.data)
            console.log(response)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
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
            <h2>Proveedores</h2>
            <hr />
            <div className='filtroContainer'>
                <div className='div-filter-actions'>
                    <button onClick={handleChange}>
                        { opciones === "agregar" ? "Volver" : "Agregar Proveedor"}
                        {opciones === "agregar" ? 
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 14l-4 -4l4 -4" /><path d="M8 14l-4 -4l4 -4" /><path d="M9 10h7a4 4 0 1 1 0 8h-1" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
                        }
                        </button>
                    <input type="text" placeholder='Buscar...' onChange={(e): void => setFiltro(e.target.value)} />
                </div>
            </div>

            {opciones === "inicio" &&
                <TableProveedores 
                    data={data} 
                    handleModificar={handleModificar} 
                    obtenerProveedores={obtenerProveedores} 
                />}

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
