/* eslint-disable prettier/prettier */
import { lotesInventarioType } from '../types/clasificacionTypes'

type propsType = {
  lotesData: lotesInventarioType[]
  setLote: (enf: string) => void
}

export default function NavClasificacionCalidad(props: propsType):JSX.Element {
  return (
    <div
      className={`w-[100%] h-16 flex justify-between items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5`}
    >
      <select
        onChange={(e): void => props.setLote(e.target.value)}
        className={`border focus:outline-none appearance-none w-2/5 mr-5 rounded-md h-10 pl-5 pr-10
                        ${'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '}`}
      >
        <option>Lotes</option>
        {props.lotesData.map((lote) => (
          <option key={lote.id} value={lote.id}>{lote.id + ' ' + ' ' + lote.nombre}</option>
        ))}
      </select>
    </div>
  )
}
