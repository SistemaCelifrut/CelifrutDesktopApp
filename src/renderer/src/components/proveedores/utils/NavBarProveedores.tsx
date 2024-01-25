/* eslint-disable prettier/prettier */

import { useState } from "react"
import { HiOutlineViewList } from 'react-icons/hi'

type propsType = {
    handleSectionSelect: (data: string) => void
  }
  
export default function NavBarProveedores(props: propsType): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleMenu = (data: string): void => {
        props.handleSectionSelect(data)
        setIsOpen(false)
      }
  return (
    <div
    className={`w-[100%] h-16 flex justify-between items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5`}
  >
    <div className="relative items-center  hover:bg-Celifrut-green-dark rounded-full p-2">
      <button className={` text-3xl text-white`} onClick={(): void => setIsOpen(!isOpen)}>
        <HiOutlineViewList />
      </button>

      {isOpen && (
        <div className={` relative `} onClick={(): void => setIsOpen(false)}>
          <div
            className="absolute left-48 top-40 w-64 rounded-md shadow-lg ml-2 bg-white z-10 flex flex-col"
            onClick={(e): void => e.stopPropagation()}
          >
                     <button
                onClick={(): void => handleMenu('Proveedores')}
                className="pb-1 hover:bg-slate-400"
              >
                Proveedores
              </button>
              <button
                onClick={(): void => handleMenu('Datos predios')}
                className="pb-1  hover:bg-slate-400"
              >
                Informacion predios
              </button>
   
          </div>
        </div>
      )}
    </div>
  </div>
)
  
}
