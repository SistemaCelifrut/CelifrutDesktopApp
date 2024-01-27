/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react'
import TablaClasificacionCalidad from './components/TablaClasificacionCalidad'
import NavClasificacionCalidad from './utils/NavClasificacionCalidad'
import { lotesInventarioType } from './types/clasificacionTypes'
import { themeContext } from '@renderer/App'
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import SuccessModal from '@renderer/errors/modal/SuccessModal'
import HistorialClasificacionCalidad from './components/HistorialClasificacionCalidad'



export default function ClasificacionCalidad(): JSX.Element {
  const theme = useContext(themeContext)
  const [lotesData, setLotesData] = useState<lotesInventarioType[]>([{ id: '', tipoFruta: 'Limon', nombre: '' }])
  const [lote, setLote] = useState('')
  const [loteData, setLoteData] = useState<lotesInventarioType>({id: '',tipoFruta: 'Limon',nombre: ''})
  const [seccion, setSeccion] = useState<string>('Clasificacion calidad')
  const [showError, setShowError] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

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
  const closeModal = (): void => {
    setShowError(false)
  }
  return (
    <div>
      <NavClasificacionCalidad lotesData={lotesData} setLote={setLote} handleSectionSelect={handleSectionSelect} />
      {seccion === "Clasificacion calidad" &&  <TablaClasificacionCalidad lote={loteData} /> }
     {seccion === "Historial Clasificacion calidad" && <HistorialClasificacionCalidad setMessage={setMessage} setShowError={setShowError} setShowSuccess={setShowSuccess}/>}

      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  )
}
