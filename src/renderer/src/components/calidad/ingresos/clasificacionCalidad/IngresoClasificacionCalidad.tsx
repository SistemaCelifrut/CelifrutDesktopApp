/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import TablaClasificacionCalidad from './components/TablaClasificacionCalidad'
import NavClasificacionCalidad from './utils/NavClasificacionCalidad'
import { lotesInventarioType } from './types/clasificacionTypes'



export default function IngresoClasificacionCalidad(): JSX.Element {
  const [lotesData, setLotesData] = useState<lotesInventarioType[]>([{ id: '', tipoFruta: 'Limon', nombre: '' }])
  const [lote, setLote] = useState('')
  const [loteData, setLoteData] = useState<lotesInventarioType>({id: '',tipoFruta: 'Limon',nombre: ''})
  const [seccion, setSeccion] = useState<string>('Clasificacion calidad')


  useEffect(() => {
    const interval = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerLotesClasificacionCalidad', query:"proceso"}
        const lotes = await window.api.calidad(request)
        setLotesData(lotes.data)
      } catch (e) {
        alert(e)
      }
    }
    interval()
  }, [])
  useEffect(() => {
    const loteFind: lotesInventarioType | undefined = lotesData.find((item) => item.id === lote)
    if (loteFind !== undefined) {
      setLoteData(loteFind)
    }
  }, [lote])
  const handleSectionSelect = (data: string): void => {
    console.log(seccion)
    setSeccion(data)
  }

  return (
    <div>
      <NavClasificacionCalidad lotesData={lotesData} setLote={setLote} handleSectionSelect={handleSectionSelect} />
      <TablaClasificacionCalidad lote={loteData} /> 
    </div>
  )
}
