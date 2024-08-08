/* eslint-disable prettier/prettier */

import ControlPlagas from "../calidad/formularios/controlPlagas/ControlPlagas"
import HigienePersonal from "../calidad/formularios/higienePersonal/HigienePersonal"
import LimpiezaPostCosecha from "../calidad/formularios/limpiezaPostCosecha/LimpiezaPostCosecha"
import VolanteCalidad from "../calidad/formularios/volanteCalidad/VolanteCalidad"
import HistorialCalidadInterna from "../calidad/historiales/historialCalidadInterna/HistorialCalidadInterna"
import HistorialClasificacionCalidad from "../calidad/historiales/historialClasificacionCalidad/HistorialClasificacionCalidad"
import Informes from "../calidad/informes/informesCalidad/Informes"
import CalidadInterna from "../calidad/ingresos/calidadInterna/CalidadInterna"
import IngresoClasificacionCalidad from "../calidad/ingresos/clasificacionCalidad/IngresoClasificacionCalidad"
import Clientes from "../comercial/clientes/Clientes"
import CrearContenedor from "../comercial/ingresos/crearContenedor/CrearContenedor"
import PrecioLimon from "../comercial/precioLimon/PrecioLimon"
import PrecioNaranja from "../comercial/precioNaranja/PrecioNaranja"
import Proveedores from "../comercial/proveedores/Proveedores"
import Cargos from "../gestionDeCuentas/Cargos/Cargos"
import Cuentas from "../gestionDeCuentas/crearCuentas/Cuentas"
import Operario from "../gestionDeCuentas/operarios/Operario"
import EficienciaFruta from "../indicadores/operaciones/EficienciaFruta/EficienciaFruta"
import Inicio from "../Inicio"
import Contenedores from "../inventarioYlogistica/historiales/contenedores/Contenedores"
import HistorialDescarte from "../inventarioYlogistica/historiales/historialDescartes/HistorialDescarte"
import HistorialDirectoNacional from "../inventarioYlogistica/historiales/historialDirectoNacional/HistorialDirectoNacional"
import HistorialIngresoFruta from "../inventarioYlogistica/historiales/historialIngresoFruta/HistorialIngreso"
import HistorialProcesado from "../inventarioYlogistica/historiales/historialProcesado/HistorialProcesado"
import ListaDeEmpaque from "../inventarioYlogistica/historiales/listaDeEmpaque/ListaDeEmpaque"
import Lotes from "../inventarioYlogistica/historiales/lotes/Lotes"
import IngresoFruta from "../inventarioYlogistica/ingresos/ingresoFruta/IngresoFruta"
import Desverdizado from "../inventarioYlogistica/inventarios/desverdizado/Desverdizado"
import InventarioFrutaSinProcesar from "../inventarioYlogistica/inventarios/frutaSinProcesar/InventarioFrutaSinProcesar"
import OrdenDeVaceo from "../inventarioYlogistica/inventarios/orden/OrdenDeVaceo"
import ReprocesoDescarte from "../inventarioYlogistica/inventarios/reproceso descarte/ReprocesoDescarte"
import DescarteLavadoSistema from "../proceso/aplicaciones/descarteLavado/DescarteLavadoSistema"
import ActivarFunciones from "../sistema/activarFunciones/ActivarFunciones"
import DescarteEnceradoSistema from "../sistema/descarteEncerado/DescarteEnceradoSistema"
import HabilitarPrediosProceso from "../sistema/habilitarPrediosProceso/HabilitarPrediosProceso"
import ModificarSeriales from "../sistema/modificarSeriales/ModificarSeriales"
import VariablesProceso from "../sistema/variablesDelSistema/VariablesProceso"
import FormularioMulas from "../transporte/formulatioInspecciones/inspeccionMulas/FormularioMulas"
import ProgramacionMula from "../transporte/formulatioInspecciones/programacionMulas/ProgramacionMula"

