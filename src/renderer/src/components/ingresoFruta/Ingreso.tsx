/* eslint-disable prettier/prettier */
import HistorialIngreso from './components/HistorialIngreso'
import IngresoFruta from './components/IngresoFruta'
import NavBarIngreso from './utils/NavBarIngreso'
import { useState } from 'react'



export default function InspeccionMulas(): JSX.Element {
  const [, setFiltro] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('Ingreso de fruta')

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }

  const handleSectionSelect = (data: string): void => {
    setSeccion(data)
  }

  return (
    <div>
      <NavBarIngreso handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === 'Ingreso de fruta' && (
        <IngresoFruta />
      )}
      {seccion === 'Historial Ingreso' && (
        <HistorialIngreso />
      )}
    </div>
  )
}