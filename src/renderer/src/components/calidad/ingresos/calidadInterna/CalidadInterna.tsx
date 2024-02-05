/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import NavCalidadInternaForm from './utils/NavCalidadInternaForm'
import PruebasCalidadInterna from './components/PruebasCalidadInterna'


export default function CalidadInterna(): JSX.Element {
  const [lotesData, setLotesData] = useState([])
  const [lote, setLote] = useState<string>('')

  useEffect(() => {
    const interval = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerLotesCalidadInterna', query: 'proceso' }
        const lotes = await window.api.calidad(request)
        setLotesData(lotes.data)
      } catch (e) {
        alert(e)
      }
    }
    interval()
  }, [])

  return (
    <div className='flex flex-col gap-4 p-2 w-full'>
      <NavCalidadInternaForm lotesData={lotesData} setLote={setLote} />
      <div>
        <PruebasCalidadInterna lote={lote} setLotesData={setLotesData} />
      </div>
    </div>
  )
}
