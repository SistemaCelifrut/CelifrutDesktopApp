/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import TablaClasificacionCalidad from './components/TablaClasificacionCalidad'
import NavClasificacionCalidad from './utils/NavClasificacionCalidad'
import { lotesInventarioType } from './types/clasificacionTypes'

const request = {
  data:{
    query:{ 
      "calidad.clasificacionCalidad": { $exists : false},
    },
    select : { enf:1, tipoFruta: 1, calidad:1 },
    populate:{
      path: 'predio',
      select: 'PREDIO'
    },
    sort:{fechaIngreso: -1}
  },
  collection:'lotes',
  action: 'getLotes',
  query: 'proceso'
};

export default function IngresoClasificacionCalidad(): JSX.Element {
  const [lotesData, setLotesData] = useState<lotesInventarioType[]>([])
  const [lote, setLote] = useState<lotesInventarioType>({_id:"", enf:"", predio:{PREDIO:""}, tipoFruta:'Limon'})

  useEffect(() => {
    const interval = async (): Promise<void> => {
      try {
        const lotes = await window.api.server(request)
        setLotesData(lotes.data)
      } catch (e) {
        alert(e)
      }
    }
    interval()
  }, [])

  return (
    <div>
      <NavClasificacionCalidad lotesData={lotesData} setLote={setLote} />
      <TablaClasificacionCalidad lote={lote} /> 
    </div>
  )
}
