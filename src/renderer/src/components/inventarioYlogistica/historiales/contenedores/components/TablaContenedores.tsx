/* eslint-disable prettier/prettier */
import { contenedoresType } from "@renderer/types/contenedoresType";
import HeaderPrincipalContenedores from "./HeaderPrincipalContenedores";
import { format } from "date-fns";
import React, { useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import TablaListaDeEmpaque from "./TablaListaDeEmpaque";
import { FaArrowCircleUp } from "react-icons/fa";
import TablaInfoContenedor from "./TablaInfoContenedor";
import TablaInspeccionMula from "./TablaInspeccionMula";
import { GrDocumentMissing } from "react-icons/gr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

type propsType = {
    data: contenedoresType[]
}

export default function TablaContenedores(props: propsType): JSX.Element {
    const [opcion, setOpcion] = useState<string>("")
    const [contenedorSeleccionado, setContenedorSeleccionado] = useState<string>("");
    const handleClick = (e, id): void => {
        if (opcion !== "") {
            setOpcion("")
            setContenedorSeleccionado("")
        }
        else {
            setOpcion(e)
            setContenedorSeleccionado(id)
        }
        console.log(contenedorSeleccionado)
    }
    const handleAccederDocumento = (enlace): void => {
        window.open(enlace, '_blank');
    };
    return (
        <table className="table-main">
            <HeaderPrincipalContenedores />
            <tbody>
                {props.data.map((contenedor, index) => (
                    <React.Fragment key={contenedor._id}>
                        <tr className={`${index % 2 === 0 ? 'fondo-par' : 'fondo-impar'}`} key={index} >
                            <td>
                                {contenedor.numeroContenedor}
                            </td>
                            <td>
                                {contenedor.infoContenedor?.clienteInfo?.CLIENTE}
                            </td>
                            <td>
                                {format(contenedor.infoContenedor?.fechaCreacion ?
                                    new Date(contenedor.infoContenedor?.fechaCreacion) :
                                    new Date(), 'dd-MM-yy')}
                            </td>
                            <td onClick={(): void => handleClick("listaEmpaque", contenedor._id)}>
                                <div>
                                    <p>Ver lista de empaque</p>
                                    {opcion === "listaEmpaque" && contenedorSeleccionado === contenedor._id ?
                                        <FaArrowCircleUp /> :
                                        <FaArrowCircleDown />
                                    }
                                </div>
                            </td>
                            <td onClick={(): void => handleClick("infoContenedor", contenedor._id)}>
                                <div>
                                    <p>Informacion del contenedor</p>
                                    {opcion === "infoContenedor" && contenedorSeleccionado === contenedor._id ?
                                        <FaArrowCircleUp /> :
                                        <FaArrowCircleDown />
                                    }
                                </div>
                            </td>
                            <td onClick={(): void => handleClick("infoInspeccion", contenedor._id)}>
                                <div>
                                    <p>Ver formato inspeccion</p>
                                    {opcion === "infoInspeccion" && contenedorSeleccionado === contenedor._id ?
                                        <FaArrowCircleUp /> :
                                        <FaArrowCircleDown />
                                    }
                                </div>
                            </td>
                            <td >
                                {Object.prototype.hasOwnProperty.call(contenedor.infoContenedor, "urlInforme") ?
                                    <button
                                        onClick={(): void => handleAccederDocumento(contenedor.infoContenedor?.urlInforme)}>
                                        <FontAwesomeIcon icon={faFileAlt} />
                                    </button>
                                    :
                                    <div className="table-main-noDocument"><GrDocumentMissing /></div>
                                }
                            </td>
                        </tr>
                        {opcion !== '' && contenedorSeleccionado === contenedor._id &&
                            <tr>
                                <td colSpan={7}>
                                    {opcion === "listaEmpaque" && <TablaListaDeEmpaque contenedor={contenedor} />}
                                    {opcion === "infoContenedor" && <TablaInfoContenedor contenedor={contenedor} />}
                                    {opcion === "infoInspeccion" && <TablaInspeccionMula contenedor={contenedor} />}

                                </td>

                            </tr>
                        }
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}