import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTruck, faUser, faIdCard, faPhone, faPalette, faMobileAlt, faBuilding, faMapMarkerAlt, faUserGraduate, faShip, faCar   } from '@fortawesome/free-solid-svg-icons';
import { themeContext } from '@renderer/App';
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
  const [filtro, setFiltro] = useState<string>('');
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [contenedorEditando, setContenedorEditando] = useState<Contenedor | null>(null);
  const theme = useContext(themeContext);
  useEffect(() => {
    obtenerContenedores();
  }, []);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const abrirModal = (contenedor: Contenedor) => {
    setContenedorEditando(contenedor);
    setModalAbierto(true);
  };

  const guardarCambios = async () => {
    try {
      if (contenedorEditando) {
        const contenedorConAction = {
          ...contenedorEditando,
          action: 'editarFormularioProgramacionMula',
        };
  
        const response = await window.api.contenedores(contenedorConAction);
  
        if (response.status === 200) {
          console.log('Cambios guardados exitosamente');
          cerrarModal();
          obtenerContenedores(); // Actualizar datos en la tabla
        } else {
          console.error('Error al guardar los cambios:', response);
        }
      } else {
        console.error('No hay un contenedor para editar');
      }
    } catch (error) {
      console.error('Error al intentar guardar los cambios:', error);
    }
  };
  
  const cerrarModal = () => {
    setModalAbierto(false);
    setContenedorEditando(null);
  };

  const contenedoresFiltrados = contenedores.filter(contenedor => {
    if (contenedor && contenedor.formularioInspeccionMula && contenedor.infoContenedor) {
      return (
        (contenedor.formularioInspeccionMula.placa || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.trailer || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.conductor || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.cedula || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.celular || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.color || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.modelo || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.marca || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.prof || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.puerto || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.naviera || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.formularioInspeccionMula.agenciaAduanas || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor.infoContenedor.nombreCliente || '').toLowerCase().includes(filtro.toLowerCase()) ||
        (contenedor._id.toString().includes(filtro.toLowerCase()))
      );
    }
    return false;
  });  

  return (
    <div className="container mx-auto">
      <div className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-white'} container mx-auto flex flex-col items-center`}>
        <h2 className="text-xl font-bold mb-4">Historial Programación Mulas</h2>
        <input
          type="text"
          value={filtro}
          onChange={handleInputChange}
          placeholder="Buscar..."
          className="border border-gray-400 px-4 py-2 mb-4 w-full sm:w-96 text-black"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className={`${theme === 'Dark' ? 'bg-slate-700 text-white' : 'bg-gray-300'}`}>
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
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
          {contenedoresFiltrados.map((contenedor, index) => (
  <tr key={contenedor._id} className={`text-center ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
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
    <button onClick={() => abrirModal(contenedor)} className="text-blue-500">
  <FontAwesomeIcon icon={faEdit} />
</button>
    </td>
  </tr>
))}
          </tbody>
        </table>
      </div>
      {modalAbierto && contenedorEditando && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mb-4 flex flex-wrap">
    <div className="w-full sm:w-1/2 pr-2 mb-2 sm:mb-0">
        <label htmlFor="placa" className="block text-gray-700 text-sm font-bold mb-2">
        <FontAwesomeIcon icon={faCar} /> Placa:
        </label>
        <input
            type="text"
            id="placa"
            value={contenedorEditando.formularioInspeccionMula.placa ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    placa: e.target.value.toUpperCase() // Convertir a mayúsculas
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pl-2">
        <label htmlFor="trailer" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faTruck} /> Trailer:
        </label>
        <input
            type="text"
            id="trailer"
            value={contenedorEditando.formularioInspeccionMula.trailer ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    trailer: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pr-2 mb-2 sm:mb-0">
        <label htmlFor="conductor" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faUser} /> Conductor:
        </label>
        <input
            type="text"
            id="conductor"
            value={contenedorEditando.formularioInspeccionMula.conductor ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    conductor: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pl-2">
        <label htmlFor="cedula" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faIdCard} /> Cédula:
        </label>
        <input
            type="text"
            id="cedula"
            value={contenedorEditando.formularioInspeccionMula.cedula ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    cedula: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pr-2 mb-2 sm:mb-0">
        <label htmlFor="celular" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faPhone} /> Celular:
        </label>
        <input
            type="text"
            id="celular"
            value={contenedorEditando.formularioInspeccionMula.celular ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    celular: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pl-2">
        <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faPalette} /> Color:
        </label>
        <input
            type="text"
            id="color"
            value={contenedorEditando.formularioInspeccionMula.color ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    color: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pr-2 mb-2 sm:mb-0">
        <label htmlFor="modelo" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faMobileAlt} /> Modelo:
        </label>
        <input
            type="text"
            id="modelo"
            value={contenedorEditando.formularioInspeccionMula.modelo ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    modelo: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pl-2">
        <label htmlFor="marca" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faBuilding} /> Marca:
        </label>
        <input
            type="text"
            id="marca"
            value={contenedorEditando.formularioInspeccionMula.marca ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    marca: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pr-2 mb-2 sm:mb-0">
        <label htmlFor="puerto" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Puerto:
        </label>
        <input
            type="text"
            id="puerto"
            value={contenedorEditando.formularioInspeccionMula.puerto ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    puerto: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pl-2">
        <label htmlFor="prof" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faUserGraduate} /> Prof:
        </label>
        <input
            type="text"
            id="prof"
            value={contenedorEditando.formularioInspeccionMula.prof ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    prof: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pr-2 mb-2 sm:mb-0">
        <label htmlFor="naviera" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faShip} /> Naviera:
        </label>
        <input
            type="text"
            id="naviera"
            value={contenedorEditando.formularioInspeccionMula.naviera ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    naviera: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
    <div className="w-full sm:w-1/2 pl-2">
        <label htmlFor="agenciaAduanas" className="block text-gray-700 text-sm font-bold mb-2">
            <FontAwesomeIcon icon={faBuilding} /> Agencia de Aduanas:
        </label>
        <input
            type="text"
            id="agenciaAduanas"
            value={contenedorEditando.formularioInspeccionMula.agenciaAduanas ?? ''}
            onChange={(e) => setContenedorEditando(prevContenedor => ({
                ...prevContenedor!,
                formularioInspeccionMula: {
                    ...prevContenedor!.formularioInspeccionMula,
                    agenciaAduanas: e.target.value
                }
            }))}
            className="border border-gray-400 px-4 py-2 mb-2 w-full"
        />
    </div>
</div>

                </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
  onClick={cerrarModal}
  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
>
  Cerrar
</button>

          <button
  onClick={guardarCambios}
  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
>
  Guardar cambios
</button>

        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
export default TuComponente;
