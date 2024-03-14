/* eslint-disable prettier/prettier */
import { useContext } from "react"
import { themeContext } from "@renderer/App"
import { format } from "date-fns"
import { lotesType } from "@renderer/types/lotesType"

type propsType = {
  data: lotesType[]
}

const ordenar = (a, b): number => {
  const numA = parseInt(a._id.substring(8));
  const numB = parseInt(b._id.substring(8));
  return numB - numA;
}

export default function TableHistorialCalidadInterna(props: propsType): JSX.Element {
  const theme = useContext(themeContext)
  return (
    <div>
      <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>EF1</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Predio</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>tipoFruta</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Acidez</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Brix</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Ratio</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Zumo</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} text-sm`}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(props.data) && props.data.sort(ordenar).map((lote, index) => (
            <tr
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}
            >
              <td className="p-2 text-sm  text-center">{lote.enf}</td>
              <td className="p-2 text-sm  text-center">{lote.predio && lote.predio.PREDIO}</td>
              <td className="p-2 text-sm  text-center">{lote.tipoFruta}</td>
              <td className="p-2 text-sm  text-center">{lote.calidad && lote.calidad.calidadInterna !== undefined ? Number(lote.calidad.calidadInterna.acidez).toFixed(2) : 0.0}</td>
              <td className="p-2 text-sm  text-center">{lote.calidad && lote.calidad.calidadInterna !== undefined ? Number(lote.calidad.calidadInterna.brix).toFixed(2) : 0.0}</td>
              <td className="p-2 text-sm  text-center">{lote.calidad && lote.calidad.calidadInterna !== undefined ? Number(lote.calidad.calidadInterna.ratio).toFixed(2) : 0.0}</td>
              <td className="p-2 text-sm  text-center">{lote.calidad && lote.calidad.calidadInterna !== undefined ? Number(lote.calidad.calidadInterna.zumo).toFixed(2) : 0.0}</td>
              <td className="p-2 text-sm  text-center">
                {lote.calidad && Object.prototype.hasOwnProperty.call(lote.calidad.calidadInterna, 'fecha') ?
                  format(lote.calidad.calidadInterna ? new Date(lote.calidad.calidadInterna.fecha) : new Date(), 'dd-MM-yyyy') : null}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
