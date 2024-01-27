import { useContext, useEffect, useState } from "react";
import { informesCalidadType } from "./types/types";
import { themeContext } from "@renderer/App";
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Informes(): JSX.Element {
  const theme = useContext(themeContext);
  const [datos, setDatos] = useState<informesCalidadType[]>([]);
  const [datosFiltrados, setDatosFiltrados] = useState<informesCalidadType[]>([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const obtenerDatosDelServidor = async (): Promise<void> => {
      try {
        const request = { action: 'obtenerInformesCalidad', query: 'proceso' };
        const response = await window.api.calidad(request);
        const lotes: informesCalidadType[] = response.data;

        console.log('Datos del servidor:', lotes);

        if (Array.isArray(lotes) && lotes.length > 0) {
          setDatos(lotes);
          setDatosFiltrados(lotes); // Inicializa los datos filtrados con los datos originales
        } else {
          console.error('El formato de lotes no es el esperado o está vacío.');
        }
      } catch (error) {
        console.error('Error al obtener informes:', error);
      }
    };

    obtenerDatosDelServidor();
  }, []);

  useEffect(() => {
    const datosFiltrados = datos.filter(
      (item) =>
        item._id.toLowerCase().includes(filtro.toLowerCase()) ||
        item.nombrePredio.toLowerCase().includes(filtro.toLowerCase()) ||
        item.tipoFruta.toLowerCase().includes(filtro.toLowerCase())
    );
    setDatosFiltrados(datosFiltrados);
  }, [filtro, datos]);

  const handleAccederDocumento = (enlace): void => {
    window.open(enlace, '_blank');
  };

  return (
    <div className="m-2 flex flex-col justify-center">
      <h2 className={`bg-Celifrut-green text-center p-4 rounded-md shadow-md text-white font-bold`}>
        📊 INFORMES 📊
      </h2>
      <div className="flex justify-center">
        <input
          type="text"
          value={filtro}
          onChange={(e): void => setFiltro(e.target.value)}
          placeholder="Buscador ..."
          className={`flex justify-center m-4 border-solid border-2 border-blue-200 rounded-lg p-2 w-2/4
                    ${theme === 'Dark' ? 'bg-slate-950 text-white text-lg' : ''}`}
        />
      </div>
      <table className={`mr-2 ml-2 w-full mt-4 border-2 table-fixed`}>
        <thead className={`${theme === 'Dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <tr className="h-14 broder-2">
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/4`}>📦 ENF</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/4`}>🍋 Nombre del Predio</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/4`}>🍊 Tipo de Fruta</th>
            <th className={`${theme === 'Dark' ? 'text-white' : 'text-black'} w-1/4`}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((item, index) => (
            <tr className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`} key={index}>
              <td className="p-2 text-sm w-1/4 text-center">{item._id}</td>
              <td className="p-2 text-sm w-1/4 text-center">{item.nombrePredio}</td>
              <td className="p-2 text-sm w-1/4 text-center">{item.tipoFruta}</td>
              <td className="p-2 text-sm w-1/4 text-center">
                <button
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '5px',
                  }}
                  onClick={(): void => handleAccederDocumento(item.urlInformeCalidad)}
                >
                  <FontAwesomeIcon icon={faFileAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

