/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"
import SelectPaises from "../utils/SelectPaises"
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { clientesType } from "../type/type";

type propsType = {
    setShowFormulario: (e) => void
    setShowSuccess: (e) => void
    setShowError: (e) => void
    setMessage: (e) => void
    clienteSeleccionado: clientesType
    isModify: boolean
    setIsModify: (e) => void
}

export default function FormatoAgregarCliente(props: propsType): JSX.Element {
    const theme = useContext(themeContext)

    const [codigo, setCodigo] = useState<string | number>('')
    const [cliente, setCliente] = useState<string>('')
    const [correo, setCorreo] = useState<string>('')
    const [direccion, setDireccion] = useState<string>('')
    const [pais, setPais] = useState<string>('')
    const [telefono, setTelefono] = useState<string>('')
    const [id, setID] = useState<string>('')

    useEffect((): void => {
        setCodigo(props.clienteSeleccionado.CODIGO)
        setCliente(props.clienteSeleccionado.CLIENTE)
        setCorreo(props.clienteSeleccionado.CORREO)
        setDireccion(props.clienteSeleccionado.DIRECCIÓN)
        setPais(props.clienteSeleccionado.PAIS_DESTINO)
        setTelefono(props.clienteSeleccionado.TELEFONO)
        setID(props.clienteSeleccionado.ID)
    }, [props.clienteSeleccionado])

    const handleGuardar = async (event): Promise<void> => {
        event.preventDefault()
        try {
            let response
            if(!props.isModify){
                const request = {
                    action:'ingresarCliente',
                    data:{
                        codigo:codigo,
                        cliente:cliente,
                        correo:correo,
                        direccion:direccion,
                        pais:pais,
                        telefono:telefono,
                        id:id
                    }
                }
                response = await window.api.contenedores(request);
            } else {
                const request = {
                    action:'modificarCliente',
                    data:{
                        codigo:codigo,
                        cliente:cliente,
                        correo:correo,
                        direccion:direccion,
                        pais:pais,
                        telefono:telefono,
                        id:id,
                        _id:props.clienteSeleccionado._id
                    }
                }
                response = await window.api.contenedores(request);

            }
         
            if(response.status === 200){
                reiniciarCampos()
                props.setIsModify(false)
                props.setShowSuccess(true)
                props.setMessage("Cliente guardado con exito!")
                setInterval(() => {
                  props.setShowSuccess(false)
                }, 5000)
            } else {
                props.setShowError(true)
                props.setMessage("Error guardando el cliente")
                setInterval(() => {
                    props.setShowError(false)
                }, 5000)
            }

        } catch (e) {
            props.setShowError(true)
            props.setMessage("Error obteniendo los datos del servidor" + e)
            setInterval(() => {
                props.setShowError(false)
            }, 5000)
        }
    }
    const reiniciarCampos = (): void => {
        setCodigo('')
        setCliente('')
        setCorreo('')
        setDireccion('')
        setTelefono('')
        setID('')
    }
    return (
        <div className="p-2">
            <div className="flex justify-center">
                <h2 className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-2xl font-bold`}>Agregar Cliente</h2>
            </div>
            <form className="p-6" onSubmit={handleGuardar} >
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Codigo
                    <input onChange={(e): void => setCodigo(e.target.value)} value={codigo} required type="number" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Cliente
                    <input onChange={(e): void => setCliente(e.target.value)} value={cliente} required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Correo
                    <input onChange={(e): void => setCorreo(e.target.value)} value={correo} required type="email" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>
                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Direccion
                    <input onChange={(e): void => setDireccion(e.target.value)} value={direccion} required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>

                <SelectPaises pais={pais} setPais={setPais} />

                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    Telefono
                    <input onChange={(e): void => setTelefono(e.target.value)} value={telefono} required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
                </label>

                <label className={`${theme === 'Dark' ? 'text-white' : 'text-black'} flex flex-col gap-1 mt-2`}>
                    ID
                    <input onChange={(e): void => setID(e.target.value)} value={id} required type="text" className="rounded-lg p-1 text-black border-solid border-2 border-Celifrut-green" />
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
