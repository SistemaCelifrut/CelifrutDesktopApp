/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const TuComponente: React.FC = () => {
  const [historialData, setHistorialData] = useState<any[]>([]);

  useEffect(() => {
    const obtenerHistorialData = async () => {
      try {
        const request = {
          action: 'obtenerHistorialDataContenedorFormularioInspeccionMulas',
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
  }, []);

  const renderCriterioValue = (value: boolean) => {
    return value ? <FontAwesomeIcon icon={faCheckCircle} color="green" /> : <FontAwesomeIcon icon={faTimesCircle} color="red" />;
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Historial de Datos</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Criterio</th>
            <th className="py-2 px-4 border-b">Cumplimiento</th>
            <th className="py-2 px-4 border-b">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {historialData.map((item) => (
            <React.Fragment key={item._id}>
              {Object.values(item.formularioInspeccionMula.criterios).map((criterio: any, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{item._id}</td>
                  <td className="py-2 px-4 border-b">{criterio.nombre}</td>
                  <td className="py-2 px-4 border-b">{renderCriterioValue(criterio.cumplimiento)}</td>
                  <td className="py-2 px-4 border-b">{criterio.observaciones}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuComponente;
