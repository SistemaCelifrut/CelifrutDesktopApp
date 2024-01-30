/* eslint-disable prettier/prettier */
import { useState } from "react"
import { HiOutlineViewList } from 'react-icons/hi'

type propsType = {
    handleSectionSelect: (data: string) => void
  }

export default function NavBarLotes(props:propsType): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleMenu = (data: string): void => {
        props.handleSectionSelect(data)
        setIsOpen(false)
      }
  return (
    <div
    className={`z-50 w-[100%] h-16 flex justify-start items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5`}
  >
    <div className=" z-50 flex justify-center flex-row items-center  hover:bg-Celifrut-green-dark rounded-full p-2">
      <button className={` text-3xl text-white`} onClick={(): void => setIsOpen(!isOpen)}>
        <HiOutlineViewList />
      </button>
      </div>
      <div className={`z-50`} onClick={(): void => setIsOpen(false)}>
      
      {isOpen && (
        <div  className=" rounded-md shadow-lg  bg-white flex flex-col mt-28 ml-[-60px] overflow-hidden z-60"
        onClick={(e): void => e.stopPropagation()}>
                <button
                onClick={(): void => handleMenu('Proceso')}
                className="p-2 hover:bg-slate-400"
              >
                Proceso
              </button>
              <button
                onClick={(): void => handleMenu('Calidad')}
                className="p-2 hover:bg-slate-400"
              >
                Calidad
              </button>
        </div>
      )}
        </div>


  </div>
  )
}
