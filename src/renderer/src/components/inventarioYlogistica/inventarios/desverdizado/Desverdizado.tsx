/* eslint-disable prettier/prettier */
import InventarioDesverdizado from "./components/InventarioDesverdizado"
import NavBarDesverdizado from "./utils/NavBarDesverdizado"
import { memo, useState } from 'react'

const MemoizedNavBar = memo(NavBarDesverdizado);

export default function Desverdizado(): JSX.Element {
  const [filtro, setFiltro] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('')

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }
  const handleSectionSelect = (data: string): void => {
    setSeccion(data)
  }

  return (
    <div className="w-full">
      <MemoizedNavBar handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === "" &&
        <InventarioDesverdizado filtro={filtro} />}
    </div>
  )
}

