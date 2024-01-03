/* eslint-disable prettier/prettier */
import HistorialDescarte from "./components/HistorialDescarte"
import InventarioDescartes from "./components/InventarioDescartes"
import NavBarDescartes from "./utils/NavBarDescartes"
import { useState } from 'react'

type propsType = {
  theme: string
  user: string
}

export default function Descarte(props:propsType): JSX.Element {
  const [filtro, setFiltro] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('Descartes')
  
  const handleFilter = (data:string): void =>{
    setFiltro(data)
  }

  const handleSectionSelect = (data:string): void => {
    setSeccion(data)
  }
  return (
    <div>
      <NavBarDescartes handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === 'Descartes' && <InventarioDescartes theme={props.theme} user={props.user} filtro={filtro}/>}
      {seccion === 'Historial descartes' && <HistorialDescarte theme={props.theme} user={props.user} filtro={filtro}/>}
   
    </div>
  )
}
