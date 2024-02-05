/* eslint-disable prettier/prettier */

import { useContext, useState } from "react";
import NavBarProveedores from "./utils/NavBarProveedores";
import ProveedoresLista from "./components/ProveedoresLista";
import { themeContext } from "@renderer/App";
import ErrorModal from "@renderer/errors/modal/ErrorModal";
import SuccessModal from "@renderer/errors/modal/SuccessModal";

export default function Proveedores(): JSX.Element {
    const theme = useContext(themeContext)
    const [showError, setShowError] = useState<boolean>(false)
    const [showSuccess, ] = useState<boolean>(false)
    const [message, ] = useState<string>('')


    const closeModal = (): void => {
        setShowError(false)
    }
    return (
        <div className="p-1 w-full">
            <div className="z-50">
                <NavBarProveedores  />
            </div>
            <div className="z-0">
               <ProveedoresLista />

            </div>
            <div className='fixed bottom-0 right-0 flex items-center justify-center'>
                {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
                {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
            </div>
        </div>
    )
}
