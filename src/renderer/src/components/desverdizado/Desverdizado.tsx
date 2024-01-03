/* eslint-disable prettier/prettier */

import InventarioDesverdizado from "./components/InventarioDesverdizado"
import NavBarDesverdizado from "./utils/NavBarDesverdizado"
import { useState } from 'react'

type propsType = {
    theme: string
    user:string
}


export default function Desverdizado(props:propsType): JSX.Element {
    const [filtro, setFiltro] = useState<string>('')
    const [seccion, setSeccion] = useState<string>('')
    
    const handleFilter = (data:string): void =>{
      setFiltro(data)
    }
  
    const handleSectionSelect = (data:string): void => {
      setSeccion(data)
    }
  return (
    <div>
        <NavBarDesverdizado handleFilter={handleFilter} handleSectionSelect={handleSectionSelect}/>
        {seccion === "" && <InventarioDesverdizado  user={props.user} theme={props.theme} filtro={filtro}/>}
    </div>
  )
}

