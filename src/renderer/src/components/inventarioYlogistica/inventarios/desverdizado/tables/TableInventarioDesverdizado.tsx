/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { prediosDesverdizadoType } from '../type/type'
import HeaderTableDesverdizado from '../utils/HeaderTableInventarioDesverdizado'
import { format } from 'date-fns'

type propsType = {
  table: prediosDesverdizadoType[]
  theme: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickLote: (e: any) => void
  render: boolean
}

export default function TableInventarioDesverdizado(props: propsType):JSX.Element {
  useEffect(() => {
    const radios: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName(
      'myRadioButtons'
    ) as HTMLCollectionOf<HTMLInputElement>

    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false
    }
  }, [props.render])
  
  return (
    <div>
      <div className="grid grid-cols-7 gap-0 mt-0">
        <HeaderTableDesverdizado theme={props.theme} />
      </div>
      <div className="grid grid-cols-7 gap-0 mt-0">
        {props.table.map((lote, index) => (
          <React.Fragment key={lote.enf}>
            <div
              className={`h-10 p-0 ol-span-1 text-[12px] flex justify-center items-center myRadioButtons ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              <input
                type="radio"
                onClick={props.clickLote}
                id={lote.enf}
                value={lote.enf}
                name="lote"
              ></input>
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
              {lote.predio.PREDIO}
            </div>
            <div
              className={`flex justify-center ol-span-1 text-[12px] items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.desverdizado?.canastillas}
            </div>
            <div
              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.desverdizado?.kilos}
            </div>
            <div
              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.desverdizado?.cuartoDesverdizado}
            </div>
            <div
              className={`flex justify-center ol-span-1 text-[12px]  items-center  ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
              }`}
            >
              {lote.desverdizado?.fechaIngreso && format(new Date(lote.desverdizado?.fechaIngreso), 'dd-MM-yyyy')}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
