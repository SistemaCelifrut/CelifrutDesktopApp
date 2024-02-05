/* eslint-disable prettier/prettier */

import { useContext, useState } from "react";
import NavBarClientes from "./utils/NavBarClientes";
import ListaClientes from "./components/ListaClientes";
import { themeContext } from "@renderer/App";
import ErrorModal from "@renderer/errors/modal/ErrorModal";
import SuccessModal from "@renderer/errors/modal/SuccessModal";

export default function Clientes(): JSX.Element {
    const theme = useContext(themeContext)
    const [seccion, setSeccion] = useState<string>('Clientes')
    const [showError, setShowError] = useState<boolean>(false)
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')


    const handleSectionSelect = (data: string): void => {
        setSeccion(data)
    }
    const closeModal = (): void => {
        setShowError(false)
    }
    return (
        <div className="w-full">
            <NavBarClientes handleSectionSelect={handleSectionSelect} />
            {seccion === 'Clientes' && <ListaClientes setMessage={setMessage} setShowError={(setShowError)} setShowSuccess={setShowSuccess}/>}
            <div className='fixed bottom-0 right-0 flex items-center justify-center'>
                {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
                {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
            </div>
        </div>
    )
}
