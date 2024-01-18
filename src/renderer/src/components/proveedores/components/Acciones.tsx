/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"
import { IoIosAddCircle } from "react-icons/io";
import { TfiBackLeft } from "react-icons/tfi";

type propsType = {
    setFiltro: (e) => void
    handleBotonAgregar: (e) => void
    showFormulario: boolean
}

export default function Acciones(props: propsType): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div className={`${theme === 'Dark' ? 'bg-gray-600' : 'bg-gray-300'} rounded-lg`}>
            <div className="flex felx-row gap-7 items-center ml-5">
                <button
                    onClick={props.handleBotonAgregar}
                    type="submit"
                    className="my-4 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-Celifrut-green text-white hover:bg-Celifrut-green-dark disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                   
                    {props.showFormulario ?  
                        <div className="flex flex-row items-center gap-2">Volver <TfiBackLeft /></div> :  
                        <div className="flex flex-row items-center gap-2"> Agregar <IoIosAddCircle /></div>  }
                    
                </button>
                <input type="text" className="rounded-lg h-10 pl-2" placeholder="Buscar..." onChange={(e): void => props.setFiltro(e.target.value)} />
            </div>
        </div>
    )
}
