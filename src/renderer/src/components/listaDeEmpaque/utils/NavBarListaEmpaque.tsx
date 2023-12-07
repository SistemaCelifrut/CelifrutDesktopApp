import { useState } from 'react'
import { HiOutlineViewList } from 'react-icons/hi'
import { ContenedoresObj } from '../types/types'

type propsType = {
  contenedores: ContenedoresObj
  handleChange: (e: any) => void
}

export default function NavBarListaEmpaque(props: propsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className={`w-[100%] h-16 flex justify-between items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5`}
    >
      <div className="flex justify-center items-center  hover:bg-Celifrut-green-dark rounded-full p-2">
        <button className={` text-3xl text-white`} onClick={() => setIsOpen(!isOpen)}>
          <HiOutlineViewList />
        </button>

        {isOpen && (
          <div className={` fixed inset-0 `} onClick={() => setIsOpen(false)}>
            <div
              className="absolute left-48 top-40 w-64 rounded-md shadow-lg ml-2 bg-white z-10 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            ></div>
          </div>
        )}
      </div>
      <select
        onChange={props.handleChange}
        className={`border focus:outline-none appearance-none w-2/5 mr-5 rounded-md h-10 pl-5 pr-10
                          ${'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '}`}
      >
        <option>Contenedores</option>
        {Object.keys(props.contenedores).map((item, index) => (
          <option key={item + index} value={item}>
            {item} - {props.contenedores[item].infoContenedor?.nombreCliente}
          </option>
        ))}
      </select>
    </div>
  )
}
