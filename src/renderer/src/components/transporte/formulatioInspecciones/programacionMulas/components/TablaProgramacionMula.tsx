/* eslint-disable prettier/prettier */

import { PiNotePencilDuotone } from "react-icons/pi";
import { useEffect, useState } from "react";
import { contenedoresType } from "@renderer/types/contenedoresType";

type propsType = {
    contenedores: contenedoresType[]
    handleModificar: (cliente) => void
}

export default function TablaProgramacionMula(props: propsType): JSX.Element {
    const headers = ["Contenedor","Placa","Trailer","Conductor","Cedula","Celular","Color","Modelo","Marca","Prof","Puerto","Naviera","Aduanas", ""]
    const [confirm, setConfirm] = useState<boolean>(false)

    if (!props.contenedores) {
        return <div>Cargando...</div>; // O cualquier otro indicador de carga que prefieras
    }
    useEffect(() => {
        if (confirm) {
            setConfirm(false)
        }
    }, [confirm]);

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
                    {props.contenedores.map((contenedor, index) => (
                        <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={contenedor._id}>
                            <td>{contenedor.numeroContenedor}</td>
                            <td>{contenedor.formularioInspeccionMula?.placa}</td>
                            <td>{contenedor.formularioInspeccionMula?.trailer}</td>
                            <td>{contenedor.formularioInspeccionMula?.conductor}</td>
                            <td>{contenedor.formularioInspeccionMula?.cedula}</td>
                            <td>{contenedor.formularioInspeccionMula?.celular}</td>
                            <td>{contenedor.formularioInspeccionMula?.color}</td>
                            <td>{contenedor.formularioInspeccionMula?.modelo}</td>
                            <td>{contenedor.formularioInspeccionMula?.marca}</td>
                            <td>{contenedor.formularioInspeccionMula?.prof}</td>
                            <td>{contenedor.formularioInspeccionMula?.puerto}</td>
                            <td>{contenedor.formularioInspeccionMula?.naviera}</td>
                            <td>{contenedor.formularioInspeccionMula?.agenciaAduanas}</td>
                            <td>
                                <button style={{ color: "blue" }} onClick={():void => props.handleModificar(contenedor)}><PiNotePencilDuotone /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    

        </>
    )
}
