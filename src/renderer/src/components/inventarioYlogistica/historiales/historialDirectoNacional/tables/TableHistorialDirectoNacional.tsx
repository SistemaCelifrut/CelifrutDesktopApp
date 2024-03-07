/* eslint-disable prettier/prettier */
import { format } from 'date-fns'
import React from 'react'
import HeaderTableHistorialDirecto from '../utils/HeaderTableHistorialDirecto'
import { historialLotesType } from '@renderer/types/lotesType'

type propsType = {
  table: historialLotesType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickLote: (e:any) => void
}

export default function TableHistorialDirectoNacional(props: propsType): JSX.Element {
  return (
    <>
      <div>
        <div className="grid grid-cols-7 gap-0 mt-0">
          <HeaderTableHistorialDirecto  />
        </div>
        <div className="grid grid-cols-7 gap-0 mt-0">
          {props.table.map((item, index) => (
            <React.Fragment key={item._id}>

            <div
              key={item._id + 'radioButton'}
              className={`h-10 p-0 ol-span-1 text-[12px] flex justify-center items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              <input type="radio"  id={item._id} value={item._id} onClick={props.clickLote} name='lote'></input>
            </div>
            <div
              key={item.documento.enf + 'ef'}
              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {item.documento.enf }
            </div>
            <div
              key={item.documento.predio && item.documento.predio.PREDIO + 'nombre'}
              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {item.documento.predio && item.documento.predio.PREDIO}
            </div>
            <div
              key={item._id + 'canastillas'}
              className={` ol-span-1 text-[12px] flex items-center justify-center ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {(item.documento.directoNacional && item.documento.promedio) ? 
              (item.documento.directoNacional / item.documento.promedio).toFixed(2) : 0}
            </div>
            <div
              key={item.documento.directoNacional + 'kilos'}
              className={` ol-span-1 text-[12px] flex items-center justify-center ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {item.documento.directoNacional && item.documento.directoNacional.toFixed(2)}
            </div>
            <div
              key={item.documento.tipoFruta + 'tipofruta'}
              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {item.documento.tipoFruta}
            </div>
            <div
              key={item.fecha + 'fecha'}
              className={` ol-span-1 text-[12px] flex items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {format(new Date(item.fecha), 'dd/MM/yyyy')}
            </div>

            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
