/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import ErrorModal from "@renderer/errors/modal/ErrorModal"
import SuccessModal from "@renderer/errors/modal/SuccessModal"
import { useContext, useEffect, useState } from "react"
import { contenedoresType } from "./type/types"
import TableContenedores from "./tables/TableContenedores"

export default function Contenedores(): JSX.Element {
  const theme = useContext(themeContext)
  const [data, setData] = useState<contenedoresType[]>([])
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  useEffect((): void => {
    const obtenerDataContenedor = async (): Promise<void> => {
      try {
        const request = {
          action: 'ObtenerInfoContenedoresCelifrut'
        }
        const response = await window.api.contenedores(request)
        if (response.status === 200) {
          setData(response.data)
        } else {
          setShowError(true)
          setMessage("Error obteniendo los datos del servidor")
          setInterval(() => {
            setShowError(false)
          }, 5000)
        }
      } catch (e) {
        if (e instanceof Error) {
          setShowError(true)
          setMessage(e.message)
          setInterval(() => {
            setShowError(false)
          }, 5000)
        }
      }
    }
    obtenerDataContenedor()
  }, [])
  const closeModal = (): void => {
    setShowError(false)
  }
  return (
    <div className="p-2">
      <div className={`${theme === 'Dark' ? 'bg-gray-500' : 'bg-gray-200'} p-3 rounded-lg shadow-lg`}>
        <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
                    text-2xl font-bold  transition-all border-b-2 duration-500 ease-in-out  hover:text-Celifrut-green hover:border-b-2  hover:border-Celifrut-green`}>
          <h2>Contenedores</h2>
        </div>
      </div>
      <div>
        <TableContenedores data={data} />
      </div>

      <div className='fixed bottom-0 right-0 flex items-center justify-center'>
        {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
        {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
      </div>
    </div>
  )
}
