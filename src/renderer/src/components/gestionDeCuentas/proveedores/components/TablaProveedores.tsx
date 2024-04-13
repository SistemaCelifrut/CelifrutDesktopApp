/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext";
import ConfirmacionModal from "@renderer/messages/ConfirmacionModal";
import { proveedoresType } from "@renderer/types/proveedoresType"
import { useEffect, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";

type propsType = {
    data: proveedoresType[]
    handleModificar: (proveedor) => void
}
export default function TableProveedores(props: propsType): JSX.Element {
    const {messageModal} = useAppContext()
    const headers = ["Codigo", "PREDIO", "ICA", "Limon", "Naranja", "Mandarina", "Departamento", "Proveedores", "GGN", "Vencimiento GGN", "Estado","Acciones"]
    const [showConfirmacion, setShowConfirmacion] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [proveedorDataSeleccionado, setProveedoeDataSeleccionado] = useState<proveedoresType>()
    useEffect(() => {
        if (confirm) {
            eliminar()
            setConfirm(false)
        }
    }, [confirm]);
    const handleEliminar = (proveedor): void => {
        setShowConfirmacion(true)
        setMessage("¿Desea eliminar el usuario seleccionado?")
        setProveedoeDataSeleccionado(proveedor)
    }
    const eliminar = async (): Promise<void> => {
        try {
            const request = {
                collection: 'proveedors',
                action: 'deleteProveedores',
                query: 'proceso',
                data: proveedorDataSeleccionado?._id
            }
            console.log(request)
            const response = await window.api.server(request);
            if(response.status !== 200)
                throw new Error(response.message)
            messageModal("success","Proveedor eliminado con exito")
            console.log(response)
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
                    {props.data.map((proveedor, index) => (
                        <tr key={proveedor._id} className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} >
                            <td>{proveedor["CODIGO INTERNO"]}</td>
                            <td>{proveedor.PREDIO}</td>
                            <td>{proveedor.ICA}</td>
                            <td>{proveedor.L}</td>
                            <td>{proveedor.N}</td>
                            <td>{proveedor.M}</td>
                            <td>{proveedor.DEPARTAMENTO}</td>
                            <td>{proveedor.PROVEEDORES}</td>
                            <td>{proveedor.GGN}</td>
                            <td>{proveedor["FECHA VENCIMIENTO GGN"]}</td>
                            <td>{proveedor.activo ? "Activo" : "Inactivo"}</td>
                            <td>
                                <button style={{ color: "blue" }} onClick={():void => props.handleModificar(proveedor)}><PiNotePencilDuotone /></button>
                                <button style={{ color: "red" }} onClick={():void => handleEliminar(proveedor)}><RiDeleteBin5Fill /></button>
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