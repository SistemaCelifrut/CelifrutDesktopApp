/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext, useEffect, useState } from "react"
import { IoIosAddCircle } from "react-icons/io";
import TableListaClientes from "../tables/TableListaClientes";
import { clientesType } from "../type/type";
import { TfiBackLeft } from "react-icons/tfi";
import FormatoAgregarCliente from "./FormatoAgregarCliente";
import { clienteDefault } from "../functions/functions";

type propsType = {
    setShowSuccess: (e) => void
    setShowError: (e) => void
    setMessage: (e) => void
}

export default function ListaClientes(props: propsType): JSX.Element {
    const theme = useContext(themeContext)
    const [data, setData] = useState<clientesType[]>([])
    const [dataOriginal, setDataOriginal] = useState<clientesType[]>([])
    const [showFormulario, setShowFormulario] = useState<boolean>(false)
    const [clienteSeleccionado, setClienteSeleccionado] = useState<clientesType>(clienteDefault)
    const [isModify, setIsModify] = useState<boolean>(false)
    const [filtro, setFiltro] = useState<string>('')
    useEffect(() => {
        const obtenerClientes = async (): Promise<void> => {
            try {
                const request = { action: 'obtenerClientes' }
                const response = await window.api.contenedores(request)
                if (response.status === 200) {
                    setData(response.data)
                    setDataOriginal(response.data)
                } else {
                    props.setShowError(true)
                    props.setMessage("Error obteniendo los datos del servidor")
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
        obtenerClientes()
    }, [showFormulario])
    useEffect(() => {
        setData(dataOriginal.filter(item => item.CLIENTE.toLowerCase().includes(filtro)))
        console.log(data)
    }, [filtro])
    const eliminarCliente = async (id): Promise<void> => {
        try{
            console.log(id)
            const request = {
                action: "eliminarCliente",
                data:id
            }
            const response = await window.api.contenedores(request);
            if(response.status === 200){
                const request = { action: 'obtenerClientes' }
                const response = await window.api.contenedores(request)
                if (response.status === 200) {
                    setData(response.data)
                } else {
                    props.setShowError(true)
                    props.setMessage("Error obteniendo los datos del servidor")
                    setInterval(() => {
                        props.setShowError(false)
                    }, 5000)
                }
                props.setShowSuccess(true)
                props.setMessage("Cliente eliminado con exito!")
                setInterval(() => {
                  props.setShowSuccess(false)
                }, 5000)
            } else {
                props.setShowError(true)
                props.setMessage("Error eliminando el cliente")
                setInterval(() => {
                    props.setShowError(false)
                }, 5000)
            }
        } catch (e) {
            props.setShowError(true)
            props.setMessage("Error enviando los datos al servidor" + e)
            setInterval(() => {
                props.setShowError(false)
            }, 5000)
        }
    }
    const modificarCliente = (data): void =>{
        setIsModify(true);
        setClienteSeleccionado(data)
        setShowFormulario(true)
    }
    return (
        <div className="p-2">
            <div className={`${theme === 'Dark' ? 'bg-gray-500' : 'bg-gray-200'} p-3 rounded-lg shadow-lg`}>
                <div className={`${theme === 'Dark' ? 'text-white' : 'text-black'}
            text-2xl font-bold  transition-all border-b-2 duration-500 ease-in-out  hover:text-Celifrut-green hover:border-b-2  hover:border-Celifrut-green`}>
                    <h2>Clientes</h2>
                </div>
                <div className="flex felx-row gap-7 items-center ml-5">
                    <button type="button"
                        onClick={(): void => setShowFormulario(!showFormulario)}
                        className="my-4 py-3 w-28 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-Celifrut-green text-white hover:bg-Celifrut-green-dark disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                        {showFormulario ?
                            <div className="flex flex-row items-center gap-2">Volver <TfiBackLeft /></div> :
                            <div className="flex flex-row items-center gap-2"> Agregar <IoIosAddCircle /></div>}
                    </button>
                    <input type="text" onChange={(e): void => setFiltro(e.target.value)} className="rounded-lg h-10 pl-2" placeholder="Buscar..." />
                </div>
            </div>
            <div className="mt-2">
                {showFormulario ? 
                <FormatoAgregarCliente 
                    setIsModify={setIsModify}
                    isModify={isModify}
                    clienteSeleccionado={clienteSeleccionado}
                    setMessage={props.setMessage} 
                    setShowError={props.setShowError}
                    setShowSuccess={props.setShowSuccess}
                    setShowFormulario={setShowFormulario} />:
                <TableListaClientes 
                    data={data} 
                    eliminarCliente={eliminarCliente}
                    modificarCliente={modificarCliente} />}
            </div>
        </div>
    )
}
