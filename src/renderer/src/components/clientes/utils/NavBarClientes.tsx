/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { HiOutlineViewList } from 'react-icons/hi'

type propsType = {
    handleSectionSelect: (data: string) => void
  }

export default function NavBarClientes(props:propsType): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const handleMenu = (data: string): void => {
      props.handleSectionSelect(data)
      setIsOpen(false)
    }
  return (
    <div className='flex flex-row gap-10 items-center justify-start bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5'>
    <div
    className={`z-50  h-16 flex justify-start items-center `}
  >
  <div className=" z-50 flex justify-center flex-row items-center  hover:bg-Celifrut-green-dark rounded-full p-2">
      <button className={` text-3xl text-white`} onClick={(): void => setIsOpen(!isOpen)}>
        <HiOutlineViewList />
      </button>
      </div>
      <div className={`z-50 `} onClick={(): void => setIsOpen(false)}>
   
        <div  className={`rounded-md shadow-lg bg-white mt-28 ml-[-60px] overflow-hidden z-60 transition-all duration-1000 transform ${isOpen ? 'flex flex-col scale-100 opacity-100' : 'hidden scale-95 opacity-0'}`}
        onClick={(e): void => e.stopPropagation()} >
                <button
                onClick={(): void => handleMenu('Clientes')}
                className="p-2 hover:bg-slate-400"
              >
                Clientes
              </button>

        </div>

        </div>
        </div>
  
    </div>
  )
}