type propsType = {
    section: string
    widthBar: number
}
export default function Ventana(props:propsType): JSX.Element{
    // return (
    //     <div className={` flex justify-center w-full h-full overflow-auto `}>
    //         <Cargos />
    //     </div>
    // )
    return(
        <div className={` flex justify-center w-full h-full overflow-auto `}>
        {props.section === "main" && <Inicio />}
        {/* Inventario y logistica */}
        {props.section === "Inventario y Logística//Ingresos//Ingreso de fruta" && <IngresoFruta />}
        {props.section === "Inventario y Logística//Inventarios//Fruta sin procesar" && <InventarioFrutaSinProcesar />}
        {props.section === "Inventario y Logística//Inventarios//Orden de vaceo" && <OrdenDeVaceo />}
        {props.section === "Inventario y Logística//Historiales//Fruta procesada" && <HistorialProcesado />}
        {props.section === "Inventario y Logística//Historiales//Directo nacional" && <HistorialDirectoNacional />}
        {props.section === "Inventario y Logística//Inventarios//Desverdizado" && <Desverdizado />}
        {props.section === "Inventario y Logística//Inventarios//Reproceso Descarte" && <ReprocesoDescarte />}
        {props.section === "Inventario y Logística//Historiales//Contenedores" && <Contenedores />}
        {props.section === "Inventario y Logística//Historiales//Ingreso fruta" && <HistorialIngresoFruta />}
        {props.section === "Inventario y Logística//Historiales//Descarte" && <HistorialDescarte />}
        {props.section === "Inventario y Logística//Historiales//Lista de empaque" && <ListaDeEmpaque />}
        {props.section === "Inventario y Logística//Historiales//Lotes" && <Lotes />}


        {/* Calidad */}
        {props.section === "Calidad//Ingresos//Calidad interna" && <CalidadInterna />}
        {props.section === "Calidad//Historiales//Calidad interna" && <HistorialCalidadInterna />}
        {props.section === "Calidad//Ingresos//Clasificacion calidad" && <IngresoClasificacionCalidad />}
        {props.section === "Calidad//Historiales//Clasificacion calidad" && <HistorialClasificacionCalidad />}
        {props.section === "Calidad//Formularios//Control plagas" && <ControlPlagas />} 
        {props.section === "Calidad//Formularios//Higiene personal" && <HigienePersonal />} 
        {/* {props.section === "Calidad//Formularios//Limpieza mensual" && <LimpiezaMensual />}  */}
        {props.section === "Calidad//Formularios//Limpieza post cosecha" && <LimpiezaPostCosecha />} 
        {props.section === "Calidad//Formularios//Volante calidad" && <VolanteCalidad />} 
        {props.section === "Calidad//Informes//Informe proveedor" && <Informes />}


        {/* Gestion de cuentas */}

        {props.section === "Gestión de Cuentas//Ingresos//Crear cuenta" && <Cuentas />}
        {props.section === "Gestión de Cuentas//Operarios//Operarios" && <Operario />}

        {/* Transporte */}
        {/* {props.section === 'Transporte//Historiales//Inspeccion camiones' && <HistorialVehiculos />} */}
        {/* {props.section === "Transporte//Historiales//Inspeccion tractomulas" && <HistorialFormulario />} */}
        {props.section === "Transporte//Formularios//Tractomulas" && <FormularioMulas />}
        {props.section === "Transporte//Formularios//Programación tractomulas" && <ProgramacionMula />}
        {/* {props.section === "Transporte//Historiales//Historial programación tractomula" && <HistorialProgramacionMula/>} */}


        {/* Sistema */}
        {props.section === 'Sistema//Proceso//Variables del Proceso' && <VariablesProceso />}
        {props.section === 'Sistema//Proceso//Habilitar predios proceso' && <HabilitarPrediosProceso />}
        {props.section === 'Sistema//Proceso//Funciones' && <ActivarFunciones />}
        {props.section === 'Sistema//Proceso//Modificar serial lotes' && <ModificarSeriales />}

        {/* indicadores */}
        {props.section === 'Indicadores//Operaciones//Eficiencía de la fruta' && <EficienciaFruta widthBar={props.widthBar} />}
        {/* Comercial */}
        {props.section === 'Comercial//Precios proveedor//Limon' && <PrecioLimon /> }
        {props.section === 'Comercial//Precios proveedor//Naranja' && <PrecioNaranja />}
        {props.section === "Comercial//Ingresos//Crear contenedor" && <CrearContenedor />}
        {props.section === "Comercial//Clientes//Clientes" && <Clientes />}
        {props.section === "Comercial//Proveedores//Proveedores" && <Proveedores />}

        {/* proceso */}
        {props.section === 'Proceso//Aplicaciones//Descarte Lavado' && <DescarteLavadoSistema /> }
        {props.section === 'Proceso//Aplicaciones//Descarte Encerado' && <DescarteEnceradoSistema /> }

      </div>
    )
}