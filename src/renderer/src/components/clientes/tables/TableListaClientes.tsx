/* eslint-disable prettier/prettier */

import { useContext } from "react"
import { clientesType } from "../type/type"
import { themeContext } from "@renderer/App"
import { PiNotePencilDuotone } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";

type propsType = {
    data: clientesType[]
}

export default function TableListaClientes(props: propsType): JSX.Element {
    const theme = useContext(themeContext)
    return (
        <div>
            <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
                <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <tr className="h-14 broder-2">
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-10 text-xs`}>Codigo</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs`}>Cliente</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs`}>Correo</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs`}>Dirección</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs`}>Pais destino</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs`}>Telefono</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs`}>ID</th>
                        <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs`}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.data) && props.data.map((cliente, index) => (
                        <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}>
                            <td className="p-2 text-xs  text-center">{cliente.CODIGO}</td>
                            <td className="p-2 text-xs  text-center">{cliente.CLIENTE}</td>
                            <td className="p-2 text-xs  text-center overflow-hidden">{cliente.CORREO}</td>
                            <td className="p-2 text-xs  text-center overflow-hidden">{cliente.DIRECCIÓN}</td>
                            <td className="p-2 text-xs  text-center overflow-hidden">{cliente.PAIS_DESTINO}</td>
                            <td className="p-2 text-xs  text-center overflow-hidden">{cliente.TELEFONO}</td>
                            <td className="p-2 text-xs  text-center overflow-hidden">{cliente.ID}</td>
                            <td className="p-2 text-ms ">
                                <div className="flex flex-row gap-4 justify-center items-center">
                                    <div className="text-blue-700 cursor-pointer hover:font-bold"><PiNotePencilDuotone /></div>
                                    <div className="text-red-600 cursor-pointer hover:font-bold"><RiDeleteBin5Fill /></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
