/* eslint-disable prettier/prettier */

import { useContext, useEffect, useState } from "react";
import Acciones from "./components/Acciones";
import { themeContext } from "@renderer/App";
import { proveedoresType, serverResponse } from "./type/type";
import TableProveedores from "./table/TableProveedores";
import IngresarProveedor from "./forms/IngresarProveedor";

export default function Proveedores(): JSX.Element {
    const theme = useContext(themeContext)
    const [data, setData] = useState<proveedoresType[]>([])
    const [dataOriginal, setDataOriginal] = useState<proveedoresType[]>([])
    const [filtro, setFiltro] = useState<string>('')
    const [showFormulario, setShowFormulario] = useState<boolean>(false)
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
        setData(dataOriginal.filter(item => item.PREDIO.toLowerCase().includes(filtro)))
        console.log(data)
    }, [filtro])
    const handleBotonAgregar = (): void => {
        setShowFormulario(!showFormulario)
    }
    return (
        <div className="p-1">
            <div className="flex justify-center mt-3 text-2xl font-bold">
                <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Proveedores</h2>
            </div>
            <div className="p-2">
                <Acciones setFiltro={setFiltro} handleBotonAgregar={handleBotonAgregar} showFormulario={showFormulario}/>
            </div>
            <div >
                {showFormulario ? <IngresarProveedor /> : <TableProveedores data={data} />}
            </div>
        </div>
    )
}
