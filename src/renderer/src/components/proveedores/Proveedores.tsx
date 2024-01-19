/* eslint-disable prettier/prettier */

import { useContext, useEffect, useState } from "react";
import Acciones from "./components/Acciones";
import { themeContext } from "@renderer/App";
import { proveedoresType, serverResponse } from "./type/type";
import TableProveedores from "./table/TableProveedores";
import IngresarProveedor from "./forms/IngresarProveedor";
import { predioInicial } from "./functions/functions";

export default function Proveedores(): JSX.Element {
    const theme = useContext(themeContext)
    const [data, setData] = useState<proveedoresType[]>([])
    const [dataOriginal, setDataOriginal] = useState<proveedoresType[]>([])
    const [filtro, setFiltro] = useState<string>('')
    const [showFormulario, setShowFormulario] = useState<boolean>(false)
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<proveedoresType>(predioInicial)
    const [isModificar, setIsModificar] = useState<boolean>(false)
    const [render, setRender] = useState<boolean>(false)

    useEffect(() => {
        const obtenerProveedores = async (): Promise<void> => {
            const request = { action: 'obtenerProveedores' }
            const response: serverResponse<proveedoresType[]> = await window.api.proceso(request);
            if (Array.isArray(response.data)) {
                setDataOriginal(response.data)
                setData(response.data)
            } else {
                alert('Error con los datos de los predios')
            }
        }
        obtenerProveedores()
    }, [])
    useEffect(() => {
        const obtenerProveedores = async (): Promise<void> => {
            const request = { action: 'obtenerProveedores' }
            const response: serverResponse<proveedoresType[]> = await window.api.proceso(request);
            if (Array.isArray(response.data)) {
                setProveedorSeleccionado(predioInicial)
                setDataOriginal(response.data)
                setData(response.data)
            } else {
                alert('Error con los datos de los predios')
            }
        }
        obtenerProveedores()
    }, [render])
    useEffect(() => {
        setData(dataOriginal.filter(item => item.PREDIO.toLowerCase().includes(filtro)))
        console.log(data)
    }, [filtro])
    const handleBotonAgregar = (tipoAccion: string): void => {
        if(tipoAccion === 'agregar'){
            setIsModificar(false)
            setProveedorSeleccionado(predioInicial)
        } else if(tipoAccion === 'modificar') {
            setIsModificar(true)
        }
        setShowFormulario(!showFormulario)
    }
    return (
        <div className="p-1">
            <div className="flex justify-center mt-3 text-2xl font-bold">
                <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Proveedores</h2>
            </div>
            <div className="p-2">
                <Acciones setFiltro={setFiltro} handleBotonAgregar={handleBotonAgregar} showFormulario={showFormulario} />
            </div>
            <div >
                {showFormulario ? <IngresarProveedor setRender={setRender} proveedorSeleccionado={proveedorSeleccionado} setShowFormulario={setShowFormulario} isModificar={isModificar} /> : 
                <TableProveedores setRender={setRender} data={data} setProveedorSeleccionado={setProveedorSeleccionado} handleBotonAgregar={handleBotonAgregar} />}
            </div>
        </div>
    )
}
