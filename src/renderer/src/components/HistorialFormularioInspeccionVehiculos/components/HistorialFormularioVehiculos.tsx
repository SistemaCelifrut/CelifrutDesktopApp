import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { themeContext } from '@renderer/App';
import { faCheckCircle, faTimesCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface Contenedor {
  _id: string;
  criterio1: string;
  criterio2: string;
  criterio3: string;
  criterio4: string;
  criterio5: string;
  criterio6: string;
  criterio7: string;
  criterio8: string;
  criterio9: string;
  criterio10: string;
  criterio11: string;
  criterio12: string;
  criterio13: string;
  criterio14: string;
  criterio15: string;
  criterio16: string;
  observaciones1: string;
  observaciones2: string;
  observaciones3: string;
  observaciones4: string;
  observaciones5: string;
  observaciones6: string;
  observaciones7: string;
  observaciones8: string;
  observaciones9: string;
  observaciones10: string;
  observaciones11: string;
  observaciones12: string;
  observaciones13: string;
  observaciones14: string;
  observaciones15: string;
  observaciones16: string;
  placa: string;
  calificacion: number;
  responsable: string;
  lugar: string;
  tipoFruta: string;
  nombreConductor: string;
  fecha: string;
}

const EjemploComponente: React.FC = () => {
  const [contenedores, setContenedores] = useState<Contenedor[]>([]);
  const [placaFiltro, setPlacaFiltro] = useState<string>('');
  const [fechaInicioFiltro, setFechaInicioFiltro] = useState<Date | null>(null);
  const [fechaFinFiltro, setFechaFinFiltro] = useState<Date | null>(null);
  const [expandedContenedor, setExpandedContenedor] = useState<string | null>(null);
  const [nombreFiltro, setNombreFiltro] = useState<string>('');
  const [cantidadDatos, setCantidadDatos] = useState<number | string>(''); // Valor predeterminado

  const theme = useContext(themeContext);

  useEffect(() => {
    obtenerHistorialFormularioInspeccionVehiculos();
  }, [placaFiltro, fechaInicioFiltro, fechaFinFiltro, nombreFiltro, cantidadDatos]);

  const obtenerHistorialFormularioInspeccionVehiculos = async () => {
    try {
      // Normalizar la placa ingresada por el usuario a minúsculas
      const placaFiltroNormalizada = placaFiltro.toLowerCase();
      // Convertir el nombre del conductor a mayúsculas
      const nombreConductorMayusculas = nombreFiltro.toUpperCase();
      const request = {
        action: 'obtenerHistorialFormularioInspeccionVehiculos',
        fechaInicio: fechaInicioFiltro,
        fechaFin: fechaFinFiltro,
        nombreConductor: nombreConductorMayusculas, // Enviar el nombre del conductor en mayúsculas
        cantidad: cantidadDatos === '' ? '' : parseInt(cantidadDatos as string)
      };
  
      const response = await window.api.proceso(request);
  
      if (response.status === 200 && response.data) {
        // Normalizar las placas en los datos recibidos del servidor a minúsculas
        const contenedoresNormalizados = response.data.map(contenedor => ({
          ...contenedor,
          placa: contenedor.placa.toLowerCase()
        }));
  
        // Filtrar los contenedores según la placa normalizada
        const contenedoresFiltrados = contenedoresNormalizados.filter(contenedor =>
          contenedor.placa.includes(placaFiltroNormalizada)
        );
  
        setContenedores(contenedoresFiltrados);
      } else {
        console.error('Error al obtener los datos:', response);
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
    }
  };

  const renderizarIcono = (valor: string) => {
    if (valor === 'C') {
      return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
    } else if (valor === 'NC') {
      return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />;
    }
    return valor;
  };

  const toggleExpansion = (contenedorId: string) => {
    setExpandedContenedor(expandedContenedor === contenedorId ? null : contenedorId);
  };

  const isContenedorExpanded = (contenedorId: string) => {
    return expandedContenedor === contenedorId;
  };

  const getCriterioNombre = (index: number) => {
    switch (index) {
      case 1:
        return "Lona o Malla Antitrips";
      case 2:
        return "Estado de la Carrocería y Carpa";
      case 3:
        return "Estado del Piso del Vehículo";
      case 4:
        return "Piso del Vehículo Limpio";
      case 5:
        return "Cumplimiento de Horarios del Conductor";
      case 6:
        return "Vehículo Llega Completamente Carpado";
      case 7:
        return "Vehículo Llega con Precintos Asignados";
      case 8:
        return "Cumplimiento de Resguardo Estipulado";
      case 9:
        return "Procedimientos de Limpieza y Desinfección";
      case 10:
        return "Vehículo Libre de Plagas";
      case 11:
        return "Vehículo Libre de Olores Extraños";
      case 12:
        return "Vehículo Libre de Otros Insumos";
      case 13:
        return "Estado de Limpieza de Canastillas";
      case 14:
        return "Cumplimiento del Llenado de Fruta";
      case 15:
        return "Cumplimiento de Parámetros de Calidad";
      case 16:
        return "Entrega de Remisión de Carga";
      default:
        return `Criterio ${index}`;
    }
  };

  return (
    <div className={`container mx-auto p-4 ${theme === 'Dark' ? 'dark' : ''}`}>
      <h1 className={`text-3xl font-semibold mb-4 ${theme === 'Dark' ? 'text-white' : 'text-black'}`}>Historial Formulario Vehiculos</h1>
      <div className="flex mb-4">
        <input
          id="placaFiltro"
          type="text"
          placeholder="Placa"
          value={placaFiltro}
          onChange={(e) => setPlacaFiltro(e.target.value)}
          className="p-2 mr-2 border border-gray-300"
        />
        <label htmlFor="fechaInicioFiltro" className={`${theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white'} mr-1`}>Fecha Inicio:</label>
        <input
          id="fechaInicioFiltro"
          type="date"
          value={fechaInicioFiltro ? fechaInicioFiltro.toISOString().split('T')[0] : ''}
          onChange={(e) => setFechaInicioFiltro(e.target.value ? new Date(e.target.value + 'T00:00:00') : null)}
          className="p-2 mr-2 border border-gray-300"
        />
        <label htmlFor="fechaFinFiltro"className={`${theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white'} mr-1`}>Fecha Fin:</label>
        <input
          id="fechaFinFiltro"
          type="date"
          value={fechaFinFiltro ? fechaFinFiltro.toISOString().split('T')[0] : ''}
          onChange={(e) => setFechaFinFiltro(e.target.value ? new Date(e.target.value + 'T23:59:59') : null)}
          className="p-2 mr-3 border border-gray-300"
        />
        <input
          type="text"
          placeholder="Nombre Conductor"
          value={nombreFiltro}
          onChange={(e) => setNombreFiltro(e.target.value)}
          className="p-2 mr-3 border border-gray-300"
        />
        <input
          type="number"
          placeholder="Cantidad de datos"
          value={cantidadDatos || ''}
          onChange={(e) => setCantidadDatos(e.target.value)}
          className="p-2 mr-2 border border-gray-300"
        />
      </div>
      <div className="overflow-x-auto">
        <table className={`min-w-full table-auto border-collapse border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>
          <thead className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}>
            <tr>
              <th className="py-2 px-3 text-left w-1/8">Responsable</th>
              <th className="py-2 px-3 text-left w-1/8">Fecha</th>
              <th className="py-2 px-3 text-left w-1/8">Placa</th>
              <th className="py-2 px-3 text-left w-1/8">Lugar</th>
              <th className="py-2 px-3 text-left w-1/8">Tipo Fruta</th>
              <th className="py-2 px-3 text-left w-1/8">Nombre del Conductor</th>
              <th className="py-2 px-3 text-left w-1/8">Calificación</th>
              <th className="py-2 px-3 text-left w-1/8">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {contenedores.map((contenedor, index) => (
              <React.Fragment key={index}>
                <tr className="cursor-pointer">
                  <td className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>{contenedor.responsable}</td>
                  <td className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>{format(new Date(contenedor.fecha), 'dd/MM/yyyy')}</td>
                  <td className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>{contenedor.placa}</td>
                  <td className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>{contenedor.lugar}</td>
                  <td className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>{contenedor.tipoFruta}</td>
                  <td className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>{contenedor.nombreConductor}</td>
                  <td className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>{contenedor.calificacion}</td>
                  <td className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>
                    <button onClick={() => toggleExpansion(contenedor._id)} className="focus:outline-none">
                      {isContenedorExpanded(contenedor._id) ? (
                        <FontAwesomeIcon icon={faChevronUp} className="text-blue-500" />
                      ) : (
                        <FontAwesomeIcon icon={faChevronDown} className="text-blue-500" />
                      )}
                    </button>
                  </td>
                </tr>
                {isContenedorExpanded(contenedor._id) && (
                  <React.Fragment>
                    {Array.from({ length: 16 }, (_, i) => i + 1).map((index) => (
                      <tr key={index}>
                        <td colSpan={4} className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>
                          <strong>{getCriterioNombre(index)}:</strong> {renderizarIcono(contenedor[`criterio${index}`])}
                        </td>
                        <td colSpan={4} className={`py-2 px-3 border border-gray-200 ${theme === 'Dark' ? 'bg-white' : ''}`}>
                          <strong>Observación:</strong> {contenedor[`observaciones${index}`]}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EjemploComponente;