/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { lotesInventarioType } from '../types/clasificacionTypes'
import { HiOutlineViewList } from 'react-icons/hi'


type propsType = {
  lotesData: lotesInventarioType[]
  setLote: (enf: string) => void
  handleSectionSelect: (data: string) => void
}

export default function NavClasificacionCalidad(props: propsType):JSX.Element {
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
                onClick={(): void => handleMenu('Clasificacion calidad')}
                className="p-2 hover:bg-slate-400"
              >
                Clasificacion calidad
              </button>
              <button
                onClick={(): void => handleMenu('Historial Clasificacion calidad')}
                className="p-2 hover:bg-slate-400"
              >
                Historial clasificacion calidad
              </button>
        </div>

        </div>
        </div>
  
      <select
        onChange={(e): void => props.setLote(e.target.value)}
        className={`border focus:outline-none appearance-none w-2/5 mr-5 rounded-md h-10 pl-5 pr-10
                        ${'border-gray-300  text-gray-600  bg-white hover:border-gray-400 '}`}
      >
        <option>Lotes</option>
        {props.lotesData.map((lote) => (
          <option key={lote.id} value={lote.id}>{lote.id + ' ' + ' ' + lote.nombre}</option>
        ))}
      </select>
    </div>
  )
}
