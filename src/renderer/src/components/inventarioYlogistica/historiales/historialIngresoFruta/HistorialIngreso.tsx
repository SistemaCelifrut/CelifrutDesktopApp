/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { themeContext } from '@renderer/App';
import { lotesType } from '@renderer/types/lotesType';


const HistorialIngresoFruta = (): JSX.Element => {
  const [datos, setDatos] = useState<lotesType[]>([]);
  const [busqueda, setBusqueda] = useState<string>('');
  const theme = useContext(themeContext);

  useEffect(() => {
    const obtenerDatosIngresoFruta = async (): Promise<void> => {
      try {
        const request = {
          data:{
            query:{enf: { $regex: '^E', $options: 'i' }},
            select : {},
            populate:{
              path: 'predio',
              select: 'PREDIO ICA'
            },
            sort:{fechaIngreso: -1},
            limit: 50,
          },
          collection:'lotes',
          action: 'getLotes',
          query: 'proceso'
        };

        const response = await window.api.server(request);

        if (response.status === 200 && response.data) {
          console.log('Datos de ingreso de fruta:', response.data);
          setDatos(response.data); // Guardamos los datos en el estado
        } else {
          console.error('Error al obtener el ingreso de fruta:', response);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    obtenerDatosIngresoFruta();
  }, []);

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBusqueda(e.target.value);
  };

  const datosFiltrados = datos.filter(item =>
    Object.values(item).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <div className="w-full ">
      <h2 className={`text-3xl font-semibold mb-4 ${theme === 'Dark' ? 'text-white' : 'text-black'}  text-lg font-semibold mb-4 text-center`}>HISTORIAL INGRESO DE FRUTA</h2>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Buscar..."
          className="px-3 py-2 border border-gray-300 rounded-md w-64"
          value={busqueda}
          onChange={handleBuscar}
        />
      </div>
      <div className="w-full text-[12px]">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'}`}>
            <tr>
              <th className="px-4 py-2 ">ID</th>
              <th className="px-4 py-2 ">Nombre del Predio</th>
              <th className="px-4 py-2 ">Fecha de Ingreso</th>
              <th className="px-4 py-2 ">Canastillas</th>
              <th className="px-4 py-2 ">Tipo de Fruta</th>
              <th className="px-4 py-2 ">Observaciones</th>
              <th className="px-4 py-2 ">Kilos</th>
              <th className="px-4 py-2 ">Placa</th>
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${theme === 'Dark' ? 'border-b border-white' : 'border-b border-gray-300'}`}>
                <td className="border px-4 py-2">{item.enf}</td>
                <td className="border px-4 py-2">{item.predio && item.predio.PREDIO}</td>
                <td className="border px-4 py-2">{format(item.fechaIngreso ? new Date(item.fechaIngreso) : new Date(), 'dd/MM/yyyy')}</td>
                <td className="border px-4 py-2">{item.canastillas}</td>
                <td className="border px-4 py-2">{item.tipoFruta}</td>
                <td className="border px-4 py-2">{item.observaciones}</td>
                <td className="border px-4 py-2">{item.kilos}</td>
                <td className="border px-4 py-2">{item.placa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialIngresoFruta;

