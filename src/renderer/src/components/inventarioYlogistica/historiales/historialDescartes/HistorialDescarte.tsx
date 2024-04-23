/* eslint-disable prettier/prettier */
import ComponentHistorialDescarte from "./components/ComponentHistorialDescarte"
import NavBarDescartes from "./utils/NavBarDescartes"
import { useState } from 'react'
import "./css/styles.css"


export default function HistorialDescarte(): JSX.Element {
  const [filtro, setFiltro] = useState<string>('')
  
  const handleFilter = (data:string): void =>{
    setFiltro(data)
  }

  return (
    <div className="componentContainer">
      <NavBarDescartes handleFilter={handleFilter} />
      <ComponentHistorialDescarte filtro={filtro} />
    </div>
  )
}
