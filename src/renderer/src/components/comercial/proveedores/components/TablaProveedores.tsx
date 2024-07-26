/* eslint-disable prettier/prettier */
import useAppContext from "@renderer/hooks/useAppContext";
import ConfirmacionModal from "@renderer/messages/ConfirmacionModal";
import { proveedoresType } from "@renderer/types/proveedoresType"
import { useEffect, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";

type propsType = {
    data: proveedoresType[]
    handleModificar: (proveedor) => void
    obtenerProveedores: () => void
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
        setMessage("¿Desea cambiar el estado del proveedor seleccionado?")
        setProveedoeDataSeleccionado(proveedor)
    }
    const eliminar = async (): Promise<void> => {
        try {
            const request = {
                action: 'inactivar_Proveesdor',
                _id: proveedorDataSeleccionado?._id
            }
            const response = await window.api.server2(request);
            if(response.status !== 200)
                throw new Error(response.message)
            messageModal("success","Proveedor eliminado con exito")
            props.obtenerProveedores()
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
                            <td>
                            <button style={{ color: "red" }} onClick={():void => handleEliminar(proveedor)}>
                                {proveedor.activo ? 
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="green" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" /></svg>
                                :
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="red" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" /></svg>
                            }
                            </button>

                            </td>
                            <td>
                                <button style={{ color: "blue" }} onClick={():void => props.handleModificar(proveedor)}><PiNotePencilDuotone /></button>
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