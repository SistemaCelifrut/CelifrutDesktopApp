/* eslint-disable prettier/prettier */
import { useState } from "react"
import NavBarLotes from "./utils/NavBarLotes"
import ProcesoData from "./components/ProcesoData"
import CalidadData from "./components/CalidadData"

export default function Lotes(): JSX.Element {
    const [seccion, setSeccion] = useState<string>('Proceso')

    const handleSectionSelect = (data: string): void => {
        console.log(seccion)
        setSeccion(data)
    }
    return (
        <div className="p-2 flex flex-col gap-4">
            <NavBarLotes handleSectionSelect={handleSectionSelect} />
            {seccion === 'Proceso' && <ProcesoData />}
            {seccion === 'Calidad' && <CalidadData />}
        </div>
    )
}
