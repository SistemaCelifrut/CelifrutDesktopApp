import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  useEffect(() => {
    obtenerHistorialFormularioInspeccionVehiculos();
  }, [placaFiltro, fechaInicioFiltro, fechaFinFiltro]);

  const obtenerHistorialFormularioInspeccionVehiculos = async () => {
    try {
      const request = {
        action: 'obtenerHistorialFormularioInspeccionVehiculos',
        fechaInicio: fechaInicioFiltro,
        fechaFin: fechaFinFiltro
      };

      const response = await window.api.proceso(request);

      if (response.status === 200 && response.data) {
        let contenedoresFiltrados = response.data;
        if (placaFiltro) {
          contenedoresFiltrados = contenedoresFiltrados.filter(contenedor => contenedor.placa === placaFiltro);
        }
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Historial Formulario Vehiculos</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Placa"
          value={placaFiltro}
          onChange={(e) => setPlacaFiltro(e.target.value)}
          className="p-2 mr-2 border border-gray-300"
        />
        <input
          type="date"
          value={fechaInicioFiltro ? fechaInicioFiltro.toISOString().split('T')[0] : ''}
          onChange={(e) => setFechaInicioFiltro(e.target.value ? new Date(e.target.value + 'T00:00:00') : null)}
          className="p-2 mr-2 border border-gray-300"
        />
        <input
          type="date"
          value={fechaFinFiltro ? fechaFinFiltro.toISOString().split('T')[0] : ''}
          onChange={(e) => setFechaFinFiltro(e.target.value ? new Date(e.target.value + 'T23:59:59') : null)}
          className="p-2 border border-gray-300"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Responsable</th>
              <th className="py-2 px-3 text-left">Fecha</th>
              <th className="py-2 px-3 text-left">Placa</th>
              <th className="py-2 px-3 text-left">Lugar</th>
              <th className="py-2 px-3 text-left">Tipo de Fruta</th>
              <th className="py-2 px-3 text-left">Nombre del Conductor</th>
              <th className="py-2 px-3 text-left">Calificación</th>
              <th className="py-2 px-3 text-left">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {contenedores.map((contenedor, index) => (
              <React.Fragment key={index}>
                <tr className="cursor-pointer">
                  <td className="py-2 px-3 border border-gray-200">{contenedor.responsable}</td>
                  <td className="py-2 px-3 border border-gray-200">{format(new Date(contenedor.fecha), 'dd/MM/yyyy')}</td>
                  <td className="py-2 px-3 border border-gray-200">{contenedor.placa}</td>
                  <td className="py-2 px-3 border border-gray-200">{contenedor.lugar}</td>
                  <td className="py-2 px-3 border border-gray-200">{contenedor.tipoFruta}</td>
                  <td className="py-2 px-3 border border-gray-200">{contenedor.nombreConductor}</td>
                  <td className="py-2 px-3 border border-gray-200">{contenedor.calificacion}</td>
                  <td className="py-2 px-3 border border-gray-200">
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
                        <td colSpan={4} className="py-2 px-3 border border-gray-200">
                          <strong>{getCriterioNombre(index)}:</strong> {renderizarIcono(contenedor[`criterio${index}`])}
                        </td>
                        <td colSpan={4} className="py-2 px-3 border border-gray-200">
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


