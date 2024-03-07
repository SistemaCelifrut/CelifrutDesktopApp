/* eslint-disable prettier/prettier */
import { useState } from 'react'
import FrutaSinProcesar from './components/FrutaSinProcesar'
import NavBarInventario from './utils/NavBarInventario'

export default function InventarioFrutaSinProcesar(): JSX.Element {
  const [filtro, setFiltro] = useState<string>('')


  const handleFilter = (data: string): void => {
    setFiltro(data)
  }

  return (
    <div className='w-full'>
      <NavBarInventario handleFilter={handleFilter} />
      <FrutaSinProcesar filtro={filtro}  />
    </div>
  )
}
