/* eslint-disable prettier/prettier */
import ErrorModal from '@renderer/errors/modal/ErrorModal'
import FrutaSinProcesar from './components/FrutaSinProcesar'
import NavBarInventario from './utils/NavBarInventario'
import { useContext, useState } from 'react'
import SuccessModal from '@renderer/errors/modal/SuccessModal'
import { themeContext } from '@renderer/App'


export default function InventarioFrutaSinProcesar(): JSX.Element {
  const theme = useContext(themeContext);
  const [filtro, setFiltro] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  const handleFilter = (data: string): void => {
    setFiltro(data)
  }

  const closeModal = (): void => {
    setShowError(false)
  }
  return (
    <div className='w-full'>
      <NavBarInventario handleFilter={handleFilter} />
     
     
        <FrutaSinProcesar 
          filtro={filtro} 
          setShowSuccess={setShowSuccess} 
          setShowError={setShowError}
          setMessage={setMessage} />


      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  )
}
