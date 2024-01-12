/* eslint-disable prettier/prettier */

import { format } from "date-fns"
import { registrosType } from "../type/type"

type propsType = {
    data: registrosType[]
}
export default function TablaVolantecalidad(props: propsType): JSX.Element {
    return (
        <div className="pr-2 m-2">
            <table className={`mr-2 ml-2 w-full mt-2 border-2 m-2 rounded-t-lg overflow-hidden`}>
                <thead className={`bg-Celifrut-green`} >
                    <tr className="h-14 broder-2 ">
                        <th className="text-white">Fecha</th>
                        <th className="text-white">Tipo de fruta</th>
                        <th className="text-white">Operario</th>
                        <th className="text-white">Unidades Revisadas</th>
                        <th className="text-white">Número de defecto</th>
                    </tr>
                </thead>
                <tbody className="border-2">
                    {props.data.map((item, index) => (
                        <tr key={item._id}   className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
                             <td className="p-2 text-sm text-center">{format(new Date(item.fecha), 'dd-MM-yyyy')}</td>
                             <td className="p-2 text-sm text-center">{item.fruta}</td>
                             <td className="p-2 text-sm text-center">{item.operario}</td>
                             <td className="p-2 text-sm text-center">{item.unidades}</td>
                             <td className="p-2 text-sm text-center">{item.defecto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
