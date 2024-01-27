/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react'
import NavCalidadInternaForm from './utils/NavCalidadInternaForm'
import PruebasCalidadInterna from './components/PruebasCalidadInterna'
import HistorialCalidadInterna from './components/HistorialCalidadInterna'
import { themeContext } from '@renderer/App'
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import SuccessModal from '@renderer/errors/modal/SuccessModal'


export default function CalidadInterna(): JSX.Element {
  const theme = useContext(themeContext)
  const [lotesData, setLotesData] = useState([])
  const [lote, setLote] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('Calidad interna')
  const [showError, setShowError] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleSectionSelect = (data: string): void => {
    console.log(seccion)
    setSeccion(data)
  }
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
  const closeModal = (): void => {
    setShowError(false)
  }
  return (
    <div className='flex flex-col gap-4 p-2'>
      <NavCalidadInternaForm lotesData={lotesData} setLote={setLote} handleSectionSelect={handleSectionSelect} />
      <div>
        {seccion === 'Calidad interna' && <PruebasCalidadInterna lote={lote} setLotesData={setLotesData} />}
        {seccion === 'Historial Calidad interna' && <HistorialCalidadInterna setMessage={setMessage} setShowError={setShowError} setShowSuccess={setShowSuccess}/>}
      </div>
      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  )
}
