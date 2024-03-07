/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import HeaderTableDesverdizado from '../utils/HeaderTableInventarioDesverdizado'
import { format } from 'date-fns'
import { lotesType } from '@renderer/types/lotesType'

type propsType = {
  table: lotesType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickLote: (e: any) => void
  render: boolean
  propsModal: lotesType
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

  const [selectedValue, setSelectedValue] = useState(null);

  const handleClick = (e): void => {
    if (selectedValue === e.target.value) {
      setSelectedValue(null);
    } else {
      setSelectedValue(e.target.value);
      props.clickLote(e);
    }
  };
  
  return (
    <div>
      <div className="grid grid-cols-7 gap-0 mt-0">
        <HeaderTableDesverdizado />
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
                onClick={handleClick}
                id={lote.enf}
                checked={props.propsModal.enf === selectedValue } 
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
              {lote.predio && lote.predio.PREDIO}
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
