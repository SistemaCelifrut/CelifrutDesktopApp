/* eslint-disable prettier/prettier */
import { createContext, useEffect, useState } from 'react'
import "./css/main.css"
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
// import HistorialVehiculos from './components/transporte/historialInspecciones/historialFormularioInspeccionVehiculos/HistorialVehiculos'
import Informes from './components/calidad/informes/informesCalidad/Informes'
import HistorialIngresoFruta from './components/inventarioYlogistica/historiales/historialIngresoFruta/HistorialIngreso'
import FormularioMulas from './components/transporte/formulatioInspecciones/inspeccionMulas/FormularioMulas'
// import HistorialFormulario from './components/transporte/historialInspecciones/historialFormularioInspeccionMulas/HistorialFormulario'
import InventarioDescarte from './components/inventarioYlogistica/inventarios/descarte/InventarioDescarte'
import HistorialDescarte from './components/inventarioYlogistica/historiales/historialDescartes/HistorialDescarte'
import ListaDeEmpaque from './components/inventarioYlogistica/historiales/listaDeEmpaque/ListaDeEmpaque'
import Lotes from './components/inventarioYlogistica/historiales/lotes/Lotes'
import Proveedores from './components/gestionDeCuentas/proveedores/Proveedores'
import VolanteCalidad from './components/calidad/formularios/volanteCalidad/VolanteCalidad'
// import HistorialProgramacionMula from './components/transporte/historialInspecciones/historialProgramacionMula/HistorialProgramacionMula'
import Cuentas from './components/gestionDeCuentas/crearCuentas/Cuentas'
import Inicio from './components/Inicio'
import MessagesComponent from './messages/MessagesComponent'
import VariablesProceso from './components/sistema/variablesDelSistema/VariablesProceso'
import HabilitarPrediosProceso from './components/sistema/habilitarPrediosProceso/HabilitarPrediosProceso'
import OrdenDeVaceo from './components/inventarioYlogistica/inventarios/orden/OrdenDeVaceo'
import ActivarFunciones from './components/sistema/activarFunciones/ActivarFunciones'
import IngresoSistemaDescartes from './components/sistema/ingresarDescartes/IngresoSistemaDescartes'
import Operario from './components/gestionDeCuentas/operarios/Operario'
import ProgramacionMula from './components/transporte/formulatioInspecciones/programacionMulas/ProgramacionMula'
import DescarteLavadoSistema from './components/sistema/descarteLavado/DescarteLavadoSistema'
import DescarteEnceradoSistema from './components/sistema/descarteEncerado/DescarteEnceradoSistema'
import SistemaExportacionLotes from './components/sistema/exportacionLotesData/SistemaExportacionLotes'

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
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [theme, setTheme] = useState<themeType>('Ligth')
  const [user, setUser] = useState<userType>({ user: '', permisos: [], cargo: '' })
  const [section, setSection] = useState<string>('main')
  const [showSideBar, setShowSideBar] = useState<boolean>(true);
  const [dataComponentes, setDataComponentes] = useState<string>('')
  const [messageType, setMessageType] = useState<string>('')
  const [message, setMessage] = useState<string>('')

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
            <messageContext.Provider value={openMessage}>

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

                          <div className='flex flex-row  h-full'>
                            <SideBar seleccionWindow={seleccionWindow} handleSideBarWidth={handleSideBarWidth} showSideBar={showSideBar} />
                            <div className={` flex justify-center w-full h-full overflow-auto `}>
                              {section === "main" && <Inicio />}
                              {/* Inventario y logistica */}
                              {section === "Inventario y Logística//Ingresos//Ingreso de fruta" && <IngresoFruta />}
                              {section === "Inventario y Logística//Ingresos//Crear contenedor" && <CrearContenedor />}
                              {section === "Inventario y Logística//Inventarios//Fruta sin procesar" && <InventarioFrutaSinProcesar />}
                              {section === "Inventario y Logística//Inventarios//Orden de vaceo" && <OrdenDeVaceo />}
                              {section === "Inventario y Logística//Historiales//Fruta procesada" && <HistorialProcesado />}
                              {section === "Inventario y Logística//Historiales//Directo nacional" && <HistorialDirectoNacional />}
                              {section === "Inventario y Logística//Inventarios//Desverdizado" && <Desverdizado />}
                              {section === "Inventario y Logística//Inventarios//Descarte" && <InventarioDescarte />}
                              {section === "Inventario y Logística//Historiales//Contenedores" && <Contenedores />}
                              {section === "Inventario y Logística//Historiales//Ingreso fruta" && <HistorialIngresoFruta />}
                              {section === "Inventario y Logística//Historiales//Descarte" && <HistorialDescarte />}
                              {section === "Inventario y Logística//Historiales//Lista de empaque" && <ListaDeEmpaque />}
                              {section === "Inventario y Logística//Historiales//Lotes" && <Lotes />}


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
                              {section === "Gestión de Cuentas//Ingresos//Crear cuenta" && <Cuentas />}
                              {section === "Gestión de Cuentas//Operarios//Operarios" && <Operario />}

                              {/* Transporte */}
                              {/* {section === 'Transporte//Historiales//Inspeccion camiones' && <HistorialVehiculos />} */}
                              {/* {section === "Transporte//Historiales//Inspeccion tractomulas" && <HistorialFormulario />} */}
                              {section === "Transporte//Formularios//Tractomulas" && <FormularioMulas />}
                              {section === "Transporte//Formularios//Programación tractomulas" && <ProgramacionMula />}
                              {/* {section === "Transporte//Historiales//Historial programación tractomula" && <HistorialProgramacionMula/>} */}


                              {/* Sistema */}
                              {section === 'Sistema//Proceso//Variables del Proceso' && <VariablesProceso />}
                              {section === 'Sistema//Proceso//Habilitar predios proceso' && <HabilitarPrediosProceso />}
                              {section === 'Sistema//Proceso//Funciones' && <ActivarFunciones />}
                              {section === 'Sistema//Proceso//Ingreso descartes' && <IngresoSistemaDescartes />}
                              {section === 'Sistema//Proceso//Descarte lavado' && <DescarteLavadoSistema />}
                              {section === 'Sistema//Proceso//Descarte encerado' && <DescarteEnceradoSistema />}
                              {section === 'Sistema//Proceso//Exportación lotes' && <SistemaExportacionLotes />}

                            </div>
                          </div>
                        </div>
                      )}
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
