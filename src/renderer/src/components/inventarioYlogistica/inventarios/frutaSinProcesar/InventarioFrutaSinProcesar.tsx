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
    <div className='componentContainer'>
      <NavBarInventario handleFilter={handleFilter} />
      <h2>Fruta sin procesar</h2>
      <FrutaSinProcesar filtro={filtro}  />
    </div>
  )
}
