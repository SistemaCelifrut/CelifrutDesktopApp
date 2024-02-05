/* eslint-disable prettier/prettier */
import HistorialFormularioVehiculos from './components/HistorialFormularioVehiculos'
import NavBarHistorial from './utils/NavBarHistorial'
import { useState } from 'react'

export default function HistorialVehiculos(): JSX.Element {
  const [, setFiltro] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('Historial Formulario Vehiculos')

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }

  const handleSectionSelect = (data: string): void => {
    setSeccion(data)
  }

  return (
    <div className='w-full'>
      <NavBarHistorial handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === 'Historial Formulario Vehiculos' && (
        <HistorialFormularioVehiculos />
      )}
    </div>
  )
}