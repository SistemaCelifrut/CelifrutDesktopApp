import { useEffect, useState } from 'react'
import NavBar from './components/UI/NavBar'
import './index.css'
import { themeType } from './env'
import SideBar from './components/UI/SideBar'
import Login from './components/Login/Login'
import { userType } from './types/login'
import IngresoFruta from './components/ingresoFruta/IngresoFruta'
import InventarioFrutaSinProcesar from './components/inventario/InventarioFrutaSinProcesar'
import Descarte from './components/inventarioDescarte/Descarte'

function App(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [theme, setTheme] = useState<themeType>('Ligth')
  const [user, setUser] = useState<userType>({user:'', permisos:['']})
  const [section, setSection] = useState<string>('main')

  //useEffect que obtiene el theme del quipo
  useEffect(() => {
    const funcionAuxiliar = async () => {
      try {
        const response = await window.api.obtenerTheme()
        setTheme(response)
      } catch (e: any) {
        alert(`${e.name}:${e.message}`)
      }
    }
    funcionAuxiliar()
  }, [])

  const changeTheme = (choose: boolean): void => {
    if (choose === true) setTheme('Dark')
    else setTheme('Ligth')
  }

  const loggin = (data:boolean) => {
    setIsLogin(data)
  }

  const getUser = (data:userType) => {
    console.log(data)
    setUser(data)
  }

  const seleccionWindow = (data:string) =>{
    setSection(data)
  }

  return (
    <main
      className={`${section === 'main' ? 'h-screen ' : 'h-screen overflow-auto' }
       justify-start w-screen ${
        theme === 'Dark' ? 'bg-gray-800 shadow-white' : 'bg-white shadow-lg'}`}
    >
      <div className={`grid grid-cols-12 gap-2`}>
      {isLogin === false ? (
        <>
          <div className="col-span-3"></div>
          <div className="col-span-6 mt-10 ">
            <Login loggin={loggin} getUser={getUser}/>
          </div>
          <div className="col-span-3"></div>
        </>
      ) : (
        <>
          <div className="col-span-12">
            <NavBar theme={theme} changeTheme={changeTheme} />
          </div>
          <div className="col-span-2">
            <SideBar theme={theme} user={user} seleccionWindow={seleccionWindow}/>
          </div>
          <div className="col-span-10 overflow-auto">
            {section === 'Ingreso de fruta' && <IngresoFruta theme={theme}/>}
            {section === 'Fruta sin procesar' && <InventarioFrutaSinProcesar theme={theme} user={user.user}/>}
            {section === 'Descarte' && <Descarte theme={theme} user={user.user}/>}
          </div>
        </>
      )}
      </div>
    </main>
  )
}

export default App
