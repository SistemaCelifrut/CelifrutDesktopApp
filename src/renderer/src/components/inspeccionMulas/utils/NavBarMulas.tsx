/* eslint-disable prettier/prettier */
import { useState } from 'react'

import { HiOutlineViewList } from 'react-icons/hi'

type propsType = {
  handleFilter: (data: string) => void
  handleSectionSelect: (data: string) => void
}

export default function NavBarMulas(props: propsType): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleMenu = (data: string): void => {
    props.handleSectionSelect(data)
    setIsOpen(false)
  }

  return (
    <div
      className={`w-[100%] h-16 flex justify-between items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5`}
    >
      <div className="flex justify-center items-center  hover:bg-Celifrut-green-dark rounded-full p-2">
        <button className={` text-3xl text-white`} onClick={(): void => setIsOpen(!isOpen)}>
          <HiOutlineViewList />
        </button>

        {isOpen && (
          <div className={` fixed inset-0 `} onClick={(): void => setIsOpen(false)}>
            <div
              className="absolute left-48 top-40 w-64 rounded-md shadow-lg ml-2 bg-white z-10 flex flex-col"
              onClick={(e): void => e.stopPropagation()}
            >
              <button
                onClick={(): void => handleMenu('Formulario Mulas')}
                className="pb-1 hover:bg-slate-400"
              >
                Formulario Mulas
              </button>
              <button
                onClick={(): void => handleMenu('Historial Formulario')}
                className="pb-1  hover:bg-slate-400"
              >
                Historial Formulario
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">

      </div>
    </div>
  )
}