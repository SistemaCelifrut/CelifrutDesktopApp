/* eslint-disable prettier/prettier */
import { createContext, useEffect, useState } from 'react'
import NavBar from './components/UI/NavBar'
import './index.css'
import { themeType } from './env'
import SideBar from './components/UI/SideBar'
import Login from './components/Login/Login'
import { userType } from './types/login'
import IngresoFruta from './components/ingresoFruta/IngresoFruta'
import InventarioFrutaSinProcesar from './components/inventario/InventarioFrutaSinProcesar'
import Descarte from './components/inventarioDescarte/Descarte'
import Desverdizado from './components/desverdizado/Desverdizado'
import CrearContenedor from './components/crearContenedor/CrearContenedor'
import ListaDeEmpaque from './components/listaDeEmpaque/ListaDeEmpaque'
import CalidadInterna from './components/calidadInterna/CalidadInterna'
import ClasificacionCalidad from './components/clasificacionCalidad/ClasificacionCalidad'
import Formatos from './components/Formatos/Formatos'
import Informes from './components/informes/Informes'
import Cuentas from './components/crearCuentas/Cuentas'
import VolanteCalidad from './components/volanteCalidad/VolanteCalidad'
import Lotes from './components/lotes/Lotes'
import Proveedores from './components/proveedores/Proveedores'
import InspeccionMulas from './components/inspeccionMulas/InspeccionMulas'
import HistorialVehiculos from './components/HistorialFormularioInspeccionVehiculos/HistorialVehiculos'
import Contenedores from './components/contenedores/Contenedores'
import ProbarFunciones from './components/probarFunciones/ProbarFunciones'
import Clientes from './components/clientes/Clientes'

export const themeContext = createContext<themeType>('Ligth')
export const userContext = createContext<userType>({
  _id: '',
  user: '',
  password: '',
  permisos: [],
  cargo: ''
})

function App(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [theme, setTheme] = useState<themeType>('Ligth')
  const [user, setUser] = useState<userType>({
    user: '',
    permisos: [],
    cargo: '',
    password: '',
    _id: ''
  })
  const [section, setSection] = useState<string>('main')
  const [showSideBar, setShowSideBar] = useState<boolean>(true);

  //useEffect que obtiene el theme del quipo
  useEffect(() => {
    const funcionAuxiliar = async (): Promise<void> => {
      try {
        const response = await window.api.obtenerTheme()
        setTheme(response)
      } catch (e: unknown) {
        alert(`${e}`)
      }
    }
    funcionAuxiliar()
  }, [])

  const changeTheme = (choose: boolean): void => {
    if (choose === true) setTheme('Dark')
    else setTheme('Ligth')
  }

  const loggin = (data: boolean): void => {
    setIsLogin(data)
  }

  const getUser = (data: userType): void => {
    console.log(data)
    setUser(data)
  }

  const seleccionWindow = (data: string): void => {
    setSection(data)
  }
  const handleSideBarWidth = (): void => {
    setShowSideBar(!showSideBar);
  }

  return (
    <main
      className={`${isLogin ? section === 'main' &&  !showSideBar ? 'h-full' : 'h-full  min-h-screen' : 'h-screen'}
       justify-start w-full  ${
         theme === 'Dark' ? 'bg-gray-800 shadow-white' : 'bg-white shadow-lg'
       }`}
    >
      <themeContext.Provider value={theme}>
        <userContext.Provider value={user}>
          <div className={`grid grid-cols-12 gap-2`}>
            {isLogin === false ? (
              <>
                <div className="col-span-3"></div>
                <div className="col-span-6 mt-10 ">
                  <Login loggin={loggin} getUser={getUser} />
                </div>
                <div className="col-span-3"></div>
              </>
            ) : (
              <>
                <div className="col-span-12">
                  <NavBar theme={theme} changeTheme={changeTheme} />
                </div>
                <div className={`transition-all ease-in-out duration-500 ${showSideBar ? 'col-span-2': 'w-2'}`}>
                  <SideBar seleccionWindow={seleccionWindow} handleSideBarWidth={handleSideBarWidth} showSideBar={showSideBar} />
                </div>
                <div className={`overflow-auto  ${showSideBar ? 'col-span-10 ': 'col-span-11 '}`}>
                  {section === 'Ingreso de fruta' && <IngresoFruta />}
                  {section === 'Fruta sin procesar' && (
                    <InventarioFrutaSinProcesar theme={theme} user={user.user} />
                  )}
                  {section === 'Descarte' && <Descarte theme={theme} user={user.user} />}
                  {section === 'Desverdizado' && <Desverdizado theme={theme} user={user.user} />}
                  {section === 'Crear contenedor' && <CrearContenedor />}
                  {section === 'Lista de empaque' && (
                    <ListaDeEmpaque theme={theme} user={user.user} />
                  )}
                  {section === 'Calidad interna' && <CalidadInterna />}
                  {section === 'Clasificacion calidad' && <ClasificacionCalidad  />}
                  {section === 'Formatos' && <Formatos />}
                  {section === 'Informes' && <Informes />}
                  {section === 'Crear cuenta' && <Cuentas />}
                  {section === 'Volante calidad' && <VolanteCalidad />}
                  {section === 'Lotes' && <Lotes />}
                  {section === 'Proveedores' && <Proveedores />}
                  {section === 'Inspeccion tractomulas' && (
                    <InspeccionMulas />
                  )}
                  {section === 'Contenedores' && <Contenedores />}
                  {section === 'Historial formulario inspeccion vehiculos' && <HistorialVehiculos />}
                  {section === 'Clientes' && <Clientes />}
                  {section === 'probarFunciones' && <ProbarFunciones />}

                </div>
              </>
            )}
          </div>
        </userContext.Provider>
      </themeContext.Provider>
    </main>
  )
}

export default App
