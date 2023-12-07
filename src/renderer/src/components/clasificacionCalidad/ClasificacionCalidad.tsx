import { themeType } from "@renderer/env"
import { useEffect, useState } from 'react'
import TablaClasificacionCalidad from "./components/TablaClasificacionCalidad"
import NavClasificacionCalidad from "./utils/NavClasificacionCalidad"
import { lotesInventarioType } from "./types/clasificacionTypes"

type propsType = {
    theme: themeType,
    user: string
}

export default function ClasificacionCalidad(props:propsType) {
  const [lotesData, setLotesData] = useState<lotesInventarioType[]>([{id:'', tipoFruta:'Limon',nombre:''}])
  const [lote, setLote] = useState('')
  const [loteData, setLoteData] = useState<lotesInventarioType>({id:'', tipoFruta:'Limon',nombre:''});

    useEffect(() => {
        const interval = async () => {
          try {
            const request = { action: 'obtenerLotesClasificacionCalidad' }
            const lotes = await window.api.calidad(request)
            setLotesData(lotes.data)
          } catch (e) {
            alert(e)
          }
        }
        interval()
      }, [])
      useEffect(() => {
        const loteFind:lotesInventarioType | undefined = lotesData.find(item => item.id === lote)
        if(loteFind !== undefined){
            setLoteData(loteFind)
        }
      } , [lote])

  return (
    <div>
        <NavClasificacionCalidad lotesData={lotesData} setLote={setLote} />
        <TablaClasificacionCalidad theme={props.theme} lote={loteData}/>
    </div>
  )
}
