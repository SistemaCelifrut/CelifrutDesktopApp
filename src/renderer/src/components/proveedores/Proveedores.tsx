/* eslint-disable prettier/prettier */

import { useState } from "react";
import NavBarProveedores from "./utils/NavBarProveedores";
import ProveedoresLista from "./components/ProveedoresLista";
import InfoPredios from "./components/InfoPredios";

export default function Proveedores(): JSX.Element {
    const [seccion, setSeccion] = useState<string>('Proveedores')

    const handleSectionSelect = (data: string): void => {
        console.log(seccion)
        setSeccion(data)
    }
    return (
        <div className="p-1">
            <div>
                <NavBarProveedores handleSectionSelect={handleSectionSelect} />
            </div>
            <div>
                {seccion === "Proveedores" &&   <ProveedoresLista />}
                {seccion === "infoPredios" &&   <InfoPredios />}
              
            </div>
        </div>
    )
}
