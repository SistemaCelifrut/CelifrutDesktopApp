/* eslint-disable prettier/prettier */

import { useState } from "react"
import "./css/styles.css"
import TableControlPlagasControl from "./components/TablaControlPlagasControl";
import TablaControlPlagasCebo from "./components/TablaControlPlagasCebo";
import { AiFillHome } from "react-icons/ai";
import TablaControlPlagasHallazgos from "./components/TablaControlPlagasHallazgos";


export default function ControlPlagas(): JSX.Element {
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
            <h2>Historial control de plagas</h2>
            {seccion === "" &&
                <div className="control-plagas-menu-div">
                    <button onClick={(): void => setSeccion("control")}>Control</button>
                    <button onClick={(): void => setSeccion("cebo")}>Cebo</button>
                    <button onClick={(): void => setSeccion("hallazgos")}>Hallazgos</button>
                </div>}
            {seccion === "control" && <TableControlPlagasControl />}
            {seccion === "cebo" && <TablaControlPlagasCebo />}
            {seccion === "hallazgos" && <TablaControlPlagasHallazgos />}
        </div>
    )
}