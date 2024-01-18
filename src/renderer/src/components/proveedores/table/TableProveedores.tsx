/* eslint-disable prettier/prettier */
import { useContext } from "react"
import { proveedoresType } from "../type/type"
import { themeContext } from "@renderer/App"

type propsType = {
    data: proveedoresType[]
}

export default function TableProveedores(props:propsType): JSX.Element {
    const theme = useContext(themeContext)
  return (
    <div>
             <table
      className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}
      >
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2 ">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto `}>Codigo interno</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>Predio</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>ICA</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-10`}>N</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-10`}>L</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-10`}>M</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-auto`}>Departamento</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-xs w-auto`}>proveedores</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>GGN</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>Fecha de vencimiento GGN</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm w-auto`}>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {props.data.map((proveedor, index) => (
                  <tr
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                    key={index}
                  >
              <td className="p-2 text-sm text-center">{proveedor["CODIGO INTERNO"]}</td>
              <td className="p-2 text-sm text-center">{proveedor.PREDIO}</td>
              <td className="p-2 text-sm text-center">{proveedor.ICA}</td>
              <td className="p-2 text-sm text-center">{proveedor.N}</td>
              <td className="p-2 text-sm text-center">{proveedor.L}</td>
              <td className="p-2 text-sm text-center">{proveedor.M}</td>
              <td className="p-2 text-sm text-center">{proveedor.DEPARTAMENTO}</td>
              <td className="p-2 text-sm text-center">{proveedor.PROVEEDORES}</td>
              <td className="p-2 text-sm text-center">{proveedor.GGN}</td>
              <td className="p-2 text-sm text-center">{proveedor["FECHA VENCIMIENTO GGN"]}</td>
              <td className="p-2 text-center">
              <button
                    type="submit"
                    className="my-4 py-3 px-4 w-24 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-Celifrut-green text-white hover:bg-Celifrut-green-dark disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                    Modificar
                </button>
                <button
                    type="submit"
                    className="my-4 py-3 px-4 w-24 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-Celifrut-green text-white hover:bg-Celifrut-green-dark disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                    Eliminar
                </button>
              </td>

                  </tr>
            ))}
        </tbody>
        </table>
    </div>
  )
}
