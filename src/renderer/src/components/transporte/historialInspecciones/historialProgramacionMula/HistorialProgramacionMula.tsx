import React, { useState, useEffect } from 'react';

interface Contenedor {
  _id: number;
  infoContenedor: {
    nombreCliente: string;
  };
  formularioInspeccionMula: {
    placa: string;
    trailer: string;
    conductor: string;
    cedula: string;
    celular: string;
    color: string;
    modelo: string;
    marca: string;
    contenedor: string;
    prof: string;
    puerto: string;
    naviera: string;
    agenciaAduanas: string;
  };
}

const TuComponente: React.FC = () => {
  const [contenedores, setContenedores] = useState<Contenedor[]>([]);
  const [selectedContenedor, setSelectedContenedor] = useState<Contenedor | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const obtenerContenedores = async (): Promise<void> => {
      try {
        const request = {
          action: 'obtenerFormularioProgramacionMula',
        };

        const response = await window.api.contenedores(request);

        if (response.status === 200 && response.data) {
          setContenedores(response.data);
        } else {
          console.error('Error al obtener la lista de contenedores:', response);
        }
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    };

    obtenerContenedores();
  }, []);

  const openModal = (contenedor: Contenedor) => {
    setSelectedContenedor(contenedor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedContenedor(null);
    setModalOpen(false);
  };

  const handleGuardarCambios = () => {
    // Aquí puedes enviar los cambios al servidor con el action 'editarcampos'
    closeModal();
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Contenedores</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Contenedor</th>
              <th className="px-4 py-2">Placa</th>
              <th className="px-4 py-2">Trailer</th>
              <th className="px-4 py-2">Conductor</th>
              <th className="px-4 py-2">Cédula</th>
              <th className="px-4 py-2">Celular</th>
              <th className="px-4 py-2">Color</th>
              <th className="px-4 py-2">Modelo</th>
              <th className="px-4 py-2">Marca</th>
              <th className="px-4 py-2">Prof</th>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Puerto</th>
              <th className="px-4 py-2">Naviera</th>
              <th className="px-4 py-2">Agencia Aduanas</th>
              <th className="px-4 py-2">Acciones</th> {/* Nueva columna para los botones de editar */}
            </tr>
          </thead>
          <tbody>
            {contenedores.map((contenedor, index) => (
              <tr key={contenedor._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="border px-4 py-2">{contenedor._id}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.placa}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.trailer}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.conductor}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.cedula}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.celular}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.color}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.modelo}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.marca}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.prof}</td>
                <td className="border px-4 py-2">{contenedor.infoContenedor.nombreCliente}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.puerto}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.naviera}</td>
                <td className="border px-4 py-2">{contenedor.formularioInspeccionMula.agenciaAduanas}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => openModal(contenedor)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedContenedor && modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-8 max-w-md w-full rounded-lg">
            <h2 className="text-xl font-bold mb-4">Editar Contenedor</h2>
            {/* Aquí puedes agregar campos de entrada para editar los datos */}
            <button onClick={handleGuardarCambios} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Guardar Cambios
            </button>
            <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuComponente;
