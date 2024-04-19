/* eslint-disable prettier/prettier */

import { useState } from "react"
import { AiFillHome } from "react-icons/ai";
import TablaLimpiezaMensual from "./components/TablaLimpiezaMensual";


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
                    <button onClick={(): void => setSeccion("recepcion")}>Área recepcion</button>
                    <button onClick={(): void => setSeccion("lavado")}>Área lavado</button>
                    <button onClick={(): void => setSeccion("produccion")}>Área Producción</button>
                    <button onClick={(): void => setSeccion("pasillo")}>Área pasillo</button>
                    <button onClick={(): void => setSeccion("cuartosFrios")}>Cuartos fríos</button>
                    <button onClick={(): void => setSeccion("carton")}>Área almacenamiento carton</button>
                    <button onClick={(): void => setSeccion("social")}>Área social</button>
                </div>}

                {seccion !== "" && <TablaLimpiezaMensual area={seccion} />}

        </div>
    )
}