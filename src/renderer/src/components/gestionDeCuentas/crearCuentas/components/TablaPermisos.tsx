/* eslint-disable prettier/prettier */

import { userType } from "@renderer/types/cuentas"
import { Fragment, useEffect, useState } from "react"
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";

type propsTypes = {
    usuario: userType
}

export default function TablaPermisos(props: propsTypes): JSX.Element {
    const [areaSeleccionada, setAreaSeleccionada] = useState<string>("");
    const [areas, setAreas] = useState<object>({});
    useEffect(() => {
        const objPermisos = {}
        const data = props.usuario.nombres_permisos.map(item => item.split("//"))
         data.forEach(item => {
            if(!Object.prototype.hasOwnProperty.call(objPermisos, item[0])){
                objPermisos[item[0]] = {}
            }
            if(!Object.prototype.hasOwnProperty.call(objPermisos[item[0]], item[1])){
                objPermisos[item[0]][item[1]] = []
            }
            objPermisos[item[0]][item[1]].push(item[2])
         });
        setAreas(objPermisos)
    }, [])

    const handleClick = (e): void => {
        if (areaSeleccionada !== "") {
            setAreaSeleccionada("")
        }
        else {
            setAreaSeleccionada(e)
        }
    }
    return (
        <div className="usuarios-tabla-permisos-container">
            {Object.keys(areas).map(area => (
                <Fragment key={area}>
                    <div className="usuarios-tabla-permisos-areas" onClick={(): void => handleClick(area)}>
                        {area}
                        {area === areaSeleccionada ?
                            <FaArrowCircleUp /> :
                            <FaArrowCircleDown />
                        }
                    </div>
                    <div className="usuarios-tabla-permisos-secciones">
                        {Object.keys(areas[area]).map(section => {
                            if(area === areaSeleccionada){
                                return (
                                <div key={section} className="elemento">
                                    {section}:
                                    {areas[area][section].map(item => (
                                        <div className="item" key={item}>{item} - </div>

                                    ))}
                                </div>
                                )
                            }else{
                                return null
                            }
                        })}
                    </div>
                </Fragment>
            ))}
        </div>
    )
}