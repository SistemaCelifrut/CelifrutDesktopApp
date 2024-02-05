/* eslint-disable prettier/prettier */
import { useState } from 'react'

import { HiOutlineViewList } from 'react-icons/hi'

type propsType = {
  handleFilter: (data: string) => void
  handleSectionSelect: (data: string) => void
}

export default function NavBarHistorial(props: propsType): JSX.Element {
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
        
      </div>
      <div className="flex justify-center">

      </div>
    </div>
  )
}