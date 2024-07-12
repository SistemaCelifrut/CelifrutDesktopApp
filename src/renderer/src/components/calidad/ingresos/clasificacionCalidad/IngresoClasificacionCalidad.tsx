/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import TablaClasificacionCalidad from './components/TablaClasificacionCalidad'
import NavClasificacionCalidad from './utils/NavClasificacionCalidad'
import { lotesType } from '@renderer/types/lotesType';
import { requestlotes } from './functions/request';
import useAppContext from '@renderer/hooks/useAppContext';
import "./css/styles.css"

export default function IngresoClasificacionCalidad(): JSX.Element {
  const {messageModal} = useAppContext();
  const [lotesData, setLotesData] = useState<lotesType[]>([])
  const [lote, setLote] = useState<lotesType>({_id:"", enf:"", predio:{PREDIO:""}, tipoFruta:'Limon'})

  useEffect(() => {
    interval()
  }, [])

  const interval = async (): Promise<void> => {
    try {
      const lotes = await window.api.server2(requestlotes)
      if(lotes.status !== 200){
        throw new Error(`${lotes.message}`);
      }
      setLotesData(lotes.data)
    } catch (e) {
      if(e instanceof Error){
        messageModal("error", `${e.message}`)
      }
    }
  }

  return (
    <div className='componentContainer'>
      <NavClasificacionCalidad lotesData={lotesData} setLote={setLote} />
      <h2>Ingreso clasificación calidad</h2>
      <TablaClasificacionCalidad lote={lote} /> 
    </div>
  )
}
