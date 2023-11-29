import InventarioDescartes from "./components/InventarioDescartes"
import NavBarDescartes from "./utils/NavBarDescartes"
import { useState } from 'react'

type propsType = {
  theme: string
  user: string
}

export default function Descarte(props:propsType) {
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
      <NavBarDescartes handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === 'Descartes' && <InventarioDescartes theme={props.theme} user={props.user} />}
    </div>
  )
}
