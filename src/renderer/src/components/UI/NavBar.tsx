/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { themeType } from '@renderer/env'
import { RiSideBarFill } from "react-icons/ri";
import { RiSideBarLine } from "react-icons/ri";
import { IoSunnySharp } from "react-icons/io5";
import { GiEvilMoon } from "react-icons/gi";
import logo from '../../assets/CELIFRUT.png'

type propsType = {
  theme: themeType
  changeTheme: (choose: boolean) => void
  showSideBar: boolean
  setShowSideBar: (e) => void
}

export default function NavBar(props: propsType):JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false)


  return (
    <nav className={`${props.theme === 'Dark' ? 'bg-primary' : 'bg-white '}
                         max-h-20 `}>
      <div className="mx-auto px-2 py-2 flex justify-between items-center">
        <div className="bg-white p-3 inline-block rounded-md">
          <img src={logo} width={40} className="cursor-pointer" />
        </div>
        <div className='flex flex-row items-center'>
          <div 
          onClick={(): void => props.setShowSideBar(!props.showSideBar)}
          className={`${props.theme === 'Dark' ? 'text-white' : 'text-dark-primary'} mr-5 text-2xl cursor-pointer `}>
            {props.showSideBar ?  <RiSideBarFill /> : <RiSideBarLine />}
          </div>
          <button
            className={`w-10 h-4 flex items-center text-xl font-bold ${props.theme === 'Dark' ? 'text-white' : 'text-dark'}`}
            onClick={(): void => {
              console.log(props.theme)
              setDarkMode(!darkMode)
              props.changeTheme(darkMode)
            }}
          >
            {props.theme === 'Dark' ? <IoSunnySharp /> : <GiEvilMoon /> }
          
          </button>
          
        </div>
      </div>

    </nav>
  )
}
