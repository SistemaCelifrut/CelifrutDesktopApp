/* eslint-disable prettier/prettier */
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import FrutaSinProcesar from './components/FrutaSinProcesar'
import HistorialDirectoNacional from './components/HistorialDirectoNacional'
import HistorialProcesado from './components/HistorialProcesado'
import NavBarInventario from './utils/NavBarInventario'
import { useContext, useState } from 'react'
import SuccessModal from '@renderer/errors/modal/SuccessModal'
import { themeContext } from '@renderer/App'

type propsType = {
  theme: string
  user: string
}

export default function InventarioFrutaSinProcesar(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  const [filtro, setFiltro] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('Fruta sin procesar')
  const [message, setMessage] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }

  const handleSectionSelect = (data: string): void => {
    setSeccion(data)
  }
  const closeModal = (): void => {
    setShowError(false)
  }
  return (
    <div>
      <NavBarInventario handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === 'Fruta sin procesar' && (
        <FrutaSinProcesar 
          user={props.user} 
          theme={props.theme} 
          filtro={filtro} 
          setShowSuccess={setShowSuccess} 
          setShowError={setShowError}
          setMessage={setMessage} />
      )}
      {seccion === 'Historial proceso' && (
        <HistorialProcesado 
          user={props.user} 
          theme={props.theme} 
          filtro={filtro} 
          setShowSuccess={setShowSuccess} 
          setShowError={setShowError}
          setMessage={setMessage} />
      )}
      {seccion === 'Historial Directo Nacional' && (
        <HistorialDirectoNacional 
          user={props.user} 
          theme={props.theme} 
          filtro={filtro} 
          setShowSuccess={setShowSuccess} 
          setShowError={setShowError}
          setMessage={setMessage} />
      )}
      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  )
}
