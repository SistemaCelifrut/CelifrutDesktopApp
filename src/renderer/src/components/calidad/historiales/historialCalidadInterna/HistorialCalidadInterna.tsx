/* eslint-disable prettier/prettier */
import { useContext, useState } from 'react'
import ComponentHistorialCalidadInterna from './components/ComponentHistorialCalidadInterna'
import { themeContext } from '@renderer/App'
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import SuccessModal from '@renderer/errors/modal/SuccessModal'


export default function HistorialCalidadInterna(): JSX.Element {
  const theme = useContext(themeContext)
  const [showError, setShowError] = useState<boolean>(false)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const closeModal = (): void => {
    setShowError(false)
  }
  return (
    <div className='flex flex-col gap-4 p-2'>
      <div>
        <ComponentHistorialCalidadInterna setMessage={setMessage} setShowError={setShowError} setShowSuccess={setShowSuccess}/>
      </div>
      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  )
}
