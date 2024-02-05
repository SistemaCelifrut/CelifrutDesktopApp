/* eslint-disable prettier/prettier */
import { createContext, useEffect, useState } from 'react'
import NavBar from './components/UI/NavBar'
import './index.css'
import { themeType } from './env'
import SideBar from './components/UI/SideBar'
import Login from './components/Login/Login'
import { userType } from './types/login'
import Descarte from './components/inventarioDescarte/Descarte'
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
import IngresoFruta from './components/inventarioYlogistica/ingresos/ingresoFruta/IngresoFruta'
import CrearContenedor from './components/inventarioYlogistica/ingresos/crearContenedor/CrearContenedor'
import InventarioFrutaSinProcesar from './components/inventarioYlogistica/inventarios/frutaSinProcesar/InventarioFrutaSinProcesar'
import HistorialProcesado from './components/inventarioYlogistica/historiales/historialProcesado/HistorialProcesado'
import HistorialDirectoNacional from './components/inventarioYlogistica/historiales/historialDirectoNacional/HistorialDirectoNacional'
import Desverdizado from './components/inventarioYlogistica/inventarios/desverdizado/Desverdizado'

type MyContextType = {
  setSection: React.Dispatch<React.SetStateAction<string>>;
};
type MyContextDataType = {
  dataComponentes: string
  setDataComponentes: React.Dispatch<React.SetStateAction<string>>;
};

export const sectionContext = createContext<MyContextType | undefined>(undefined)
export const dataContext = createContext<MyContextDataType | undefined>(undefined)
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
  const [user, setUser] = useState<userType>({ user: '', permisos: [], cargo: '', password: '', _id: '' })
  const [section, setSection] = useState<string>('main')
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [dataComponentes, setDataComponentes] = useState<string>('')
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
    setUser(data)
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
            <main className={`h-screen max-h-screen w-full ${theme === 'Dark' ? 'bg-gray-800 shadow-white' : 'bg-white shadow-lg'} pb-20 overflow-hidden`}>

              <div className='flex flex-col h-full'>
                {isLogin === false ? (
                  <div className="flex justify-center items-center h-screen">
                    <Login loggin={loggin} getUser={getUser} />
                  </div>
                ) : (

                  <div className='flex flex-col h-full'>
                    <div className={`border-solid border-2 ${theme === 'Dark' ? 'border-slate-600' : 'border-gray-200 '}`}>
                      <NavBar theme={theme} changeTheme={changeTheme} showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
                    </div>

                    <div className='flex flex-row  h-full '>
                      <SideBar seleccionWindow={seleccionWindow} handleSideBarWidth={handleSideBarWidth} showSideBar={showSideBar} />
                      <div className={` flex justify-center w-full h-full overflow-auto `}>

                        {/* Inventario y logistica */}
                        {section === 'Ingreso de fruta' && <IngresoFruta />}
                        {section === 'Crear contenedor' && <CrearContenedor />}
                        {section === 'Fruta sin procesar' && <InventarioFrutaSinProcesar />}
                        {section === 'Historial proceso' && <HistorialProcesado />}
                        {section === 'Historial directo nacional' && <HistorialDirectoNacional />}
                        {section === 'Desverdizado' && <Desverdizado />}




                        {section === 'Descarte' && <Descarte theme={theme} user={user.user} />}
                        {section === 'Lista de empaque' && (
                          <ListaDeEmpaque theme={theme} user={user.user} />
                        )}
                        {section === 'Calidad interna' && <CalidadInterna />}
                        {section === 'Clasificacion calidad' && <ClasificacionCalidad />}
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
                        {section === 'probarFunciones' && <ProbarFunciones />}

                      </div>
                    </div>
                  </div>

                )}
              </div>
            </main>

          </userContext.Provider>
        </themeContext.Provider>
      </dataContext.Provider>
    </sectionContext.Provider>
  )
}

export default App
