/* eslint-disable prettier/prettier */
import { useContext, useState } from 'react'
import { themeContext } from '@renderer/App'
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import SuccessModal from '@renderer/errors/modal/SuccessModal'
import ComponentHistorialClasificacionCalidad from './components/ComponentHistorialClasificacionCalidad'



export default function HistorialClasificacionCalidad(): JSX.Element {
  const theme = useContext(themeContext)
  const [showError, setShowError] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')


  const closeModal = (): void => {
    setShowError(false)
  }
  return (
    <div className='w-full'>
     <ComponentHistorialClasificacionCalidad setMessage={setMessage} setShowError={setShowError} setShowSuccess={setShowSuccess}/>

      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  )
}
