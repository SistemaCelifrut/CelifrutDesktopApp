/* eslint-disable prettier/prettier */
import HistorialFormulario from './components/HistorialFormulario'
import FormularioMulas from './components/FormularioMulas'
import NavBarMulas from './utils/NavBarMulas'
import { useState } from 'react'



export default function InspeccionMulas(): JSX.Element {
  const [filtro, setFiltro] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('Formulario Mulas')

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }

  const handleSectionSelect = (data: string): void => {
    setSeccion(data)
  }

  return (
    <div>
      <NavBarMulas handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === 'Formulario Mulas' && (
        <FormularioMulas />
      )}
      {seccion === 'Historial Formulario' && (
        <HistorialFormulario />
      )}
    </div>
  )
}