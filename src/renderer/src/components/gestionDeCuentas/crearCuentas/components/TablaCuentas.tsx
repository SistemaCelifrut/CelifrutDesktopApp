/* eslint-disable prettier/prettier */
import { userType } from "@renderer/types/cuentas"
import { Fragment, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import TableInfoUsuario from "./TableInfoUsuario";
import TablaPermisos from "./TablaPermisos";

type propsType = {
    data: userType[] | undefined
}
export default function TablaCuentas(props: propsType): JSX.Element {
    const [opcion, setOpcion] = useState<string>("")
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string>("");
    const headers = ["Usuario", "Nombre", "Apellido", "Info Usuario", "Permisos", "Acciones"]
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
    return (
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
                                <button style={{ color: "blue" }}><PiNotePencilDuotone /></button>
                                <button style={{ color: "red" }}><RiDeleteBin5Fill /></button>
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
    )
}