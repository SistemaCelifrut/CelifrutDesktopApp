import FrutaSinProcesar from "./components/FrutaSinProcesar"
import HistorialDirectoNacional from "./components/HistorialDirectoNacional"
import HistorialProcesado from "./components/HistorialProcesado"
import NavBarInventario from "./utils/NavBarInventario"
import { useState } from 'react'

type propsType = {
  theme: string
  user: string
}


export default function InventarioFrutaSinProcesar(props:propsType) {

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
       <NavBarInventario handleFilter={handleFilter} handleSectionSelect={handleSectionSelect}/>
      {seccion === 'Fruta sin procesar' && <FrutaSinProcesar user={props.user} theme={props.theme} filtro={filtro}/>}
      {seccion === 'Historial proceso' && <HistorialProcesado user={props.user} theme={props.theme} filtro={filtro}/>}
      {seccion === 'Historial Directo Nacional' && <HistorialDirectoNacional user={props.user} theme={props.theme} filtro={filtro}/>}
    </div>
  )
}
