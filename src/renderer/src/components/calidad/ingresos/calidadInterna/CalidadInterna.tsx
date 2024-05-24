/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import NavCalidadInternaForm from './utils/NavCalidadInternaForm'
import PruebasCalidadInterna from './components/PruebasCalidadInterna'
import { lotesType } from '@renderer/types/lotesType';
import { requestLotes } from './functions/request';
import useAppContext from '@renderer/hooks/useAppContext';



export default function CalidadInterna(): JSX.Element {
  const {messageModal} = useAppContext();
  const [lotesData, setLotesData] = useState([])
  const [lote, setLote] = useState<lotesType>({_id:"",enf:"",})

  const interval = async (): Promise<void> => {
    try {
      const lotes = await window.api.server(requestLotes)
      setLotesData(lotes.data)
    } catch (e: unknown) {
      if(e instanceof Error){
        messageModal("error",`Error: ${e.message}`)
      }
    }
  }
  useEffect(() => {
    interval()
    const handleServerEmit = async (data): Promise<void> => {
      if (data.fn === "procesoLote") {
        await interval()
      }
    }
    window.api.serverEmit('serverEmit', handleServerEmit)
    // Función de limpieza
    return () => {
      window.api.removeServerEmit('serverEmit', handleServerEmit)
    }
  }, [])

  return (
    <div className='componentContainer'>
      <NavCalidadInternaForm lotesData={lotesData} setLote={setLote} />
      <h2>Ingreso calidad interna</h2>
      <div>
        <PruebasCalidadInterna lote={lote} setLotesData={setLotesData} />
      </div>
    </div>
  )
}
