/* eslint-disable prettier/prettier */

import { PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { clienteType } from "@renderer/types/clientesType";
import ConfirmacionModal from "@renderer/messages/ConfirmacionModal";
import { useEffect, useState } from "react";
import useAppContext from "@renderer/hooks/useAppContext";

type propsType = {
    clientes: clienteType[]
    handleModificar: (cliente) => void
}

export default function TableListaClientes(props: propsType): JSX.Element {
    const {messageModal} = useAppContext()
    const headers = ["Codigo", "Cliente", "Correo", "DIrección", "Pais destino", "Telefono", "ID", "Acciones"]
    const [showConfirmacion, setShowConfirmacion] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [clienteDataSeleccionado, setClienteDataSeleccionado] = useState<clienteType>()

    if (!props.clientes) {
        return <div>Cargando...</div>; // O cualquier otro indicador de carga que prefieras
    }
    useEffect(() => {
        if (confirm) {
            eliminar()
            setConfirm(false)
        }
    }, [confirm]);
    const handleEliminar = (cliente): void => {
        setShowConfirmacion(true)
        setMessage("¿Desea eliminar el cliente seleccionado?")
        setClienteDataSeleccionado(cliente)
    }
    const eliminar = async (): Promise<void> => {
        try {
            const request = {
                collection: 'clientes',
                action: 'deleteCliente',
                query: 'proceso',
                data: clienteDataSeleccionado?._id
            }
            const response = await window.api.server(request);
            if(response.status !== 200)
                throw new Error(response.message)
            messageModal("success","Usuario eliminado con exito")
        } catch (e) {
            if (e instanceof Error)
                messageModal("error", e.message)
        }
    }
    return (
        <>
            <table className="table-main">
                <thead>
                    <tr>
                        {headers.map(item => (
                            <th key={item}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.clientes.map((cliente, index) => (
                        <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={cliente.ID}>
                            <td>{cliente.CODIGO}</td>
                            <td>{cliente.CLIENTE}</td>
                            <td>{cliente.CORREO}</td>
                            <td>{cliente.DIRECCIÓN}</td>
                            <td>{cliente.PAIS_DESTINO}</td>
                            <td>{cliente.TELEFONO}</td>
                            <td>{cliente.ID}</td>
                            <td>
                                <button style={{ color: "blue" }} onClick={():void => props.handleModificar(cliente)}><PiNotePencilDuotone /></button>
                                <button style={{ color: "red" }} onClick={():void => handleEliminar(cliente)}><RiDeleteBin5Fill /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showConfirmacion &&
                <ConfirmacionModal
                    message={message}
                    setConfirmation={setConfirm}
                    setShowConfirmationModal={setShowConfirmacion} />}

        </>
    )
}
