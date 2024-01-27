/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"
import SelectPaises from "../utils/SelectPaises"
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

type propsType = {
    setShowFormulario: (e) => void
}

export default function FormatoAgregarCliente(props:propsType): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div className="p-2">
            <div className="flex justify-center">
                <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl font-bold`}>Agregar Cliente</h2>
            </div>
            <form className="p-6"  >
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Codigo
                    <input required type="number" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Cliente
                    <input required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Correo
                    <input required type="email" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Direccion
                    <input required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>

                <SelectPaises />

                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Telefono
                    <input required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>

                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    ID
                    <input required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <div className="flex flex-row gap-4 justify-end mt-5">
                    <button
                        type="submit"
                        className={
                            'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-blue-700 px-8 py-3 text-white focus:outline-none active:bg-blue-900 active:border-blue-700'
                        }
                    >
                        <span className="absolute  -end-full transition-all group-hover:end-4">
                            <FaSave />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:me-4">
                            Guardar
                        </span>
                    </button>
                    <button
                        onClick={(): void => props.setShowFormulario(false)}
                        type="button"
                        className={
                            'group relative inline-flex w-40 h-10 items-center overflow-hidden rounded bg-red-700 px-8 py-3 text-white focus:outline-none active:bg-red-900 active:border-red-700'
                        }
                    >
                        <span className="absolute  -end-full transition-all group-hover:end-4">
                            <MdCancel />
                        </span>

                        <span className="text-sm font-medium transition-all group-hover:me-4">
                            Cancelar
                        </span>
                    </button>
                </div>

            </form>
        </div>
    )
}
