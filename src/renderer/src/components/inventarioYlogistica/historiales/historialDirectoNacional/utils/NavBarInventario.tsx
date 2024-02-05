/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

type propsType = {
  handleFilter: (data: string) => void
}

export default function NavBarInventario(props: propsType): JSX.Element {
  const [search, setSearch] = useState<string>('')

  const handleText = (data: string): void => {
    setSearch(data)
    props.handleFilter(data)
  }

  return (
    <div
      className={`w-[100%] h-16 flex justify-between items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5`}
    >
      <div className="flex justify-center items-center  hover:bg-Celifrut-green-dark rounded-full p-2">

      </div>
      <div className="flex justify-center">
        <HiOutlineSearch className="mr-[-20px] mt-1 z-10" />
        <input
          type="text"
          value={search}
          onChange={(e): void => handleText(e.target.value)}
          className={`border-s-gray-300 mr-5 w-[15rem] rounded-md border-2 focus:border-blue-500 pl-5`}
        />
      </div>
    </div>
  )
}
