/* eslint-disable prettier/prettier */
import CrearCuenta from './components/CrearCuenta'
import CuentasModificar from './components/CuentasModificar'
import NavBarCuentas from './utils/NavBarCuentas'
import { useState } from 'react'

export default function Cuentas(): JSX.Element {
  const [, setFiltro] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('Cuentas')

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }

  const handleSectionSelect = (data: string): void => {
    setSeccion(data)
  }

  return (
    <div>
      <NavBarCuentas handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === 'Cuentas' && (
        <CuentasModificar />
      )}
      {seccion === 'Crear Cuenta' && (
        <CrearCuenta />
      )}
    </div>
  )
}