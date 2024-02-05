/* eslint-disable prettier/prettier */

import ErrorModal from "@renderer/errors/modal/ErrorModal"
import InventarioDesverdizado from "./components/InventarioDesverdizado"
import NavBarDesverdizado from "./utils/NavBarDesverdizado"
import { useContext, useState } from 'react'
import SuccessModal from "@renderer/errors/modal/SuccessModal"
import { themeContext, userContext } from "@renderer/App"


export default function Desverdizado(): JSX.Element {
  const theme = useContext(themeContext)
  const user = useContext(userContext)
  const [filtro, setFiltro] = useState<string>('')
  const [seccion, setSeccion] = useState<string>('')
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
    <div className="w-full">
      <NavBarDesverdizado handleFilter={handleFilter} handleSectionSelect={handleSectionSelect} />
      {seccion === "" &&
        <InventarioDesverdizado
          user={user.cargo}
          theme={theme}
          filtro={filtro}
          setShowSuccess={setShowSuccess}
          setShowError={setShowError}
          setMessage={setMessage} />}

      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  )
}

