/* eslint-disable prettier/prettier */

import { useState } from "react"
import { AiFillHome } from "react-icons/ai";
import TablaLimpiezaPostCosecha from "./components/TablaLimpiezaPostCosecha";


export default function LimpiezaPostCosecha(): JSX.Element {
    const [seccion, setSeccion] = useState<string>('');
    return (
        <div className="componentContainer">
            <div className="navBar">
                {seccion !== '' &&
                    <button onClick={(): void => setSeccion("")} className="navBar-menuButton">
                        <AiFillHome />
                    </button>
                }
            </div>
            {seccion === "" &&
                <div className="control-plagas-menu-div">
                    <button onClick={(): void => setSeccion("social")}>Area social</button>
                    <button onClick={(): void => setSeccion("recepcion")}>Recepción</button>
                    <button onClick={(): void => setSeccion("lavado")}>Lavado</button>
                    <button onClick={(): void => setSeccion("proceso")}>Proceso</button>
                    <button onClick={(): void => setSeccion("insumos")}>Insumos</button>
                    <button onClick={(): void => setSeccion("laboratorio")}>Laboratoeio</button>
                    <button onClick={(): void => setSeccion("almacenamiento")}>Almacenamiento</button>
                    <button onClick={(): void => setSeccion("servicios")}>Servicios sanitarios</button>
                    <button onClick={(): void => setSeccion("comunes")}>Areas comunes</button>
                </div>}

            {seccion !== "" && <TablaLimpiezaPostCosecha area={seccion} />}

        </div>
    )
}