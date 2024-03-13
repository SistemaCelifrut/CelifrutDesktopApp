/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import HeaderTableFurtaSinProcesar from '../utils/HeaderTableFurtaSinProcesar'
import React from 'react'
import { lotesType } from '@renderer/types/lotesType'

type propsType = {
  table: lotesType[]
  propsModal: lotesType
  clickLote: (e) => void
}

export default function TableFrutaSinProcesar(props: propsType): JSX.Element {

  const handleClick = (e): void => {
      props.clickLote(e);
  };
  return (
    <div>
      <div className="grid grid-cols-9 gap-0 mt-0">
        <HeaderTableFurtaSinProcesar/>
      </div>
      <div className="grid grid-cols-9 gap-0 mt-0">
        {props.table.sort().map((lote, index) => (
          <React.Fragment key={lote.enf}>
            <div

              className={`h-10 p-0 ol-span-1 text-[12px] flex justify-center items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              <input 
                type="radio" 
                onChange={handleClick} 
                id={lote.enf} 
                value={lote.enf} 
                name='lote' ></input>
            </div>
            <div

              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.enf}
            </div>
            <div

              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.predio && lote.predio.PREDIO}
            </div>
            <div

              className={`flex justify-center ol-span-1 text-[12px] items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.predio && lote.predio.ICA}
            </div>
            <div
   
              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.fechaIngreso ? format(new Date(lote.fechaIngreso), 'dd-MM-yyyy') : ""}
            </div>
            <div

              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {(lote.inventarioActual?.inventario && lote.promedio) ? (lote.inventarioActual.inventario * lote.promedio).toFixed(2) : 0}
            </div>
            <div
 
              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              { lote.inventarioActual?.inventario && lote.inventarioActual.inventario}
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
