/* eslint-disable prettier/prettier */
import { createContext, useEffect, useState } from 'react'
import NavBar from './components/UI/NavBar'
import './index.css'
import { themeType } from './env'
import SideBar from './components/UI/SideBar'
import Login from './components/Login/Login'
import { userType } from './types/login'

import IngresoFruta from './components/inventarioYlogistica/ingresos/ingresoFruta/IngresoFruta'
import CrearContenedor from './components/inventarioYlogistica/ingresos/crearContenedor/CrearContenedor'
import InventarioFrutaSinProcesar from './components/inventarioYlogistica/inventarios/frutaSinProcesar/InventarioFrutaSinProcesar'
import HistorialProcesado from './components/inventarioYlogistica/historiales/historialProcesado/HistorialProcesado'
import HistorialDirectoNacional from './components/inventarioYlogistica/historiales/historialDirectoNacional/HistorialDirectoNacional'
import Desverdizado from './components/inventarioYlogistica/inventarios/desverdizado/Desverdizado'
import CalidadInterna from './components/calidad/ingresos/calidadInterna/CalidadInterna'
import HistorialCalidadInterna from './components/calidad/historiales/historialCalidadInterna/HistorialCalidadInterna'
import IngresoClasificacionCalidad from './components/calidad/ingresos/clasificacionCalidad/IngresoClasificacionCalidad'
import HistorialClasificacionCalidad from './components/calidad/historiales/historialClasificacionCalidad/HistorialClasificacionCalidad'
import Clientes from './components/gestionDeCuentas/clientes/Clientes'
import Contenedores from './components/inventarioYlogistica/historiales/contenedores/Contenedores'
import ControlPlagas from './components/calidad/formularios/controlPlagas/ControlPlagas'
import LimpiezaMensual from './components/calidad/formularios/limpiezaMensual/LimpiezaMensual'
import LimpiezaPostCosecha from './components/calidad/formularios/limpiezaPostCosecha/LimpiezaPostCosecha'
import HigienePersonal from './components/calidad/formularios/higienePersonal/HigienePersonal'
import HistorialVehiculos from './components/transporte/historialInspecciones/historialFormularioInspeccionVehiculos/HistorialVehiculos'
import Informes from './components/calidad/informes/informesCalidad/Informes'
import HistorialIngresoFruta from './components/inventarioYlogistica/historiales/historialIngresoFruta/HistorialIngreso'
import FormularioMulas from './components/transporte/formulatioInspecciones/inspeccionMulas/FormularioMulas'
import HistorialFormulario from './components/transporte/historialInspecciones/historialFormularioInspeccionMulas/HistorialFormulario'
import InventarioDescarte from './components/inventarioYlogistica/inventarios/descarte/InventarioDescarte'
import HistorialDescarte from './components/inventarioYlogistica/historiales/historialDescartes/HistorialDescarte'
import ListaDeEmpaque from './components/inventarioYlogistica/historiales/listaDeEmpaque/ListaDeEmpaque'
import Lotes from './components/inventarioYlogistica/historiales/lotes/Lotes'
import Proveedores from './components/gestionDeCuentas/proveedores/Proveedores'
import VolanteCalidad from './components/calidad/formularios/volanteCalidad/VolanteCalidad'
import FormularioProgramacionMula from './components/transporte/formulatioInspecciones/programacionMulas/FormularioProgramacionMula'
import HistorialProgramacionMula from './components/transporte/historialInspecciones/historialProgramacionMula/HistorialProgramacionMula'
import Cuentas from './components/gestionDeCuentas/crearCuentas/Cuentas'

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
                        {section === "Inventario y Logística//Ingresos//Ingreso de fruta" && <IngresoFruta />}
                        {section === "Inventario y Logística//Ingresos//Crear contenedor" && <CrearContenedor />}
                        {section === "Inventario y Logística//Inventarios//Fruta sin procesar" && <InventarioFrutaSinProcesar />}
                        {section === "Inventario y Logística//Historiales//Fruta procesada" && <HistorialProcesado />}
                        {section === "Inventario y Logística//Historiales//Directo nacional" && <HistorialDirectoNacional />}
                        {section === "Inventario y Logística//Inventarios//Desverdizado" && <Desverdizado />}
                        {section === "Inventario y Logística//Inventarios//Descarte" && <InventarioDescarte />}
                        {section === "Inventario y Logística//Historiales//Contenedores" && <Contenedores />}
                        {section === "Inventario y Logística//Historiales//Ingreso fruta" &&  <HistorialIngresoFruta />}
                        {section === "Inventario y Logística//Historiales//Descarte" &&  <HistorialDescarte />}
                        {section === "Inventario y Logística//Historiales//Lista de empaque" &&  <ListaDeEmpaque />}
                        {section === "Inventario y Logística//Historiales//Lotes" &&  <Lotes />}


                        {/* Calidad */}
                        {section === "Calidad//Ingresos//Calidad interna" && <CalidadInterna />}
                        {section === "Calidad//Historiales//Calidad interna" && <HistorialCalidadInterna />}
                        {section === "Calidad//Ingresos//Clasificacion calidad" && <IngresoClasificacionCalidad />}
                        {section === "Calidad//Historiales//Clasificacion calidad" && <HistorialClasificacionCalidad />}
                        {section === "Calidad//Formularios//Control plagas" && <ControlPlagas />} 
                        {section === "Calidad//Formularios//Higiene personal" && <HigienePersonal />} 
                        {section === "Calidad//Formularios//Limpieza mensual" && <LimpiezaMensual />} 
                        {section === "Calidad//Formularios//Limpieza post cosecha" && <LimpiezaPostCosecha />} 
                        {section === "Calidad//Formularios//Volante calidad" && <VolanteCalidad />} 
                        {section === "Calidad//Informes//Informe proveedor" && <Informes />}


                        {/* Gestion de cuentas */}
                        {section === "Gestión de Cuentas//Clientes//Clientes" && <Clientes />}
                        {section === "Gestión de Cuentas//Proveedores//Proveedores" && <Proveedores />}
                        {section === "Gestión de Cuentas//Sistema//Crear cuenta" && <Cuentas />}

                        {/* Transporte */}
                        {section === 'Transporte//Historiales//Inspeccion camiones' && <HistorialVehiculos />}
                        {section === "Transporte//Historiales//Inspeccion tractomulas" && <HistorialFormulario />}
                        {section === "Transporte//Formularios//Tractomulas" && <FormularioMulas />}
                        {section === "Transporte//Formularios//Programación tractomulas" && <FormularioProgramacionMula/>}
                        {section === "Transporte//Historiales//Historial programación tractomula" && <HistorialProgramacionMula/>}

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
