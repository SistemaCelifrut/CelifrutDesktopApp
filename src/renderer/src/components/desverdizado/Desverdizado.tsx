
import InventarioDesverdizado from "./components/InventarioDesverdizado"
import NavBarDesverdizado from "./utils/NavBarDesverdizado"
import { useState } from 'react'

type propsType = {
    theme: string
    user:string
}


export default function Desverdizado(props:propsType) {
    const [filtro, setFiltro] = useState<string>('')
    const [seccion, setSeccion] = useState<string>('Fruta sin procesar')
    
    const handleFilter = (data:string) =>{
      setFiltro(data)
    }
  
    const handleSectionSelect = (data:string) => {
      setSeccion(data)
    }
  return (
    <div>
        <NavBarDesverdizado handleFilter={handleFilter} handleSectionSelect={handleSectionSelect}/>
        <InventarioDesverdizado  user={props.user} theme={props.theme} filtro={filtro}/>
    </div>
  )
}

