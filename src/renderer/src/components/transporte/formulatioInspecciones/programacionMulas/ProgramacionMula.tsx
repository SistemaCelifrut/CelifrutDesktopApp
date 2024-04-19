/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import useAppContext from "@renderer/hooks/useAppContext";
import { request } from "./functions/request";
import FormularioProgramacionMula from "./components/FormularioProgramacionMula";
import { contenedoresType } from "@renderer/types/contenedoresType";
import TablaProgramacionMula from "./components/TablaProgramacionMula";


export default function ProgramacionMula(): JSX.Element {
    const { messageModal } = useAppContext()
    const [data, setData] = useState<contenedoresType[]>([])
    const [dataToFormulario, setDataToFormulario] = useState<contenedoresType[]>([])
    const [opciones, setOpciones] = useState<string>('agregar')
    const [modificar, setModificar] = useState<boolean>(false)
    const [contenedor, setContenedor] = useState<contenedoresType>()
    useEffect(() => {
        obtenerContenedores()
        window.api.serverEmit('serverEmit', handleServerEmit)

        // Función de limpieza
        return () => {
            window.api.removeServerEmit('serverEmit', handleServerEmit)
        }
    }, [])
    const obtenerContenedores = async (): Promise<void> => {
        try {
          const response = await window.api.server(request);
          if (response.status !== 200) {
            throw new Error(response.message);
          }
          const contenedoresFilter = response.data.filter(item => !Object.prototype.hasOwnProperty.call(item, "formularioInspeccionMula"))
          const contenedoresFilterTabla = response.data.filter(item => Object.prototype.hasOwnProperty.call(item, "formularioInspeccionMula"))
          setData(contenedoresFilterTabla);

          setDataToFormulario(contenedoresFilter)
    
        } catch (e) {
          if (e instanceof Error) {
            messageModal("error", e.message)
          }
        }
      };
    const handleServerEmit = async (data): Promise<void> => {
        if (data.fn === "cambio-cliente") {
            await obtenerContenedores()
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
    const handleModificar = (contendorInfo): void => {
        setOpciones("agregar")
        setModificar(true)
        setContenedor(contendorInfo)
    }
    return (

        <div className="componentContainer">
            <div className="navBar"></div>
            <h2>Programación Tractomula</h2>
            <hr />
            <div className='filtroContainer'>
            <div className='div-filter-actions'>
                        <button onClick={handleChange}>
                            Ver programaciones
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
                        </button>
                    </div>
            </div>
            <div>
            {opciones === "agregar" &&
                        <FormularioProgramacionMula
                            contenedor={contenedor}
                            contenedores={dataToFormulario}
                            handleChange={handleChange}
                            modificar={modificar}
                        />}
                        {opciones === "inicio" &&
                        <TablaProgramacionMula 
                            handleModificar={handleModificar}
                            contenedores={data}
                        />}
            </div>
        </div>
    )
}
