/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"
import Acciones from "./Acciones"
import IngresarProveedor from "../forms/IngresarProveedor"
import TableProveedores from "../table/TableProveedores"
import { serverResponse } from "@renderer/env"
import { proveedoresType } from "@renderer/types/proveedoresType"

export default function ProveedoresLista(): JSX.Element {
    const theme = useContext(themeContext)
    const [filtro, setFiltro] = useState<string>('')
    const [isModificar, setIsModificar] = useState<boolean>(false)
    const [showFormulario, setShowFormulario] = useState<boolean>(false)
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState<proveedoresType>()
    const [dataOriginal, setDataOriginal] = useState<proveedoresType[]>([])
    const [data, setData] = useState<proveedoresType[]>([])
    const [render, setRender] = useState<boolean>(false)


    useEffect(() => {
        const obtenerProveedores = async (): Promise<void> => {
            const request = {
                data:{
                  query:{},
                },
                collection:'proveedors',
                action: 'obtenerProveedores',
                query: 'proceso'
              };
            const response: serverResponse<proveedoresType[]> = await window.api.server(request);
            if (Array.isArray(response.data)) {
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
        if (tipoAccion === 'agregar') {
            setIsModificar(false)
        } else if (tipoAccion === 'modificar') {
            setIsModificar(true)
        }
        setShowFormulario(!showFormulario)
    }
    return (
        <div className="p-2">
            <div className="flex justify-center mt-3 text-2xl font-bold">
                <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Proveedores</h2>
            </div>
            <div>
                <Acciones setFiltro={setFiltro} handleBotonAgregar={handleBotonAgregar} showFormulario={showFormulario} />
            </div>
            <div >
                {showFormulario ? <IngresarProveedor setRender={setRender} proveedorSeleccionado={proveedorSeleccionado} setShowFormulario={setShowFormulario} isModificar={isModificar} /> : 
                <TableProveedores setRender={setRender} data={data} setProveedorSeleccionado={setProveedorSeleccionado} handleBotonAgregar={handleBotonAgregar} />}
            </div>
        </div>
    )
}
