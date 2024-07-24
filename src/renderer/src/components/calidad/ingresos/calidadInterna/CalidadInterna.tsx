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
  const [lote, setLote] = useState<lotesType>()
  const [reload, setReload] = useState<boolean>(false);

  const interval = async (): Promise<void> => {
    try {
      const lotes = await window.api.server2(requestLotes)
      if(lotes.status !== 200) throw new Error(`Code ${lotes.status}: ${lotes.message}`)
      setLotesData(lotes.data)
    } catch (e: unknown) {
      if(e instanceof Error){
        messageModal("error",`Error: ${e.message}`)
      }
    }
  }
  useEffect(() => {
    interval()
    window.api.reload(() => {
      setReload(!reload)
    });
    return() => {
      window.api.removeReload()
    }
  }, [reload])

  return (
    <div className='componentContainer'>
      <NavCalidadInternaForm lotesData={lotesData} setLote={setLote} />
      <h2>Ingreso calidad interna</h2>
      <div>
       {lote && <PruebasCalidadInterna interval={interval} lote={lote} setLotesData={setLotesData} />}
      </div>
    </div>
  )
}
