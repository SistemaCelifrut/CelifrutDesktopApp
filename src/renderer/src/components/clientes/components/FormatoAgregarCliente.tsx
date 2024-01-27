/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"

export default function FormatoAgregarCliente(): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div className="p-2">
            <div className="flex justify-center">
                <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl font-bold`}>Agregar Cliente</h2>
            </div>
            <form className="p-6"  >
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Codigo
                    <input required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
            </form>
        </div>
    )
}
