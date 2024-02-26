/* eslint-disable prettier/prettier */
import { contenedoresType } from '@renderer/types/contenedoresType'
import { useState } from 'react'
import { HiOutlineViewList } from 'react-icons/hi'

type propsType = {
  contenedores: contenedoresType[]
  handleChange: (e) => void
}

export default function NavBarListaEmpaque(props: propsType): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
        {props.contenedores.length > 0 && props.contenedores.map((item) => (
          <option key={item._id} value={item._id}>
            {item.numeroContenedor} - {item.infoContenedor ? item.infoContenedor.clienteInfo.CLIENTE : 'Nombre no disponible'}
          </option>
        ))}
      </select>
    </div>
  )
}
