/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import TablaClasificacionCalidad from './components/TablaClasificacionCalidad'
import NavClasificacionCalidad from './utils/NavClasificacionCalidad'
import { lotesType } from '@renderer/types/lotesType';
import { requestlotes } from './functions/request';
import useAppContext from '@renderer/hooks/useAppContext';

export default function IngresoClasificacionCalidad(): JSX.Element {
  const {messageModal} = useAppContext();
  const [lotesData, setLotesData] = useState<lotesType[]>([])
  const [lote, setLote] = useState<lotesType>({_id:"", enf:"", predio:{PREDIO:""}, tipoFruta:'Limon'})

  useEffect(() => {
    interval()
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [])

  const handleServerEmit = async (data): Promise<void> => {
    if (data.fn === "procesoLote" || data.fn === 'ingresoLote') {
      await interval()
    }
  }

  const interval = async (): Promise<void> => {
    try {
      const lotes = await window.api.server(requestlotes)
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
    <div>
      <NavClasificacionCalidad lotesData={lotesData} setLote={setLote} />
      <TablaClasificacionCalidad lote={lote} /> 
    </div>
  )
}
