/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import { prediosType } from '../types/types'
import HeaderTableFurtaSinProcesar from '../utils/HeaderTableFurtaSinProcesar'
import React from 'react'

type propsType = {
  table: prediosType[]
  theme: string
  clickLote: (e) => void
}

export default function TableFrutaSinProcesar(props: propsType): JSX.Element {
  return (
    <div>
      <div className="grid grid-cols-9 gap-0 mt-0">
        <HeaderTableFurtaSinProcesar theme={props.theme} />
      </div>
      <div className="grid grid-cols-9 gap-0 mt-0">
        {props.table.map((lote, index) => (
          <React.Fragment key={lote._id}>
            <div

              className={`h-10 p-0 ol-span-1 text-[12px] flex justify-center items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              <input type="radio" onClick={props.clickLote} id={lote._id} value={lote._id} name='lote' ></input>
            </div>
            <div

              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote._id}
            </div>
            <div

              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.nombre}
            </div>
            <div

              className={`flex justify-center ol-span-1 text-[12px] items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.ICA}
            </div>
            <div
   
              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {format(new Date(lote.fecha), 'dd-MM-yyyy')}
            </div>
            <div

              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.KilosActual.toFixed(2)}
            </div>
            <div
 
              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.inventario}
            </div>
            <div
   
              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.tipoFruta}
            </div>
            <div

              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.observaciones}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
