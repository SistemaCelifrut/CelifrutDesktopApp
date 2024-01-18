/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import ErrorModal from "@renderer/errors/modal/ErrorModal";
import { useContext, useState } from "react"
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function IngresarProveedor(): JSX.Element {
    const theme = useContext(themeContext)

    const [codigoInterno, setCodigoInterno] = useState<string>('')
    const [nomnrePredio, setNombrePredio] = useState<string>('')
    const [ICA, setICA] = useState<string>('')
    const [departamento, setDepartamento] = useState<string>('')
    const [GGN, setGGN] = useState<string>('')
    const [fechaVencimiento, setFechaVencimiento] = useState<string>('')
    const [naranja, setNaranja] = useState<boolean>(false)
    const [limon, setLimon] = useState<boolean>(false)
    const [mandarina, setMandarina] = useState<boolean>(false)
    const [files, setFiles] = useState<FileList | null>(null)
    const [showError, setShowError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')


    const handleFileChange = (e): void =>{
        setFiles(e.target.files)
        console.log(files)
    }
    const handleSubmit = async (event): Promise<void> => {
        event.preventDefault()
        const formData = new FormData();
        if(files === null || files?.length < 3 ){
            setShowError(true)
            setMessage("Faltan archivos")
            setInterval(() => {
                setShowError(false)
            }, 5000)
        }

    }
    const closeModal = (): void => {
        setShowError(false)
    }
    return (
        <div className="flex flex-col justify-center">
            <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-center text-2xl font-bold`} >Agregar Proveedor</h2>
            <form className="p-6" onSubmit={handleSubmit} >

                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Codigo interno
                    <input value={codigoInterno} onChange={(e): void => setCodigoInterno(e.target.value)} required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Nombre predio
                    <input value={nomnrePredio} onChange={(e): void => setNombrePredio(e.target.value)} required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    ICA
                    <input value={ICA} onChange={(e): void => setICA(e.target.value)} type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Departamento
                    <input value={departamento} onChange={(e): void => setDepartamento(e.target.value)} type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    GGN
                    <input value={GGN} onChange={(e): void => setGGN(e.target.value)} type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Fecha de vencimiento
                    <input value={fechaVencimiento} onChange={(e): void => setFechaVencimiento(e.target.value)} type="date" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <div className="flex flex-row gap-10 m-5">
                    <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                        <input
                            type="checkbox"
                            className="form-checkbox text-green-600"
                            onChange={(e):void => setNaranja(e.target.checked)}
                        />
                        <span className="ml-2">Naranja</span>
                    </label>
                    <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                        <input
                            type="checkbox"
                            className="form-checkbox text-green-600"
                            onChange={(e): void => setLimon(e.target.checked)}
                        />
                        <span className="ml-2">Limon</span>
                    </label>
                    <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                        <input
                            type="checkbox"
                            className="form-checkbox text-green-600"
                            onChange={(e): void => setMandarina(e.target.checked)}

                        />
                        <span className="ml-2">Mandarina</span>
                    </label>
                </div>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Documentos (Pdf)
                    <input required multiple onChange={handleFileChange} type="file" className={`rounded-lg p-1 ${theme === 'Dark' ? 'text-white' : 'text-black'}`} />
                </label>
                <div className="flex flex-row gap-4 justify-end">
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
            <div className='fixed bottom-0 right-0 flex items-center justify-center'>
                {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
            </div>
        </div>
    )
}
