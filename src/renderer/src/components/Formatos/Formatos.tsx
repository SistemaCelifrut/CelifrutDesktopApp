/* eslint-disable prettier/prettier */
import ControlPlagas from './components/ControlPlagas'
import HigienePersonal from './components/HigienePersonal'
import LimpiezaMensual from './components/LimpiezaMensual'
import LimpiezaPostCosecha from './components/LimpiezaPostCosecha'
import NavBarFormatos from './utils/NavBarFormatos'
import { useState } from 'react'

export default function Formatos(): JSX.Element {
  const [seccion, setSeccion] = useState<string>('Higiene Personal')

  const handleSectionSelect = (data: string): void => {
    setSeccion(data)
  }

  return (
    <div>
      <NavBarFormatos handleSectionSelect={handleSectionSelect} />
      {seccion === 'Higiene Personal' && <HigienePersonal />}
      {seccion === 'Control Plagas' && <ControlPlagas />}
      {seccion === 'Inspección Postcosecha' && <LimpiezaPostCosecha />}
      {seccion === 'Inspeccion Mensual' && <LimpiezaMensual />}
    </div>
  )
}
