import ControlPlagas from "./components/ControlPlagas";
import HigienePersonal from "./components/HigienePersonal";
import LimpiezaPostCosecha from "./components/LimpiezaPostCosecha";
import NavBarFormatos from "./utils/NavBarFormatos";
import { useState } from "react";


export default function Formatos() {

    const [seccion, setSeccion] = useState<string>('Higiene Personal')
    
  
    const handleSectionSelect = (data:string) => {
      setSeccion(data)
    }

  return (
    <div>
        <NavBarFormatos  handleSectionSelect={handleSectionSelect} />
        {seccion === 'Higiene Personal' && <HigienePersonal  />}
        {seccion === 'Control Plagas' && <ControlPlagas  />}
        {seccion === 'Inspección Postcosecha' && <LimpiezaPostCosecha  />}
    </div>
  )
}
