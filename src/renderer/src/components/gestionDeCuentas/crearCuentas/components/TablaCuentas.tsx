/* eslint-disable prettier/prettier */
import { userType } from "@renderer/types/cuentas"
import { Fragment, useEffect, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import TableInfoUsuario from "./TableInfoUsuario";
import TablaPermisos from "./TablaPermisos";
import useAppContext from "@renderer/hooks/useAppContext";
import ConfirmacionModal from "@renderer/messages/ConfirmacionModal";

type propsType = {
    data: userType[] | undefined
    handleModificar: (usuario) => void
}
export default function TablaCuentas(props: propsType): JSX.Element {

    const { messageModal } = useAppContext()
    const [opcion, setOpcion] = useState<string>("")
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string>("");
    const [usuarioDataSeleccionado, setUsuarioDataSeleccionado] = useState<userType>()
    const headers = ["Usuario", "Nombre", "Apellido", "Info Usuario", "Permisos", "Acciones"]
    const [showConfirmacion, setShowConfirmacion] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        if (confirm) {
            eliminar()
            setConfirm(false)
        }
    }, [confirm]);

    if (!props.data) {
        return <div>Cargando...</div>; // O cualquier otro indicador de carga que prefieras
    }
    const handleClick = (e, id): void => {
        if (opcion !== "") {
            setOpcion("")
            setUsuarioSeleccionado("")
        }
        else {
            setOpcion(e)
            setUsuarioSeleccionado(id)
        }
    }
    const handleEliminar = (usuario): void => {
        setShowConfirmacion(true)
        setMessage("¿Desea eliminar el proveedor seleccionado?")
        setUsuarioDataSeleccionado(usuario)
    }
    const eliminar = async (): Promise<void> => {
        try {
            const request = {
                collection: 'users',
                action: 'deleteUser',
                query: 'postgreDB',
                data: usuarioDataSeleccionado?.usuario_id
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
                    {props.data.map(usuario => (
                        <Fragment key={usuario.usuario_id}>
                            <tr >
                                <td>{usuario.usuario}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>
                                    <div onClick={(): void => handleClick("info-usuario", usuario.usuario_id)}>
                                        <p>Info Usuario</p>
                                        {opcion === "info-usuario" && usuarioSeleccionado === usuario.usuario_id ?
                                            <FaArrowCircleUp /> :
                                            <FaArrowCircleDown />
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div onClick={(): void => handleClick("permisos", usuario.usuario_id)}>
                                        <p>Permisos</p>
                                        {opcion === "permisos" && usuarioSeleccionado === usuario.usuario_id ?
                                            <FaArrowCircleUp /> :
                                            <FaArrowCircleDown />
                                        }
                                    </div>
                                </td>
                                <td>
                                    <button onClick={():void => props.handleModificar(usuario)} style={{ color: "blue" }}><PiNotePencilDuotone /></button>
                                    <button onClick={(): void => handleEliminar(usuario)} style={{ color: "red" }}><RiDeleteBin5Fill /></button>
                                </td>
                            </tr>
                            {opcion !== '' && usuarioSeleccionado === usuario.usuario_id &&
                                <tr>
                                    <td colSpan={7}>
                                        {opcion === "info-usuario" && <TableInfoUsuario usuario={usuario} />}
                                        {opcion === "permisos" && <TablaPermisos usuario={usuario} />}

                                    </td>
                                </tr>
                            }
                        </Fragment>
                    ))}
                </tbody>
            </table>

            {showConfirmacion &&
                <ConfirmacionModal
                    message={message}
                    setConfirmation={setConfirm}
                    setShowConfirmationModal={setShowConfirmacion} />}</>
    )
}