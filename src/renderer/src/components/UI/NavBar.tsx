/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { themeType } from '@renderer/env'
import logo from '../../assets/CELIFRUT.png'

type propsType = {
  theme: themeType
  changeTheme: (choose: boolean) => void
}

export default function NavBar(props: propsType):JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  return (
    <nav className={`${props.theme === 'Dark' ? 'bg-primary shadow-white' : 'bg-white shadow-lg'}`}>
      <div className="mx-auto px-2 py-2 flex justify-between items-center">
        <div className="bg-white p-3 inline-block rounded-md">
          <img src={logo} width={60} className="cursor-pointer" />
        </div>

        <div>
          <button
            className={`w-10 h-4 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
              darkMode ? 'justify-end' : ''
            }`}
            onClick={(): void => {
              console.log(props.theme)
              setDarkMode(!darkMode)
              props.changeTheme(darkMode)
            }}
          >
            <span
              className={`block w-4 h-4 ${
                props.theme === 'Dark' ? 'bg-white' : 'bg-gray-900'
              } rounded-full shadow-md transform duration-300 ease-in-out`}
            ></span>
          </button>
          <p className={props.theme === 'Dark' ? 'text-white' : 'text-black'}>{props.theme === 'Dark' ? 'dark' : 'ligth'}</p>
        </div>
      </div>
    </nav>
  )
}
