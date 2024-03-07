
import { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'



export default function NavBarDescartes(): JSX.Element {
  
const [] = useState<string>('')
  // const handleText = (data: string): void => {
  //   setSearch(data)
  //   props.handleFilter(data)
  // }

  return (
    <div
      className={`w-[100%] h-16 flex justify-between items-center bg-Celifrut-green rounded-t-sm m-0 border-1 border-Celifrut-green-dark pl-5`}
    >
      <div className="flex justify-center items-center  hover:bg-Celifrut-green-dark rounded-full p-2">
      </div>
      <div className="flex justify-center">
        <HiOutlineSearch className="mr-[-20px] mt-1 z-10" />
      </div>
    </div>
  )
}
