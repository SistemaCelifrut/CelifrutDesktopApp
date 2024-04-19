/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext";
import ConfirmacionModal from "@renderer/messages/ConfirmacionModal";
import { operariosType } from "@renderer/types/operariosType"
import { format } from "date-fns"
import { useEffect, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";

type propsType = {
    operarios: operariosType[]
    handleModificar: (operario) => void
}
export default function TablaOperarios (props:propsType):JSX.Element {
    const {messageModal} = useAppContext()
    const headers = ["Nombre","Apellido","Cargo","Estado","Telefono","Email","Diección","Genero","Cumpleaños",""]
    const [showConfirmacion, setShowConfirmacion] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [operarioDataSeleccionado, setOperarioDataSeleccionado] = useState<operariosType>()
    if (!props.operarios) {
        return <div>Cargando...</div>; // O cualquier otro indicador de carga que prefieras
    }
    useEffect(() => {
        if (confirm) {
            eliminar()
            setConfirm(false)
        }
    }, [confirm]);
    const handleEliminar = (operario): void => {
        setShowConfirmacion(true)
        setMessage("¿Desea eliminar el operario seleccionado?")
        setOperarioDataSeleccionado(operario)
    }
    const eliminar = async (): Promise<void> => {
        try {
            const request = {
                collection: 'users',
                action: 'deleteOperario',
                query: 'postgreDB',
                data: operarioDataSeleccionado?.id
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
    return(
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
                    {props.operarios.map((item, index) => (
                        <tr key={item.id} className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`}>
                            <td>{item.nombre}</td>
                            <td>{item.apellido}</td>
                            <td>{item.cargo}</td>
                            <td>{item.estado}</td>
                            <td>{item.telefono ? item.telefono : "N/A"}</td>
                            <td>{item.correo_electronico ? item.correo_electronico : "N/A"}</td>
                            <td>{item.direccion ? item.direccion : "N/A"}</td>
                            <td>{item.genero ? item.genero : "N/A"}</td>
                            <td>{item.fecha_nacimiento ? format(new Date(item.fecha_nacimiento), 'dd-MM-yyyy'): "N/A"}</td>
                            <td>
                                <button style={{ color: "blue" }} onClick={():void => props.handleModificar(item)}><PiNotePencilDuotone /></button>
                                <button style={{ color: "red" }} onClick={(): void => handleEliminar(item)} ><RiDeleteBin5Fill /></button>
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