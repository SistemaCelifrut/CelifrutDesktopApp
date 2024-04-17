/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import IngresarOperario from "./components/IngresarOperario";
import { operariosType } from "@renderer/types/operariosType";
import useAppContext from "@renderer/hooks/useAppContext";
import TablaOperarios from "./components/TablaOperarios";

export default function Operario(): JSX.Element {
    const { messageModal } = useAppContext()
    const [dataOriginal, setDataOriginal] = useState<operariosType[]>([])
    const [data, setData] = useState<operariosType[]>([]);
    const [opciones, setOpciones] = useState<string>('inicio')
    const [modificar, setModificar] = useState<boolean>(false)
    const [operario, setOperario] = useState<operariosType>()
    const [filtro, setFiltro] = useState<string>('')

    useEffect(() => { obtenerData() }, [])
    const obtenerData = async (): Promise<void> => {
        try {
            const request = { collection: 'users', action: 'getOperarios' }
            const response = await window.api.server(request);
            if (response.status !== 200)
                throw new Error(response.message)
            setData(response.data)
            setDataOriginal(response.data)
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message);
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
    const handleModificar = (operario): void => {
        setOpciones("agregar")
        setModificar(true)
        setOperario(operario)
    }
    return (
        <div className="componentContainer">
            <div className="navBar"></div>
            <h2>Operarios</h2>
            <hr />
            <div className='filtroContainer'>
                <div className='div-filter-actions'>
                    <button onClick={handleChange}>
                        Agregar operario
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
                    </button>
                    <input type="text" value={filtro} placeholder='Buscar...' onChange={(e): void => setFiltro(e.target.value)} />
                </div>
            </div>
            <div>
                {opciones === "inicio" &&
                    <TablaOperarios 
                        handleModificar={handleModificar}
                        operarios={data}
                    />}

                {opciones === "agregar" &&
                    <IngresarOperario />
                }
            </div>

        </div>
    )
}