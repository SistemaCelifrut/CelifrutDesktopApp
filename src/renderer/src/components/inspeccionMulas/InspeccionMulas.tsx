/* eslint-disable prettier/prettier */
import FormularioMulas from './components/FormularioMulas'
import NavBarMulas from './utils/NavBarMulas'
import { useState } from 'react'

type propsType = {
  theme: string
  user: string
}

export default function InspeccionMulas(props: propsType): JSX.Element {
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
      {/* {seccion === 'Historial proceso' && (
        <HistorialProcesado user={props.user} theme={props.theme} filtro={filtro} />
      )} */}
    </div>
  )
}