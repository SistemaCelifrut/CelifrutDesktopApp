/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext";
import { useEffect, useState } from "react"
import TablaCargos from "./components/TablaCargos";
import { cargoType } from "@renderer/types/cargos";
import CrearCargo from "./components/CrearCargo";

export default function Cargos(): JSX.Element {
    const { messageModal } = useAppContext();
    const [cargos, setCargos] = useState<cargoType[]>()
    const [addCargo, setAddCargo] = useState<boolean>(false);
    const [dev, setDev] = useState<cargoType>()
    useEffect(() => {
        getCargos()
    }, [])
    const getCargos = async (): Promise<void> => {
        try {
            const response = await window.api.server2({ action: "get_cargos" })
            if (response.status !== 200) throw new Error(`Code ${response.status}: ${response.message}`);
            setCargos(response.data)
            const devCargo = response.data.find(cargo => cargo.Cargo === "Dev" )
            setDev(devCargo)
        } catch (err) {
            if (err instanceof Error) {
                messageModal("error", `${err.message}`)
            }
        }
    }
    const handleChange = (): void => {
        setAddCargo(!addCargo)
    }
    return (
        <div className="componentContainer">
            <div className="navBar"></div>
            <h2>Cargos</h2>
            <hr />
            <div className='filtroContainer'>
                <div className='div-filter-actions'>
                    <button onClick={handleChange}>
                        Agregar Cargo
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M15 12h-6" /><path d="M12 9v6" /></svg>
                    </button>
                </div>
            </div>
            {addCargo ? 
            <CrearCargo  data={dev}/>
            :
            <TablaCargos data={cargos} />
            }
            
        </div>
    )
}