/* eslint-disable prettier/prettier */
import { createContext, useEffect, useState } from 'react'
import "./css/main.css"
import NavBar from './components/UI/NavBar'
import './index.css'
import { themeType } from './env'
import SideBar from './components/UI/SideBar'
// import Login from './components/Login/Login'
import { userType } from './types/login'
import MessagesComponent from './messages/MessagesComponent'
import Ventana from './components/UI/Ventana'

type OpenModalFunction = (messageType: string, message: string) => void;
type MyContextType = {
  setSection: React.Dispatch<React.SetStateAction<string>>;
};
type MyContextDataType = {
  dataComponentes: string
  setDataComponentes: React.Dispatch<React.SetStateAction<string>>;
};

type confirmationDataType = {
  confirmation: boolean
  setConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const sectionContext = createContext<MyContextType | undefined>(undefined)
export const dataContext = createContext<MyContextDataType | undefined>(undefined)
export const themeContext = createContext<themeType>('Ligth')
export const messageContext = createContext<OpenModalFunction | undefined>(undefined);
export const confirmacionContext = createContext<confirmationDataType | undefined>(undefined);

export const userContext = createContext<userType>({
  user: '',
  permisos: [],
  cargo: ''
})


function App(): JSX.Element {
  // const [isLogin, setIsLogin] = useState<boolean>(false)
  const [theme, setTheme] = useState<themeType>('Ligth')
  const [user, setUser] = useState<userType>({ user: '', permisos: [], cargo: '' })
  const [section, setSection] = useState<string>('main')
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [dataComponentes, setDataComponentes] = useState<string>('')
  const [messageType, setMessageType] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [widthBar, setWidthBar] = useState<number>(100)

  const openMessage = (messageType: string, message: string): void => {
    setMessageType(messageType);
    setMessage(message);
    setTimeout(() => {
      setMessageType('');
      setMessage('');
    }, 5000);
  };

  //useEffect que obtiene el theme del quipo
  useEffect(() => {
    const funcionAuxiliar = async (): Promise<void> => {
      try {
        const response = await window.api.obtenerTheme()
        const version = await window.api.version();
        const cuenta = await window.api.obtenerCuenta();
        console.log(cuenta)
        setUser(cuenta)
        document.title = "Celifrut App " + version;
        if (response === "Dark") {
          setTheme('Dark')
          document.body.classList.add('dark-theme');
        }
        else {
          setTheme('Ligth')
          document.body.classList.remove('dark-theme');
        }

      } catch (e: unknown) {
        alert(`${e}`)
      }
    }
    funcionAuxiliar()
  }, [])
  const changeTheme = (choose: boolean): void => {
    if (choose === true) {
      setTheme('Dark')
      document.body.classList.add('dark-theme');
    }
    else {
      setTheme('Ligth')
      document.body.classList.remove('dark-theme');

    }
  }
  const seleccionWindow = (data: string): void => {
    setSection(data)
  }
  const handleSideBarWidth = (): void => {
    setShowSideBar(!showSideBar);
  }

  return (

    <sectionContext.Provider value={{ setSection }}>
      <dataContext.Provider value={{ dataComponentes, setDataComponentes }}>
        <themeContext.Provider value={theme}>
          <userContext.Provider value={user}>
            <messageContext.Provider value={openMessage}>

                  <main className={`h-screen max-h-screen w-full ${theme === 'Dark' ? 'bg-gray-800 shadow-white' : 'bg-white shadow-lg'} pb-20 overflow-hidden`}>

                    <div className='flex flex-col h-full'>
                      {/* {isLogin === false ? (
                        <div className="flex justify-center items-center h-screen">
                          <Login loggin={loggin} getUser={getUser} />
                        </div>
                      ) : ( */}
                        <div className='flex flex-col h-full'>

                          <div className={`border-solid border-2 ${theme === 'Dark' ? 'border-slate-600' : 'border-gray-200 '}`}>
                            <NavBar theme={theme} changeTheme={changeTheme} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
                          </div>

                          <div className='flex flex-row  h-full'>
                            <SideBar 
                              setWidthBar={setWidthBar}
                              seleccionWindow={seleccionWindow} 
                              handleSideBarWidth={handleSideBarWidth} 
                              showSideBar={showSideBar} />
                            <Ventana section={section} widthBar={widthBar} />
                          </div>
                        </div>
                      {/* )} */}
                    </div>
                    {message !== '' && <MessagesComponent messageType={messageType} message={message} />}
                  </main>

            </messageContext.Provider>
          </userContext.Provider>
        </themeContext.Provider>
      </dataContext.Provider>
    </sectionContext.Provider>
  )
}

export default App
