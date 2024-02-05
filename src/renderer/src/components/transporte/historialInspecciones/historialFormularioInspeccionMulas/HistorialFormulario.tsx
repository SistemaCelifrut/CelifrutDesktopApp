/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext, ReactElement } from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { themeContext } from '@renderer/App';

const HistorialFormulario: React.FC = () => {
  const [historialData, setHistorialData] = useState<[]>([]);
  const [filtroContenedor, setFiltroContenedor] = useState<string>('');
  const [filtroTipoFruta, setFiltroTipoFruta] = useState<string>('');
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  const theme = useContext(themeContext);

  useEffect(() => {
    const obtenerHistorialData = async (): Promise<void> => {
      try {
        const fechas = {
          fechaInicio: fechaInicio instanceof Date ? fechaInicio : null,
          fechaFin: fechaFin instanceof Date ? fechaFin : null,
        };

        const request = {
          action: 'obtenerHistorialDataContenedorFormularioInspeccionMulas',
          fechas: fechas,
          tipoFruta: filtroTipoFruta,  // Agregar el tipo de fruta directamente
        };

        // Reemplaza esto con tu llamada real a la API
        const response = await window.api.contenedores(request);

        if (response.status === 200 && response.data) {
          setHistorialData(response.data);
        } else {
          console.error('Error al obtener el historial de datos:', response);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    obtenerHistorialData();
  }, [fechaInicio, fechaFin, filtroTipoFruta]);

  const renderCriterioValue = (value: boolean): ReactElement => {
    return value ? <FontAwesomeIcon icon={faCheckCircle} color="green" /> : <FontAwesomeIcon icon={faTimesCircle} color="red" />;
  };

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFiltroContenedor(e.target.value);
  };

  const handleFechaInicioChange = (date: Date | null): void => {
    setFechaInicio(date);
  };

  const handleFechaFinChange = (date: Date | null): void => {
    setFechaFin(date);
  };

  const formatDateForInput = (date: Date | null): string => {
    try {
      return date ? date.toISOString().split('T')[0] : '';
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return '';
    }
  };

  return (
    <div className={`${theme === 'Dark' ? 'bg-slate-800' : 'bg-white'} container mx-auto mt-2`} >
      <div className={`${theme === 'Dark' ? 'bg-slate-800 text-white' : 'bg-white'} flex flex-col md:flex-row mb-4`}>
        <div className="mb-4 md:mr-4">
          <label className="mr-2">Filtrar por Contenedor:</label>
          <input
            type="text"
            value={filtroContenedor}
            onChange={handleFiltroChange}
            className="border border-gray-300 rounded py-2 px-4 w-full md:w-64 text-black"
          />
        </div>
        <div className="mb-4 md:mr-4">
          <label className="mr-2">Filtrar por Tipo de Fruta:</label>
          <select
            value={filtroTipoFruta}
            onChange={(e): void => setFiltroTipoFruta(e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 w-full md:w-64 text-black"
          >
            <option value="">Todos</option>
            <option value="Naranja">Naranja</option>
            <option value="Limon">Limon</option>
            <option value="Mixto">Mixto</option>
          </select>
        </div>
        <div className="mb-4 md:mr-4">
          <label className="mr-2">Fecha de Inicio:</label>
          <input
            type="date"
            value={formatDateForInput(fechaInicio)}
            onChange={(e): void => handleFechaInicioChange(new Date(e.target.value))}
            className="border border-gray-300 rounded py-2 px-4 w-full md:w-48 text-black"
          />
        </div>
        <div className="mb-4 md:mr-4">
          <label className="mr-2">Fecha Fin:</label>
          <input
            type="date"
            value={formatDateForInput(fechaFin)}
            onChange={(e): void => handleFechaFinChange(new Date(e.target.value))}
            className="border border-gray-300 rounded py-2 px-4 w-full md:w-48 text-black"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-gray-200'}`}>
              <th className="py-2 px-4 border-b border-r">Contenedor</th>
              <th className="py-2 px-4 border-b border-r">Responsable</th>
              <th className="py-2 px-4 border-b border-r">Fecha de Salida</th>
              <th className="py-2 px-4 border-b border-r">Tipo de Fruta</th>
              <th className="py-2 px-4 border-b border-r">Conductor</th>
              <th className="py-2 px-4 border-b border-r">Placa</th>
              <th className="py-2 px-4 border-b border-r">Empresa de Transporte</th>
              <th className="py-2 px-4 border-b border-r">Criterio</th>
              <th className="py-2 px-4 border-b border-r">Cumplimiento</th>
              <th className="py-2 px-4 border-b">Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {historialData
              .filter((item) => {
                const fechaSalida = item.infoContenedor?.fechaSalida;
                return (
                  String(item._id).toLowerCase().includes(filtroContenedor.toLowerCase()) &&
                  fechaSalida && !isNaN(new Date(fechaSalida).getTime()) &&
                  (filtroTipoFruta === '' || (item.infoContenedor && item.infoContenedor.tipoFruta === filtroTipoFruta))
                );
              })
              .map((item) => (
                <React.Fragment key={item._id}>
                  {Object.values(item.formularioInspeccionMula.criterios).map((criterio: any, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b border-r">{item._id}</td>
                      {item.formularioInspeccionMula.responsable && (
  <td className="py-2 px-4 border-b border-r">{item.formularioInspeccionMula.responsable}</td>
)}
                      {item.infoContenedor && item.infoContenedor.fechaSalida && (
                        <td className="py-2 px-4 border-b border-r">
                          {format(new Date(item.infoContenedor.fechaSalida), 'dd/MM/yyyy')}
                        </td>
                      )}
                      {item.infoContenedor && item.infoContenedor.tipoFruta && (
                        <td className="py-2 px-4 border-b border-r">{item.infoContenedor.tipoFruta}</td>
                      )}           
                      {item.formularioInspeccionMula.conductor && (
                        <td className="py-2 px-4 border-b border-r">{item.formularioInspeccionMula.conductor}</td>
                      )}
                      {item.formularioInspeccionMula.placa && (
                        <td className="py-2 px-4 border-b border-r">{item.formularioInspeccionMula.placa}</td>
                      )}
                      {item.formularioInspeccionMula.empresaTransporte && (
                        <td className="py-2 px-4 border-b border-r">{item.formularioInspeccionMula.empresaTransporte}</td>
                      )}
                      <td className="py-2 px-4 border-b border-r">{criterio.nombre}</td>
                      <td className="py-2 px-4 border-b border-r items-center">
                        {renderCriterioValue(criterio.cumplimiento)}
                      </td>
                      <td className="py-2 px-4 border-b">{criterio.observaciones}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialFormulario;
