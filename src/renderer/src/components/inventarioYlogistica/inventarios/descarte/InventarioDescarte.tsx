/* eslint-disable prettier/prettier */
import InventarioDescartes from "./components/InventarioDescartes"
import NavBarDescartes from "./utils/NavBarDescartes"
import { useState } from 'react'
import "./css/styles.css"

export default function InventarioDescarte(): JSX.Element {
  const [filtro, setFiltro] = useState<string>('')

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }

  return (
    <div className='componentContainer'>
      <NavBarDescartes handleFilter={handleFilter} />
      <InventarioDescartes filtro={filtro} />
    </div>
  )
}
