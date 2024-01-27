/* eslint-disable prettier/prettier */
import { promedioOperarioType } from "../type/type"

type propsType = {
  data: promedioOperarioType[]
}
export default function TableResumenVolanteCalidad(props: propsType): JSX.Element {
  return (
    <div className="pr-2 ">
      <table className={`mr-2 ml-2 w-full mt-2 border-2 m-2 rounded-lg overflow-hidden border-solid border-t-4 border-white`}>
        <thead className={`bg-Celifrut-green-dark `} >
          <tr className="h-14 broder-2 ">
            <th className="text-white">Operario</th>
            <th className="text-white">Porcentage total</th>
          </tr>
        </thead>
        <tbody className="border-2">
          {props.data.map((item, index) => (
            <tr key={item.operario} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}>
              <td className="p-2 text-sm text-center">{item.operario}</td>
              <td className="p-2 text-sm text-center">{item.porcentaje.toFixed(2) + '%'}</td>
            </tr>
          ))}
          <tr className="bg-Celifrut-green-dark">
            <td className="p-2 text-sm text-center text-white">Promedio Total</td>
            <td className="p-2 text-sm text-center text-white">
              {(props.data.reduce((acu, item) => acu += item.porcentaje, 0) / props.data.length).toFixed(2) + '%'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}
