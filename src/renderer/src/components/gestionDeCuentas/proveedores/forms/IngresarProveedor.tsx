/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import ErrorModal from "@renderer/errors/modal/ErrorModal";
import { useContext, useEffect, useState } from "react"
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { proveedoresType } from "../type/type";
import SuccessModal from "@renderer/errors/modal/SuccessModal";

type propsType = {
    proveedorSeleccionado: proveedoresType
    setShowFormulario: (e) => void
    isModificar: boolean
    setRender: (e) => void
}

export default function IngresarProveedor(props: propsType): JSX.Element {
    const theme = useContext(themeContext)

    const [codigoInterno, setCodigoInterno] = useState<string>('')
    const [nombrePredio, setNombrePredio] = useState<string>('')
    const [ICA, setICA] = useState<string>('')
    const [departamento, setDepartamento] = useState<string>('')
    const [proveedores, setProveedores] = useState<string>('')
    const [GGN, setGGN] = useState<string>('')
    const [fechaVencimiento, setFechaVencimiento] = useState<string>('')
    const [naranja, setNaranja] = useState<boolean>(false)
    const [limon, setLimon] = useState<boolean>(false)
    const [mandarina, setMandarina] = useState<boolean>(false)
    const [files, setFiles] = useState<FileList | null>(null)
    const [showError, setShowError] = useState<boolean>(false)
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [id, setId] = useState<string>('')

    useEffect(() => {
        setCodigoInterno(props.proveedorSeleccionado["CODIGO INTERNO"])
        setNombrePredio(props.proveedorSeleccionado.PREDIO)
        setICA(props.proveedorSeleccionado.ICA)
        setNaranja(props.proveedorSeleccionado.N === '' ? false : true)
        setLimon(props.proveedorSeleccionado.L === '' ? false : true)
        setMandarina(props.proveedorSeleccionado.M === '' ? false : true)
        setDepartamento(props.proveedorSeleccionado.DEPARTAMENTO)
        setProveedores(props.proveedorSeleccionado.PROVEEDORES)
        setICA(props.proveedorSeleccionado.ICA)
        setFechaVencimiento(props.proveedorSeleccionado["FECHA VENCIMIENTO GGN"])
        setId(props.proveedorSeleccionado._id);
    }, [props.proveedorSeleccionado])

    const handleFileChange = (e): void => {
        setFiles(e.target.files)
    }
    const handleSubmit = async (event): Promise<void> => {
        event.preventDefault()
        const arrayBuffer: ArrayBuffer[] = []
        let serverRequest

        if (!props.isModificar) {
            if (files === null || files?.length < 3) {
                setShowError(true)
                setMessage("Faltan archivos")
                setInterval(() => {
                    setShowError(false)
                }, 5000)
                return
            }
            serverRequest = 'agregarProveedor'
            for (let i = 0; i < files?.length; i++) {
                const file = files[i]
                const promiseBuffer = await new Promise<ArrayBuffer>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (event): void => {
                        resolve(event.target?.result as ArrayBuffer)
                    }
                    reader.readAsArrayBuffer(file)
                })
                const result = await promiseBuffer;
                arrayBuffer.push(result)
            }

        } else {
            serverRequest = 'modificarProveedor'
        }


        Promise.all(arrayBuffer).then((results) => {
            const request = {
                action: serverRequest,
                data: {
                    id: id,
                    codigoInterno: codigoInterno,
                    nombrePredio: nombrePredio,
                    ICA: ICA,
                    departamento: departamento,
                    GGN: GGN,
                    fechaVencimiento: fechaVencimiento,
                    naranja: naranja,
                    limon: limon,
                    mandarina: mandarina,
                    documentos: results
                }
            }
            window.api.proceso(request).then((response) => {
                if (response.status === 200) {
                    resetearData()
                    props.setRender(previous => !previous)
                    setShowSuccess(true)
                    setMessage("Guardado con exito!")
                    setInterval(() => {
                        setShowSuccess(false)
                    }, 5000)
                } else {
                    setShowError(true)
                    setMessage(`Error ${response.status}: ${response.message}`)
                    setInterval(() => {
                        setShowError(false)
                    }, 5000)
                }
            })
        })
    }
    const closeModal = (): void => {
        setShowError(false)
    }
    const resetearData = (): void => {
        setCodigoInterno('');
        setNombrePredio('');
        setICA('');
        setDepartamento('');
        setProveedores('');
        setGGN('');
        setFechaVencimiento('');
        setNaranja(false);
        setLimon(false);
        setMandarina(false);
        setFiles(null);
        setShowError(false);
        setShowSuccess(false);
        setMessage('');
        setId('');
    }

    return (
        <div className="flex flex-col justify-center w-full">
            <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-center text-2xl font-bold`} >Agregar Proveedor</h2>
            <form className="p-6" onSubmit={handleSubmit} >

                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Codigo interno
                    <input value={codigoInterno} onChange={(e): void => setCodigoInterno(e.target.value)} required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Nombre predio
                    <input value={nombrePredio} onChange={(e): void => setNombrePredio(e.target.value)} required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
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
                    Proveedores
                    <input value={proveedores} onChange={(e): void => setProveedores(e.target.value)} type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
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
                            checked={naranja}
                            type="checkbox"
                            className="form-checkbox text-green-600"
                            onChange={(e): void => setNaranja(e.target.checked)}
                        />
                        <span className="ml-2">Naranja</span>
                    </label>
                    <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                        <input
                            checked={limon}
                            type="checkbox"
                            className="form-checkbox text-green-600"
                            onChange={(e): void => setLimon(e.target.checked)}
                        />
                        <span className="ml-2">Limon</span>
                    </label>
                    <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'}`}>
                        <input
                            checked={mandarina}
                            type="checkbox"
                            className="form-checkbox text-green-600"
                            onChange={(e): void => setMandarina(e.target.checked)}

                        />
                        <span className="ml-2">Mandarina</span>
                    </label>
                </div>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Documentos (PDF)
                    <input multiple onChange={handleFileChange} type="file" className={`rounded-lg p-1 ${theme === 'Dark' ? 'text-white' : 'text-black'}`} />
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
            <div className='fixed bottom-0 right-0 flex items-center justify-center'>
                {showError && <ErrorModal message={message} closeModal={closeModal} theme={theme} />}
                {showSuccess && <SuccessModal message={message} closeModal={closeModal} theme={theme} />}
            </div>
        </div>
    )
}
