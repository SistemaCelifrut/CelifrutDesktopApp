/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { themeType } from '@renderer/env';
import { RiSideBarFill } from 'react-icons/ri';
import { RiSideBarLine } from 'react-icons/ri';
import { IoSunnySharp } from 'react-icons/io5';
import { GiEvilMoon } from 'react-icons/gi';
import logo from '../../assets/CELIFRUT.png';
import Inicio from '../../components/Inicio'; // Importa el componente Inicio.tsx

type propsType = {
  theme: themeType;
  changeTheme: (choose: boolean) => void;
  showSideBar: boolean;
  setShowSideBar: (e) => void;
};

export default function NavBar(props: propsType): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showInicio, setShowInicio] = useState<boolean>(false); // Nuevo estado para controlar si se muestra el componente Inicio.tsx

  const handleClick = ():void => {
    setShowInicio(!showInicio); // Cambia el estado para mostrar u ocultar el componente Inicio.tsx
  };

  return (
    <>
      <nav
        className={`${props.theme === 'Dark' ? 'bg-primary' : 'bg-white '}
                         max-h-20 `}
      >
        <div className="mx-auto px-2 py-2 flex justify-between items-center">
          <div
            className="bg-white p-3 inline-block rounded-md cursor-pointer"
            onClick={handleClick} // Llama a la función handleClick cuando se hace clic en la imagen o en el cuadro
          >
            <img src={logo} width={40} />
          </div>
          <div className="flex flex-row items-center">
            <div
              onClick={(): void => props.setShowSideBar(!props.showSideBar)}
              className={`${
                props.theme === 'Dark' ? 'text-white' : 'text-dark-primary'
              } mr-5 text-2xl cursor-pointer `}
            >
              {props.showSideBar ? <RiSideBarFill /> : <RiSideBarLine />}
            </div>
            <button
              className={`w-10 h-4 flex items-center text-xl font-bold ${
                props.theme === 'Dark' ? 'text-white' : 'text-dark'
              }`}
              onClick={(): void => {
                console.log(props.theme);
                setDarkMode(!darkMode);
                props.changeTheme(darkMode);
              }}
            >
              {props.theme === 'Dark' ? <IoSunnySharp /> : <GiEvilMoon />}
            </button>
          </div>
        </div>
      </nav>
      {showInicio && <Inicio />} {/* Muestra el componente Inicio.tsx si showInicio es true */}
    </>
  );
}

