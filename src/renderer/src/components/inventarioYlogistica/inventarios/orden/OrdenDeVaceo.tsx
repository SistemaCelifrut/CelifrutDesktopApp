/* eslint-disable prettier/prettier */
import OrdenVaceo from "./components/OrdenVaceo"
import NavBarOrden from "./utils/NavBarOrden"
import { useState } from 'react'



export default function InventarioDescarte(): JSX.Element {
  const [, setFiltro] = useState<string>('')
  
  const handleFilter = (data:string): void =>{
    setFiltro(data)
  }


  return (
    <div className="w-full">
      <NavBarOrden handleFilter={handleFilter} />
     <OrdenVaceo />
   
    </div>
  )
}