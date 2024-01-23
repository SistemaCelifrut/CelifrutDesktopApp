/* eslint-disable prettier/prettier */

import { themeContext } from "@renderer/App"
import { useContext } from "react"
import { contenedoresType } from "../type/types"
import { format } from "date-fns"
import { FcOk } from 'react-icons/fc'
import { FcCancel } from 'react-icons/fc'

type propsType = {
    data: contenedoresType[]
}

export default function TableContenedores(props: propsType): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div>

            <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
                <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <tr className="h-14 broder-2">
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Contenedor</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Cliente</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha de creación</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha de salida</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Tipo de fruta</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Cerrado</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Desverdizado</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.data) && props.data.map((contenedor, index) => (
                        <tr
                            className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}
                        >
                            <td className="p-2 text-sm  text-center">{contenedor._id}</td>
                            <td className="p-2 text-sm  text-center">{contenedor.infoContenedor.nombreCliente}</td>
                            <td className="p-2 text-sm  text-center">{format(new Date(contenedor.infoContenedor.fechaCreacion), 'dd-MM-yyyy')}</td>
                            <td className="p-2 text-sm  text-center">{
                            Object.prototype.hasOwnProperty.call(contenedor.infoContenedor , 'fechaSalida') ?  format(new Date(contenedor.infoContenedor.fechaSalida), 'dd-MM-yyyy') : ''
                            }</td>
                            <td className="p-2 text-sm  text-center">{contenedor.infoContenedor.tipoFruta}</td>
                            <td className="p-2 text-sm"><div className="flex justify-center items-center">{contenedor.infoContenedor.cerrado ? <FcOk /> : <FcCancel />}</div></td>
                            <td className="p-2 text-sm"><div className="flex justify-center items-center">{contenedor.infoContenedor.desverdizado ? <FcOk /> : <FcCancel /> }</div></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
